import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import {
  CalendarDays,
  CarFront,
  ChevronDown,
  Clock3,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

const HERO_IMAGE = "/images/vizag-coast.jpg";
const CAR_IMAGE = "/images/fronx.png";

function BookingField({ icon: Icon, label, value }) {
  return (
    <button className="booking-field" type="button">
      <span className="field-icon">
        <Icon size={21} strokeWidth={1.7} />
      </span>

      <span className="field-copy">
        <span className="field-label">{label}</span>
        <span className="field-value">{value}</span>
      </span>

      <ChevronDown size={16} />
    </button>
  );
}

export default function HeroSection() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [83.3, 17.715],
      zoom: 10.75,
      attributionControl: false,
      interactive: false,
      fadeDuration: 0,
    });

    mapRef.current = map;

    map.on("load", () => {
      const layers = map.getStyle().layers || [];

      const firstLayer = layers.find(
        (layer) => layer.type !== "background"
      );

      map.addSource("hero-photo", {
        type: "image",
        url: HERO_IMAGE,
        coordinates: [
          [83.1, 17.9],
          [83.52, 17.9],
          [83.52, 17.52],
          [83.1, 17.52],
        ],
      });

      map.addLayer(
        {
          id: "hero-photo-layer",
          type: "raster",
          source: "hero-photo",
          paint: {
            "raster-opacity": 1,
            "raster-fade-duration": 0,
          },
        },
        firstLayer?.id
      );

      layers.forEach((layer) => {
        const id = layer.id.toLowerCase();

        try {
          if (layer.type === "background") {
            map.setPaintProperty(
              layer.id,
              "background-color",
              "#ffffff"
            );
          }

          if (layer.type === "fill") {
            const isWater =
              id.includes("water") ||
              id.includes("ocean") ||
              id.includes("sea");

            if (isWater) {
              map.setPaintProperty(layer.id, "fill-opacity", 0);
            } else {
              map.setPaintProperty(
                layer.id,
                "fill-color",
                "#ffffff"
              );

              map.setPaintProperty(
                layer.id,
                "fill-opacity",
                0.97
              );
            }
          }

          if (layer.type === "line") {
            const isRoad =
              id.includes("road") ||
              id.includes("street") ||
              id.includes("highway");

            map.setPaintProperty(
              layer.id,
              "line-color",
              "#91a4b5"
            );

            map.setPaintProperty(
              layer.id,
              "line-opacity",
              isRoad ? 0.13 : 0.04
            );
          }

          if (layer.type === "symbol") {
            map.setPaintProperty(
              layer.id,
              "text-color",
              "#8797a7"
            );

            map.setPaintProperty(
              layer.id,
              "text-opacity",
              0.3
            );

            map.setLayoutProperty(
              layer.id,
              "icon-visibility",
              "none"
            );
          }
        } catch {
          // Ignore unsupported layer properties.
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .hero {
          --ink: #151b22;
          --muted: #737e8a;
          --accent: #7f9bb5;

          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #ffffff;
          color: var(--ink);
        }

        .hero-map {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-map .maplibregl-canvas {
          outline: none;
        }

        .hero-wash {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.25) 0%,
              transparent 48%
            ),
            linear-gradient(
              0deg,
              #fff 0%,
              transparent 20%
            );
        }

        /* NAVIGATION */

        .hero-nav {
          position: relative;
          z-index: 10;

          height: 105px;
          padding: 0 5%;

          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 13px;
          color: inherit;
          text-decoration: none;
        }

        .brand-mark {
          width: 46px;
          height: 46px;

          display: grid;
          place-items: center;

          border: 2px solid var(--ink);
          border-radius: 50%;

          font-size: 24px;
        }

        .brand strong,
        .brand small {
          display: block;
        }

        .brand strong {
          font-size: 16px;
          letter-spacing: .22em;
        }

        .brand small {
          margin-top: 3px;
          font-size: 9px;
          letter-spacing: .28em;
        }

        .nav-links {
          display: flex;
          gap: 44px;
        }

        .nav-links a {
          color: inherit;
          text-decoration: none;
          font-size: 14px;
        }

        .call-button {
          justify-self: end;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 12px 19px;

          color: inherit;
          text-decoration: none;

          background: rgba(255,255,255,.75);
          border: 1px solid rgba(21,27,34,.12);
          border-radius: 10px;

          backdrop-filter: blur(12px);
        }

        /* CONTENT */

        .hero-content {
          position: relative;
          z-index: 5;

          min-height: calc(100vh - 105px);

          display: flex;
          align-items: center;

          padding: 0 5% 170px;
        }

        .hero-copy {
          transform: translateY(-15px);
        }

        .eyebrow {
          margin: 0 0 28px;

          color: var(--accent);

          font-size: 13px;
          font-weight: 600;
          letter-spacing: .19em;
        }

        .hero-copy h1 {
          margin: 0;

          font-size: clamp(58px, 5.3vw, 92px);
          line-height: .98;
          letter-spacing: -.055em;
          font-weight: 620;
        }

        .hero-copy h1 span {
          color: var(--accent);
        }

        .title-rule {
          width: 50px;
          height: 2px;

          margin: 30px 0 24px;

          background: var(--accent);
        }

        .hero-description {
          margin: 0;

          color: var(--muted);

          font-size: 18px;
          line-height: 1.7;
        }

        /* CAR */

        .hero-car {
          position: absolute;
          z-index: 4;

          right: 3%;
          bottom: 17%;

          width: min(44vw, 720px);

          object-fit: contain;
          pointer-events: none;

          filter:
            drop-shadow(
              0 30px 28px rgba(20,28,35,.16)
            );
        }

        /* BOOKING */

        .booking-shell {
          position: absolute;
          z-index: 20;

          left: 5%;
          right: 5%;
          bottom: 9%;
        }

        .booking-bar {
          min-height: 120px;

          display: grid;

          grid-template-columns:
            1.15fr
            .85fr
            .8fr
            1.05fr
            auto;

          align-items: center;

          padding: 16px 18px;

          background: rgba(255,255,255,.91);

          border: 1px solid rgba(255,255,255,.9);
          border-radius: 17px;

          box-shadow:
            0 22px 60px rgba(34,49,62,.12);

          backdrop-filter: blur(22px);
        }

        .booking-field {
          min-width: 0;
          height: 72px;

          display: flex;
          align-items: center;
          gap: 15px;

          padding: 0 24px;

          color: var(--ink);
          text-align: left;

          background: transparent;
          border: 0;
          border-right: 1px solid rgba(122,145,166,.15);

          cursor: pointer;
        }

        .field-icon {
          flex: 0 0 46px;

          width: 46px;
          height: 46px;

          display: grid;
          place-items: center;

          background: #f4f7fa;
          border-radius: 50%;
        }

        .field-copy {
          min-width: 0;
          flex: 1;
        }

        .field-label,
        .field-value {
          display: block;
        }

        .field-label {
          margin-bottom: 7px;

          font-size: 14px;
          font-weight: 600;
        }

        .field-value {
          overflow: hidden;

          color: #8993a0;

          font-size: 13px;

          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .find-car-button {
          height: 62px;

          margin-left: 20px;
          padding: 0 28px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;

          color: #fff;
          font-size: 15px;

          background: var(--accent);
          border: 0;
          border-radius: 9px;

          cursor: pointer;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .find-car-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 25px rgba(80,110,140,.2);
        }

        /* SCROLL */

        .scroll-hint {
          position: absolute;
          z-index: 20;

          bottom: 1.5%;
          left: 50%;

          transform: translateX(-50%);

          text-align: center;
        }

        .mouse {
          width: 20px;
          height: 31px;

          margin: 0 auto 10px;

          display: block;

          border: 1.5px solid var(--ink);
          border-radius: 12px;
        }

        .mouse span {
          width: 2px;
          height: 6px;

          margin: 5px auto;

          display: block;

          background: var(--ink);
          border-radius: 10px;
        }

        .scroll-hint p {
          margin: 0;

          font-size: 10px;
          letter-spacing: .24em;
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .hero-nav {
            grid-template-columns: 1fr 1fr;
          }

          .nav-links {
            display: none;
          }

          .hero-car {
            right: -8%;
            width: 58vw;
          }

          .booking-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .booking-field {
            border-right: 0;
          }

          .find-car-button {
            grid-column: 1 / -1;
            margin: 5px 0 0;
          }

          .booking-shell {
            bottom: 4%;
          }

          .scroll-hint {
            display: none;
          }
        }

        /* MOBILE */

        @media (max-width: 720px) {
          .hero-nav {
            height: 82px;
          }

          .brand-mark {
            width: 40px;
            height: 40px;
          }

          .brand strong {
            font-size: 13px;
          }

          .call-button {
            padding: 10px 13px;
          }

          .hero-content {
            align-items: flex-start;

            padding-top: 95px;
            padding-bottom: 500px;
          }

          .hero-copy h1 {
            font-size: 54px;
          }

          .hero-description {
            font-size: 16px;
          }

          .hero-car {
            right: -22%;
            bottom: 33%;

            width: 110vw;
          }

          .booking-shell {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;

            margin: -320px 18px 30px;
          }

          .booking-bar {
            grid-template-columns: 1fr;
          }

          .booking-field {
            padding: 0 12px;
          }

          .find-car-button {
            width: 100%;
          }
        }
      `}</style>

      <section className="hero">
        <div ref={mapContainer} className="hero-map" />

        <div className="hero-wash" />



        <main className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">
              FREEDOM. FLEXIBILITY. YOU.
            </p>

            <h1>
              Your City.
              <br />
              Your <span>Drive.</span>
            </h1>

            <div className="title-rule" />

            <p className="hero-description">
              Premium self drive cars in Visakhapatnam.
              <br />
              Anytime, anywhere.
            </p>
          </div>
        </main>

        <img
          className="hero-car"
          src={CAR_IMAGE}
          alt="Maruti Suzuki Fronx"
        />

        <div className="booking-shell">
          <div className="booking-bar">
            <BookingField
              icon={CarFront}
              label="Car Model"
              value="Maruti Suzuki Fronx"
            />

            <BookingField
              icon={CalendarDays}
              label="Date"
              value="Select date"
            />

            <BookingField
              icon={Clock3}
              label="Time"
              value="Select time"
            />

            <BookingField
              icon={MapPin}
              label="Pick-up Location"
              value="Select location"
            />

            <button
              className="find-car-button"
              type="button"
            >
              Find My Car
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        <div className="scroll-hint">
          <span className="mouse">
            <span />
          </span>

          <p>SCROLL TO EXPLORE</p>
        </div>
      </section>
    </>
  );
}