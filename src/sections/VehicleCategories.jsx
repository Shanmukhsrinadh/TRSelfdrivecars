import React, { useState, useRef } from 'react';
import vehicles from '../data/vehicles.json';
import VehicleCard from '../components/VehicleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Fuel } from 'lucide-react';

const categoryColors = {
  Hatchback: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  Sedan:     { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  SUV:       { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  MUV:       { bg: '#FDF4FF', text: '#7E22CE', dot: '#A855F7' },
};

/* ─── Compact mobile row (Rapido style) ─── */
function MobileVehicleRow({ vehicle, onClick }) {
  const color = categoryColors[vehicle.category] || { bg: '#F8FAFC', text: '#0F172A', dot: '#64748B' };
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:border-[#0F172A] hover:shadow-md active:scale-[0.99] transition-all text-left"
    >
      {/* Mini car icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color.bg }}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <rect x="14" y="16" width="52" height="52" rx="12" fill={color.dot} opacity="0.9" />
          <rect x="20" y="26" width="40" height="22" rx="6" fill="white" opacity="0.25" />
          <circle cx="20" cy="26" r="8" fill={color.dot} opacity="0.85" />
          <circle cx="60" cy="26" r="8" fill={color.dot} opacity="0.85" />
          <circle cx="20" cy="60" r="8" fill={color.dot} opacity="0.85" />
          <circle cx="60" cy="60" r="8" fill={color.dot} opacity="0.85" />
          <circle cx="20" cy="26" r="4" fill="white" opacity="0.6" />
          <circle cx="60" cy="26" r="4" fill="white" opacity="0.6" />
          <circle cx="20" cy="60" r="4" fill="white" opacity="0.6" />
          <circle cx="60" cy="60" r="4" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Name, badge, specs — three clean lines */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[#0F172A] text-sm leading-tight truncate">{vehicle.name}</div>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full mt-0.5 inline-block"
          style={{ color: color.text, backgroundColor: color.bg }}
        >
          {vehicle.category}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Users className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[11px] text-[#64748B]">{vehicle.seats} Seats</span>
          <span className="text-[#D1D5DB] text-[10px]">·</span>
          <Fuel className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[11px] text-[#64748B]">{vehicle.fuel}</span>
          <span className="text-[#D1D5DB] text-[10px]">·</span>
          <span className="text-[11px] text-[#64748B]">{vehicle.transmission}</span>
        </div>
      </div>

      {/* Price + arrow */}
      <div className="text-right flex-shrink-0">
        <div className="font-bold text-[#0F172A] text-base leading-none">₹{vehicle.price.toLocaleString()}</div>
        <div className="text-[10px] text-[#94A3B8] mt-0.5">/day</div>
      </div>
      <ChevronRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
    </button>
  );
}

/* ─── Desktop grid — centered when few items, horizontal scroll when many ─── */
function DesktopGrid({ filtered, onSelectVehicle }) {
  const scrollRef = useRef(null);
  const needsScroll = filtered.length > 8;

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });
  };

  /* Regular centered layout for ≤ 8 items */
  if (!needsScroll) {
    return (
      <div className="flex flex-wrap justify-center gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              layout
              style={{ width: '280px' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.22, delay: Math.min(i * 0.05, 0.25) }}
            >
              <VehicleCard vehicle={vehicle} onClick={() => onSelectVehicle(vehicle)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  /* 2-row horizontal scroll for > 8 items */
  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          className="grid gap-5 w-max"
          style={{
            gridTemplateRows: 'repeat(2, auto)',
            gridAutoFlow: 'column',
            gridAutoColumns: '280px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22, delay: Math.min(i * 0.05, 0.3) }}
              >
                <VehicleCard vehicle={vehicle} onClick={() => onSelectVehicle(vehicle)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ─── Main section ─── */
export default function VehicleCategories({ onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'MUV'];
  const filtered = activeTab === 'All' ? vehicles : vehicles.filter(v => v.category === activeTab);

  return (
    <section id="categories" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#1E3A8A] font-bold text-sm uppercase tracking-widest mb-3">Browse by Type</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">Find Your Perfect Ride</h2>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === cat
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-white text-[#475569] border border-gray-200 hover:border-[#0F172A] hover:text-[#0F172A]'
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-xs font-bold ${activeTab === cat ? 'text-white/60' : 'text-[#94A3B8]'}`}>
                  ({(cat === 'All' ? vehicles : vehicles.filter(v => v.category === cat)).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: smart grid */}
        <div className="hidden md:block px-5">
          {filtered.length > 0
            ? <DesktopGrid filtered={filtered} onSelectVehicle={onSelectVehicle} />
            : <div className="text-center py-16 text-[#94A3B8] text-sm">No vehicles in this category.</div>
          }
        </div>

        {/* Mobile: Rapido-style compact list */}
        <div className="md:hidden flex flex-col gap-3">
          {filtered.length > 0
            ? filtered.map((vehicle) => (
                <MobileVehicleRow
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={() => onSelectVehicle(vehicle)}
                />
              ))
            : <div className="text-center py-12 text-[#94A3B8] text-sm">No vehicles in this category.</div>
          }
        </div>

        {/* Footer note */}
        <p className="text-center text-[#94A3B8] text-xs mt-8">
          Showing {filtered.length} of {vehicles.length} vehicles
          {activeTab !== 'All' && ` in ${activeTab}`}
          {' · '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#F97316] font-semibold hover:underline"
          >
            Need a custom vehicle? Contact us
          </button>
        </p>

      </div>
    </section>
  );
}
