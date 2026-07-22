import React, { useRef } from "react";
import vehicles from "../data/vehicles.json";
import VehicleCard from "../components/VehicleCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedVehicles({ onSelectVehicle }) {
  const scrollRef = useRef(null);
  const featured = vehicles.slice(0, 6);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".card-item");
    if (!card) return;

    const gap = 24;
    const cardWidth = card.offsetWidth + gap;

    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="vehicles" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#94A3B8] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              Our Fleet
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Popular Vehicles
            </h2>

            <p className="text-[#64748B] mt-3 text-sm max-w-md">
              Clean, reliable vehicles ready for your next trip.
            </p>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-[#0F172A] text-[#0F172A] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0F172A] hover:text-white transition"
          >
            View All →
          </button>
        </div>

        {/* SLIDER */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* SCROLL CONTAINER */}
          <div className="relative">

            {/* LEFT FADE */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />

            {/* RIGHT FADE */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

            {/* SCROLL CONTAINER */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto no-scrollbar px-1 md:px-10"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {featured.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  className="card-item min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <VehicleCard
                    vehicle={vehicle}
                    onClick={() => onSelectVehicle(vehicle)}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}