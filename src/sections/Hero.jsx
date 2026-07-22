import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import {
  ChevronDown,
  ShieldCheck,
  Headset,
  Car,
  CarFront,
  CalendarDays,
  MapPin,
  ArrowRight,
  User,
  Phone,
} from "lucide-react";
import vehicles from "../data/vehicles.json";

const WA_NUMBER = "919550563283";
const LOCATIONS = [
  "Vizag Airport",
  "Simhachalam",
  "Railway Station",
  "Madhurwada",
  "Gajuwaka",
  "NAD X Roads",
  "Others",
];
const TODAY = new Date().toISOString().split("T")[0];

/* ======================================================================
   LIVE FLEET DATA & ROUTING UTILITIES
   ====================================================================== */

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

const PLACES = {
  mvpColony: [83.319, 17.7326],
  rkBeach: [83.3245, 17.7128],
  siripuram: [83.3018, 17.7284],
  dwarakaNagar: [83.2957, 17.7304],
  gajuwaka: [83.2078, 17.6868],
  pendurthi: [83.2404, 17.8214],
  rushikonda: [83.3826, 17.7817],
  kailasagiri: [83.3436, 17.7328],
  yendada: [83.3729, 17.7599],
  madhurawada: [83.3782, 17.8064],
  insKursura: [83.334, 17.718],
  jagadamba: [83.3015, 17.712],
};

const PLACE_KEYS = Object.keys(PLACES);

const INITIAL_FLEET = [
  { id: "car_1", status: "booked", baseSpeed: 0.055 },
  { id: "car_2", status: "booked", baseSpeed: 0.06 },
  { id: "car_3", status: "booked", baseSpeed: 0.065 },
  { id: "car_4", status: "available", baseSpeed: 0.05 },
  { id: "car_5", status: "available", baseSpeed: 0.058 },
  { id: "car_6", status: "available", baseSpeed: 0.062 },
  { id: "car_7", status: "booked", baseSpeed: 0.052 },
  { id: "car_8", status: "available", baseSpeed: 0.048 },
  { id: "car_9", status: "booked", baseSpeed: 0.057 },
  { id: "car_10", status: "available", baseSpeed: 0.063 },
  { id: "car_11", status: "booked", baseSpeed: 0.051 },
  { id: "car_12", status: "available", baseSpeed: 0.068 },
];

const PAUSE_DURATION_MS = 5000;

function distanceKm([lng1, lat1], [lng2, lat2]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const midLat = ((lat1 + lat2) / 2) * (Math.PI / 180);
  const x = dLng * Math.cos(midLat);
  return Math.sqrt(x * x + dLat * dLat) * R;
}

function bearing([lng1, lat1], [lng2, lat2]) {
  const toRad = (d) => (d * Math.PI) / 180;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const λ1 = toRad(lng2 - lng1);
  const y = Math.sin(λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ1);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

async function fetchRoadRoute(fromCoords, toCoords) {
  const url = `${OSRM_BASE}/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM ${res.status}`);
    const data = await res.json();
    const route = data?.routes?.[0];
    const coords = route?.geometry?.coordinates;
    if (Array.isArray(coords) && coords.length >= 2) {
      return coords;
    }
    throw new Error("No usable geometry");
  } catch (err) {
    console.warn("Falling back to straight-line route:", err);
    return [fromCoords, toCoords];
  }
}

function getRouteDetails(points) {
  const segmentLengths = [];
  const cumDist = [0];
  let acc = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const len = distanceKm(points[i], points[i + 1]);
    segmentLengths.push(len);
    acc += len;
    cumDist.push(acc);
  }
  return { points, segmentLengths, cumDist, totalLength: acc };
}

