import React, { useEffect, useRef, useState } from "react";
import {
  Shield,
  MapPin,
  Headphones,
  Car,
  Wallet,
  CheckCircle,
} from "lucide-react";

// Shared Data for Both Views
const proofStats = [
  { value: "50+", label: "Vehicles Available" },
  { value: "4.9★", label: "Average Rating" },
  { value: "<10 min", label: "Response Time" },
  { value: "5 yrs", label: "In Business" },
  { value: "500+", label: "Successful Rentals" },
];

const leftFeatures = [
  { icon: Car, title: "Professional Drivers" },
  { icon: Wallet, title: "Transparent Pricing" },
  { icon: MapPin, title: "Wide Regional Coverage" },
];

const rightFeatures = [
  { icon: CheckCircle, title: "Well-Maintained Fleet" },
  { icon: Headphones, title: "24/7 Dedicated Support" },
  { icon: Shield, title: "Comprehensively Insured" },
];

// Flat combined list for simple layout execution on smaller screens
const allFeaturesMobile = [...leftFeatures, ...rightFeatures];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const pathsRef = useRef([]);
  const [animated, setAnimated] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const pathLengths = pathsRef.current.map((path) => {
      if (!path) return 0;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      return length;
    });

    const handleScroll = () => {
      if (!sectionRef.current || !carRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top <= viewHeight * 0.2 && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        setAnimated(true);

        pathsRef.current.forEach((path, idx) => {
          if (!path) return;
          path.style.transition = "stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
          path.style.strokeDashoffset = "0";
        });
      }

      const progress = (viewHeight - rect.top) / (rect.height + viewHeight);
      const boundedProgress = Math.max(0, Math.min(1, progress));

      const startY = 220;
      const endY = -220;
      const translateY = startY + (endY - startY) * boundedProgress;
      const shadowBlur = 25 + boundedProgress * 20;
      const shadowSpread = 0.15 + (1 - boundedProgress) * 0.1;

      carRef.current.style.setProperty("--scroll-y", `${translateY}px`);
      carRef.current.style.setProperty("--shadow-blur", `${shadowBlur}px`);
      carRef.current.style.setProperty("--shadow-spread", `${shadowSpread}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="about-us" className="py-12 lg:py-20 bg-[#fefefe] overflow-hidden min-h-screen flex flex-col justify-center">

      {/* ========================================================= */}
      {/*   LARGE SCREEN DESIGN - Active ONLY above 1214px           */}
      {/* ========================================================= */}
      <div className="hidden min-[1215px]:block max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Header Block */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Numbers, not adjectives
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Here's what backs up "reliable."
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-5 gap-6 mb-8 pb-6 border-b border-gray-100 text-center justify-items-center">
          {proofStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#1E3A8A]">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Core Interactive Layout Container */}
        <div className="relative w-full max-w-[85rem] mx-auto h-[560px] grid grid-cols-[1fr_380px_1fr] items-stretch">
          {/* SVG Connectors */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 560"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
          >
            <g className="text-gray-300" strokeWidth="2.5">
              {/* Left Side Connectors */}
              <path ref={(el) => (pathsRef.current[0] = el)} d="M 530 280 L 440 72 L 302 72" />
              <path ref={(el) => (pathsRef.current[1] = el)} d="M 530 280 L 302 280" />
              <path ref={(el) => (pathsRef.current[2] = el)} d="M 530 280 L 440 488 L 302 488" />

              {/* Right Side Connectors */}
              <path ref={(el) => (pathsRef.current[3] = el)} d="M 670 280 L 760 72 L 898 72" />
              <path ref={(el) => (pathsRef.current[4] = el)} d="M 670 280 L 898 280" />
              <path ref={(el) => (pathsRef.current[5] = el)} d="M 670 280 L 760 488 L 898 488" />
            </g>
          </svg>

          {/* Left Column */}
          <div className="flex flex-col justify-between py-11 h-full z-10 -translate-x-[120px]">
            {leftFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-end gap-5 text-right group h-14 transition-all duration-500 ease-out transform
                    ${animated ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-3 scale-95"}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#1E3A8A] whitespace-nowrap">
                    {feat.title}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 text-white shadow-md transition-all duration-300 group-hover:bg-[#1E3A8A] group-hover:scale-110 relative z-30">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column */}
          <div className="flex justify-center items-center h-full z-50 pointer-events-none">
            <div className="relative w-full max-w-[320px]">
              <img
                ref={carRef}
                src="https://i.ibb.co/qFRYSpzK/pngwing-com.png"
                alt="Top view of rental luxury sedan"
                className="w-full object-contain will-change-transform transition-transform duration-75 ease-out translate-x-[55px]"
                style={{ 
                  maxHeight: "540px",
                  mixBlendMode: "multiply", 
                  filter: "drop-shadow(0px var(--shadow-blur, 30px) var(--shadow-blur, 45px) rgba(0,0,0,var(--shadow-spread, 0.22)))",
                  transform: "translateY(var(--scroll-y, 0px)) scale(1.05)"
                }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between py-11 h-full z-10 translate-x-[120px]">
            {rightFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-start gap-5 text-left group h-14 transition-all duration-500 ease-out transform
                    ${animated ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-3 scale-95"}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 text-white shadow-md transition-all duration-300 group-hover:bg-[#1E3A8A] group-hover:scale-110 relative z-30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#1E3A8A] whitespace-nowrap">
                    {feat.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Tagline Block */}
        <div className="mt-8 text-center max-w-3xl mx-auto relative z-30 bg-[#fefefe]/80 backdrop-blur-sm py-1">
          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            From daily city commutes to long outstation journeys —{" "}
            <span className="text-gray-900 font-bold">TRSelfdrives</span> delivers comfort, reliability, and value on every trip.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/*   SMALL SCREEN DESIGN - Active from 0px up to 1214px      */}
      {/* ========================================================= */}
      <div className="block min-[1215px]:hidden max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Header Block */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Numbers, not adjectives
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Here's what backs up "reliable."
          </p>
        </div>

        {/* Stats Grid forced onto 1 single line with dynamic/fluid sizing */}
        <div className="flex justify-between items-center gap-2 mb-8 pb-6 border-b border-gray-100 text-center w-full overflow-hidden">
          {proofStats.map((s) => (
            <div key={s.label} className="flex-1 min-w-0 flex flex-col items-center">
              <div className="font-bold text-[#1E3A8A] text-[calc(14px+0.6vw)] sm:text-2xl leading-tight select-none">
                {s.value}
              </div>
              <div className="font-semibold text-gray-400 mt-0.5 uppercase tracking-normal sm:tracking-wider text-[calc(8px+0.15vw)] sm:text-xs truncate w-full px-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="flex flex-col gap-8 items-center">
          {/* Car Image Display - Moved 30px right via translate-x */}
          <div className="flex justify-center w-full">
            <img
              src="https://i.ibb.co/qFRYSpzK/pngwing-com.png"
              alt="Premium rental car top view"
              className="w-full max-w-sm object-contain scale-105 transition-transform duration-500 ease-out hover:-translate-y-2 translate-x-[30px]"
              style={{
                mixBlendMode: "multiply",
                maxHeight: "320px",
                filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.12))",
              }}
            />
          </div>

          {/* Tagline */}
          <div className="text-center px-2">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
              From daily city commutes to long outstation journeys —{" "}
              <span className="text-gray-900 font-bold">TRSelfdrives</span> delivers comfort, reliability, and value on every trip.
            </p>
          </div>

          {/* Synchronized Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-4 w-full max-w-2xl">
            {allFeaturesMobile.map((feature, idx) => {
              const Icon = feature.icon;

              return (
                <div key={idx} className="flex items-center gap-4 bg-gray-50/60 p-4 rounded-xl border border-gray-100/70 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#1E3A8A]">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}