function getLngLatAndSpeedScaleAtDistance(route, dist) {
  const { points, segmentLengths, cumDist, totalLength } = route;
  const clamped = Math.min(Math.max(dist, 0), totalLength);

  for (let i = 0; i < segmentLengths.length; i++) {
    const segLen = segmentLengths[i];
    const isLast = i === segmentLengths.length - 1;

    if (clamped <= cumDist[i + 1] || isLast) {
      const segT = segLen === 0 ? 0 : (clamped - cumDist[i]) / segLen;
      const t = Math.min(Math.max(segT, 0), 1);
      const p0 = points[i];
      const p1 = points[i + 1];
      const currentPos = [
        p0[0] + (p1[0] - p0[0]) * t,
        p0[1] + (p1[1] - p0[1]) * t,
      ];

      const segLenMeters = segLen * 1000;

      let speedScale = 1.0;
      if (segLenMeters < 40) {
        speedScale = 0.35;
      } else if (segLenMeters > 110) {
        speedScale = 1.3;
      } else {
        speedScale = 0.35 + ((segLenMeters - 40) / 70) * (1.3 - 0.35);
      }

      return { coords: currentPos, speedScale };
    }
  }

  return { coords: points[points.length - 1], speedScale: 1.0 };
}

function snapToPixel(map, lngLat) {
  const point = map.project(lngLat);
  const snapped = { x: Math.round(point.x), y: Math.round(point.y) };
  const snappedLngLat = map.unproject(snapped);
  return [snappedLngLat.lng, snappedLngLat.lat];
}

const CAR_SVGS = ["/car1.svg", "/car2.svg", "/car3.svg"];
let _carIdx = 0;

function buildCarMarkerElement(status) {
  const el = document.createElement("div");
  el.className = `map-car map-car--${status}`;
  const src = CAR_SVGS[_carIdx++ % CAR_SVGS.length];
  el.innerHTML = `<img src="${src}" width="100%" height="100%" draggable="false" alt="" />`;
  return el;
}

/* ======================================================================
   MAIN COMPONENT
   ====================================================================== */

export default function HeroSection() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const dateInputRef = useRef(null);

  /* booking state */
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookErr, setBookErr] = useState("");

  const handleName = (e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
  const handlePhone = (e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));

  /* Force open native calendar on wrapper click */
  const handleDateFieldClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleBook = () => {
    if (!vehicle) {
      setBookErr("Please choose a vehicle.");
      return;
    }
    if (!date) {
      setBookErr("Please pick a date.");
      return;
    }
    if (!pickup) {
      setBookErr("Please select a pick-up location.");
      return;
    }
    if (!name.trim()) {
      setBookErr("Please enter your name.");
      return;
    }
    if (phone.length < 10) {
      setBookErr("Please enter a valid 10-digit number.");
      return;
    }
    setBookErr("");
    const msg = [
      "Hi, I'd like to check availability for a self-drive car rental.",
      "",
      `🚗 Vehicle: ${vehicle}`,
      `📅 Pick-up Date: ${date}`,
      `📍 Pick-up Location: ${pickup}`,
      `👤 Name: ${name.trim()}`,
      `📞 Phone: ${phone}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let animationFrameId = null;
    let vehicleStates = [];
    let isCleanedUp = false;

    let map;
    try {
      map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [83.312, 17.721],
        zoom: 13.9,
        attributionControl: false,
        interactive: false,
        fadeDuration: 0,
        antialias: true,
        preserveDrawingBuffer: true,
        pixelRatio: window.devicePixelRatio || 2,
      });
    } catch {
      return;
    }

    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });
    resizeObserver.observe(mapContainer.current);

    map.on("load", () => {
      if (isCleanedUp) return;

      if (map.getLayer("water")) {
        map.setPaintProperty("water", "fill-color", "#D7ECFF");
      }

      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (
          layer.type === "line" &&
          (layer.id.includes("road") ||
            layer.id.includes("highway") ||
            layer.id.includes("link"))
        ) {
          try {
            map.setPaintProperty(layer.id, "line-opacity", 0.95);
            const originalColor = map.getPaintProperty(layer.id, "line-color");
            if (
              originalColor &&
              typeof originalColor === "string" &&
              originalColor.startsWith("#")
            ) {
              map.setPaintProperty(layer.id, "line-color", "#e2e8f0");
            }
          } catch (e) {
            // Fail-safe
          }
        }
      });

      // Initialize Live Vehicles with random starting locations
      vehicleStates = INITIAL_FLEET.map((cfg) => {
        const randomFromKey =
          PLACE_KEYS[Math.floor(Math.random() * PLACE_KEYS.length)];

        let randomToKey =
          PLACE_KEYS[Math.floor(Math.random() * PLACE_KEYS.length)];
        while (randomToKey === randomFromKey) {
          randomToKey =
            PLACE_KEYS[Math.floor(Math.random() * PLACE_KEYS.length)];
        }

        const marker = new maplibregl.Marker({
          element: buildCarMarkerElement(cfg.status),
          rotationAlignment: "viewport",
          pitchAlignment: "viewport",
        })
          .setLngLat(PLACES[randomFromKey])
          .addTo(map);

        return {
          id: cfg.id,
          status: cfg.status,
          marker,
          baseSpeed: cfg.baseSpeed,
          currentLocationKey: randomFromKey,
          destinationLocationKey: randomToKey,
          state: "fetching",
          route: null,
          distanceTravelled: 0,
          pauseStartTime: 0,
          smoothedSpeedScale: 1.0,
        };
      });

      async function setupNextLeg(vehicle) {
        if (!mapRef.current || isCleanedUp) return;
        vehicle.state = "fetching";

        let nextSpotKey = vehicle.destinationLocationKey;
        while (nextSpotKey === vehicle.destinationLocationKey) {
          nextSpotKey =
            PLACE_KEYS[Math.floor(Math.random() * PLACE_KEYS.length)];
        }

        const fromCoords = PLACES[vehicle.destinationLocationKey];
        const toCoords = PLACES[nextSpotKey];
        const pathCoords = await fetchRoadRoute(fromCoords, toCoords);

        if (isCleanedUp) return;

        vehicle.currentLocationKey = vehicle.destinationLocationKey;
        vehicle.destinationLocationKey = nextSpotKey;
        vehicle.route = getRouteDetails(pathCoords);
        vehicle.distanceTravelled = 0;
        vehicle.state = "moving";
      }

      vehicleStates.forEach(async (v) => {
        const fromCoords = PLACES[v.currentLocationKey];
        const toCoords = PLACES[v.destinationLocationKey];
        const pathCoords = await fetchRoadRoute(fromCoords, toCoords);

        if (isCleanedUp) return;

        v.route = getRouteDetails(pathCoords);
        v.state = "moving";
      });

      let lastTime = performance.now();

      const runLoop = (now) => {
        if (isCleanedUp) return;
        const deltaMs = now - lastTime;
        lastTime = now;

        vehicleStates.forEach((v) => {
          if (v.state === "moving" && v.route) {
            const { coords: currentPos, speedScale } =
              getLngLatAndSpeedScaleAtDistance(v.route, v.distanceTravelled);

            v.smoothedSpeedScale += (speedScale - v.smoothedSpeedScale) * 0.08;

            const kmPerMs = (v.baseSpeed * v.smoothedSpeedScale) / 1000;
            v.distanceTravelled += deltaMs * kmPerMs;

            const lookaheadResult = getLngLatAndSpeedScaleAtDistance(
              v.route,
              v.distanceTravelled + 0.08
            );
            const lookaheadPos = lookaheadResult.coords;

            v.marker.setLngLat(snapToPixel(map, currentPos));

            if (
              currentPos[0] !== lookaheadPos[0] ||
              currentPos[1] !== lookaheadPos[1]
            ) {
              v.marker.setRotation(bearing(currentPos, lookaheadPos));
            }

            if (v.distanceTravelled >= v.route.totalLength) {
              v.state = "paused";
              v.pauseStartTime = now;
            }
          } else if (v.state === "paused") {
            if (now - v.pauseStartTime >= PAUSE_DURATION_MS) {
              setupNextLeg(v);
            }
          }
        });

        animationFrameId = requestAnimationFrame(runLoop);
      };

      animationFrameId = requestAnimationFrame(runLoop);
    });

    return () => {
      isCleanedUp = true;
      resizeObserver.disconnect();

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      vehicleStates.forEach((v) => {
        v.marker.remove();
      });

      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght=500;600;700&family=Inter:wght=400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        html, body {
          margin: 0;
          overflow-x: hidden;
        }

        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #ffffff;
        }

        .hero {
          --ink: #000000;
          --muted: #64748b;
          --accent: #000000;       
          --accent-soft: #f1f5f9;  
          --paper: #ffffff;

          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: var(--paper);
          color: var(--ink);
        }

        .hero-map {
          position: absolute;
          top: -2px;
          bottom: -2px;
          left: -2px;
          right: -2px;
          z-index: 1;
        }

        .hero-map .maplibregl-canvas { outline: none; }

        .map-car {
          width: 58px;
          height: 34px;
          pointer-events: none;
          will-change: transform;
          transition: transform 0.08s linear;
        }

        /* SVGs face right (east). Rotate image -90° inside the marker so
           the car nose points north when MapLibre bearing = 0. */
        .map-car img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: rotate(-90deg);
          transform-origin: center center;
          display: block;
        }

        .map-car--booked  img { opacity: 1; }
        .map-car--available img { opacity: 0.6; filter: grayscale(30%); }

        .hero-bottom-fade {
          position: absolute;
          bottom: -2px; 
          left: -2px;
          right: -2px;
          height: 220px; 
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 15%,
            rgba(255, 255, 255, 0.4) 38%,
            rgba(255, 255, 255, 0.75) 62%,
            rgba(255, 255, 255, 0.96) 80%,
            #ffffff 100%
          );
          pointer-events: none;
          z-index: 2; 
        }

        .hero-content {
          position: relative;
          z-index: 3;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-left: 6%;
          padding-bottom: 120px;
          pointer-events: none;

          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0.88) 12%,
            rgba(255, 255, 255, 0.45) 22%,
            rgba(255, 255, 255, 0) 30%
          );
        }

        .hero-copy {
          max-width: 28vw;
          width: 100%;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          margin: 0 0 14px;
          color: var(--muted);
          font-size: clamp(10px, 0.8vw + 8px, 12px);
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: 0 0 18px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(34px, 4vw + 12px, 52px);
          line-height: 1.12;
          letter-spacing: -.03em;
          font-weight: 700;
          color: var(--ink);
        }

        .hero-copy h1 span { color: #000000; text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; }

        .hero-description {
          margin: 0 0 36px;
          color: var(--muted);
          font-size: clamp(14px, 0.5vw + 13px, 17px);
          line-height: 1.55;
          font-weight: 500;
        }

        .feature-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 20px 24px;
        }

        .feature-chip {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-icon {
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-text {
          font-size: clamp(11.5px, 0.3vw + 11px, 13.5px);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.3;
        }

        .feature-text span {
          color: var(--muted);
          font-weight: 400;
        }

        /* Large Screen structure */
        .booking-shell {
          position: absolute;
          z-index: 4;
          left: 16px;
          right: 16px;
          bottom: 12%; 
          transform: translateY(10px); 
          width: calc(100% - 32px);
          max-width: 1180px;
          margin: 0 auto;
        }

        .booking-bar {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr 1.1fr 1fr 1.05fr auto;
          align-items: center;
          padding: 6px 8px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(20px);
        }

        .booking-field {
          position: relative;
          min-width: 0;
          height: 56px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          color: var(--ink);
          text-align: left;
          background: transparent;
          border: 0;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .booking-field:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }

        .booking-field:focus-within {
          background-color: #ffffff;
          box-shadow: inset 0 0 0 1.5px var(--ink);
        }

        .field-icon {
          flex: 0 0 32px;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          background: var(--accent-soft);
          color: var(--accent);
          border-radius: 50%;
          pointer-events: none;
        }

        .field-copy { 
          min-width: 0; 
          flex: 1; 
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .field-label {
          margin-bottom: 1px;
          font-size: 11.5px;
          font-weight: 600;
          pointer-events: none;
        }

        .booking-field input,
        .booking-field select {
          all: unset;
          display: block;
          width: 100%;
          font-size: 11.5px;
          color: var(--ink);
          font-family: inherit;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
          cursor: pointer;
        }

        .booking-field select {
          padding-right: 18px;
        }

        .booking-field select option {
          background: #ffffff;
          color: #000000;
        }

        .booking-field input[type="text"],
        .booking-field input[type="tel"] {
          cursor: text;
        }

        .booking-field input::placeholder { 
          color: var(--muted); 
          opacity: 0.8;
        }

        .booking-field input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.45; 
          cursor: pointer;
        }

        .select-chevron {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--muted);
          transition: transform 0.15s ease;
        }

        .booking-field:focus-within .select-chevron {
          color: var(--ink);
          transform: translateY(-50%) rotate(180deg);
        }

        .booking-error {
          margin-top: 6px;
          padding: 5px 12px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          font-size: 11px;
          color: #DC2626;
          font-weight: 500;
        }

        .find-car-button {
          height: 48px;
          margin-left: 8px;
          padding: 0 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          background: var(--accent);
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease;
        }

        .find-car-button:hover {
          background-color: #262626; 
          transform: translateY(-1.5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2.5%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          color: var(--muted);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          pointer-events: none;
          opacity: 0.85;
        }

        .bounce-arrow {
          animation: indicatorBounce 1.8s infinite ease-in-out;
        }

        @keyframes indicatorBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        /* ---------- Large laptop / narrower desktop ---------- */
        @media (max-width: 1300px) {
          .hero-copy { max-width: 34vw; }
        }

        /* ---------- Tablet Landscape / Portrait (Proportional Grid Sizing Fix) ---------- */
        @media (max-width: 1100px) {
          .booking-shell { 
            max-width: 1000px; 
            bottom: 8%;
            transform: translateY(0);
          }

          /* Balanced 3-column symmetrical top layout, button spans bottom */
          .booking-bar {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
          }

          .booking-field {
            border-right: 1px solid rgba(0, 0, 0, 0.06);
            background: rgba(255, 255, 255, 0.6);
          }

          .booking-field:nth-child(3),
          .booking-field:nth-child(5) {
            border-right: 0; /* Remove borders at line breaks for clean symmetry */
          }

          .find-car-button {
            grid-column: 1 / -1;
            margin: 4px 0 0 0;
            height: 50px;
          }

          .hero-copy { max-width: 45vw; }

          .hero-content {
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.98) 0%,
              rgba(255, 255, 255, 0.88) 25%,
              rgba(255, 255, 255, 0.45) 38%,
              rgba(255, 255, 255, 0) 45%
            );
          }
        }

        /* ---------- Tablet Portrait / Foldables ---------- */
        @media (max-width: 850px) {
          /* Clean 2-column symmetrical grid for mid-size tablets */
          .booking-bar {
            grid-template-columns: repeat(2, 1fr);
          }

          .booking-field {
            border-right: 1px solid rgba(0, 0, 0, 0.06);
          }

          .booking-field:nth-child(2n) {
            border-right: 0;
          }

          .hero-copy { max-width: 58vw; }
          .hero-content { padding-left: 6%; }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 720px) {
          .hero {
            min-height: 100vh;
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
          }

          .hero-map {
            position: absolute;
            inset: 0;
            height: 100%;
            z-index: 1;
            opacity: 0.3;
          }

          .hero-content {
            position: relative;
            z-index: 3;
            min-height: auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 40px 24px 12px;
            margin-top: auto; 
            background: transparent;
          }

          .hero-copy {
            max-width: 100%;
            align-items: flex-start;
            text-align: left;
          }

          .hero-copy h1 {
            font-size: clamp(32px, 7vw + 8px, 46px);
            margin-bottom: 14px;
          }

          .hero-description {
            font-size: clamp(14.5px, 2vw + 8px, 16.5px);
            margin-bottom: 24px;
          }

          .feature-row {
            justify-content: flex-start;
            gap: 14px 20px;
            margin-bottom: 24px;
          }

          .booking-shell {
            position: relative;
            z-index: 4;
            left: auto;
            right: auto;
            bottom: auto;
            max-width: 100%;
            width: 100%;
            margin: 0;
            padding: 0 24px 40px;
          }

          .booking-bar {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 6px 8px;
          }

          .booking-field {
            padding: 0 10px;
            border-right: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            background: transparent;
          }

          .booking-field:last-of-type {
            border-bottom: 0;
          }

          .find-car-button {
            width: 100%;
            margin: 8px 0 0;
          }

          .scroll-indicator {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            width: 100%;
            margin-top: -10px;
            padding-bottom: 28px;
            justify-content: center;
          }

          .hero-bottom-fade {
            height: 120px;
          }
        }

        /* ---------- Small phones ---------- */
        @media (max-width: 420px) {
          .hero-content { padding: 32px 16px 12px; }
          .booking-shell { padding: 0 16px 32px; }
          .booking-field { height: 52px; gap: 8px; }
          .field-icon { flex-basis: 28px; width: 28px; height: 28px; }
          .scroll-indicator { padding-bottom: 20px; }
        }
      `}</style>

      <section className="hero">
        <div ref={mapContainer} className="hero-map" />

        {/* Smooth Bottom Fade Overlay */}
        <div className="hero-bottom-fade" />

        <main className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Freedom. Flexibility. You.</p>

            <h1>
              Your City.<br />Your <span>Drive.</span>
            </h1>

            <p className="hero-description">
              Premium self drive cars in Visakhapatnam. Anytime, anywhere.
            </p>

            <div className="feature-row">
              <div className="feature-chip">
                <span className="feature-icon">
                  <Car size={16} strokeWidth={2.2} />
                </span>
                <div className="feature-text">
                  Wide Range <span>of Cars</span>
                </div>
              </div>

              <div className="feature-chip">
                <span className="feature-icon">
                  <ShieldCheck size={16} strokeWidth={2.2} />
                </span>
                <div className="feature-text">
                  Insurance <span>Included</span>
                </div>
              </div>

              <div className="feature-chip">
                <span className="feature-icon">
                  <Headset size={16} strokeWidth={2.2} />
                </span>
                <div className="feature-text">
                  24x7 <span>Support</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="booking-shell">
          <div className="booking-bar">
            {/* Vehicle Dropdown */}
            <div className="booking-field">
              <span className="field-icon">
                <CarFront size={18} strokeWidth={1.8} />
              </span>
              <span className="field-copy">
                <span className="field-label">Choose Vehicle</span>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                >
                  <option value="" disabled>
                    Select a vehicle
                  </option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </span>
              <ChevronDown size={14} className="select-chevron" />
            </div>

            {/* Date Input with Full Box Trigger */}
            <div className="booking-field" onClick={handleDateFieldClick}>
              <span className="field-icon">
                <CalendarDays size={18} strokeWidth={1.8} />
              </span>
              <span className="field-copy">
                <span className="field-label">Pick-up Date</span>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={date}
                  min={TODAY}
                  onChange={(e) => setDate(e.target.value)}
                />
              </span>
            </div>

            {/* Location Dropdown */}
            <div className="booking-field">
              <span className="field-icon">
                <MapPin size={18} strokeWidth={1.8} />
              </span>
              <span className="field-copy">
                <span className="field-label">Pick-up Location</span>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                >
                  <option value="" disabled>
                    Choose location
                  </option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </span>
              <ChevronDown size={14} className="select-chevron" />
            </div>

            {/* Name Input */}
            <div className="booking-field">
              <span className="field-icon">
                <User size={18} strokeWidth={1.8} />
              </span>
              <span className="field-copy">
                <span className="field-label">Your Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={handleName}
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </span>
            </div>

            {/* Phone Input */}
            <div className="booking-field">
              <span className="field-icon">
                <Phone size={18} strokeWidth={1.8} />
              </span>
              <span className="field-copy">
                <span className="field-label">Phone Number</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhone}
                  placeholder="10-digit number"
                  inputMode="numeric"
                />
              </span>
            </div>

            <button
              className="find-car-button"
              type="button"
              onClick={handleBook}
            >
              Check Availability
              <ArrowRight size={17} />
            </button>
          </div>

          {bookErr && <div className="booking-error">{bookErr}</div>}
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator">
          <span>Our Cars</span>
          <ChevronDown size={14} className="bounce-arrow" strokeWidth={2.5} />
        </div>
      </section>
    </>
  );
}