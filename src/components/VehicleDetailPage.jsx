import React, { useState } from 'react';
import { X, Phone, MessageCircle, Users, Fuel, Settings, Gauge, Shield, Star, ChevronRight, CheckCircle, ChevronLeft, ImageOff } from 'lucide-react';
import vehicles from '../data/vehicles.json';

const categoryColors = {
  Hatchback: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  Sedan:     { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  SUV:       { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  MUV:       { bg: '#FDF4FF', text: '#7E22CE', dot: '#A855F7' },
};

/* ─── Image Gallery ─── */
function ImageGallery({ images, vehicleName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState({});

  if (!images || images.length === 0) return null;

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-2">
      {/* Main image */}
      <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#F1F5F9]">
        {imgError[activeIdx] ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8]">
            <ImageOff className="w-8 h-8 mb-2" />
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${vehicleName} — view ${activeIdx + 1}`}
            className="w-full h-full object-cover"
            onError={() => setImgError((prev) => ({ ...prev, [activeIdx]: true }))}
          />
        )}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIdx ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeIdx ? 'border-[#0F172A] scale-95' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {imgError[i] ? (
                <div className="w-full h-full bg-[#F1F5F9] flex items-center justify-center">
                  <ImageOff className="w-4 h-4 text-[#94A3B8]" />
                </div>
              ) : (
                <img
                  src={url}
                  alt={`thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Fallback car SVG ─── */
function CarSVG({ vehicle }) {
  const color = categoryColors[vehicle.category] || { bg: '#F8FAFC', dot: '#64748B' };
  return (
    <div className="w-full h-52 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color.bg }}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
        <ellipse cx="80" cy="88" rx="46" ry="60" fill={color.dot} opacity="0.12" />
        <rect x="34" y="36" width="92" height="100" rx="22" fill={color.dot} opacity="0.9" />
        <rect x="44" y="56" width="72" height="46" rx="12" fill="white" opacity="0.25" />
        <circle cx="42" cy="56" r="14" fill={color.dot} opacity="0.85" />
        <circle cx="118" cy="56" r="14" fill={color.dot} opacity="0.85" />
        <circle cx="42" cy="120" r="14" fill={color.dot} opacity="0.85" />
        <circle cx="118" cy="120" r="14" fill={color.dot} opacity="0.85" />
        <circle cx="42" cy="56" r="7" fill="white" opacity="0.6" />
        <circle cx="118" cy="56" r="7" fill="white" opacity="0.6" />
        <circle cx="42" cy="120" r="7" fill="white" opacity="0.6" />
        <circle cx="118" cy="120" r="7" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}

/* ─── Main component ─── */
export default function VehicleDetailPage({ vehicle, onClose }) {
  if (!vehicle) return null;

  const related = vehicles.filter(v => v.category === vehicle.category && v.id !== vehicle.id).slice(0, 3);
  const color    = categoryColors[vehicle.category] || { bg: '#F8FAFC', text: '#0F172A', dot: '#64748B' };

  const handleCall     = () => window.open('tel:+917702102097');
  const handleWhatsApp = () => {
    const text = `Hi, I'd like to book the ${vehicle.name} (${vehicle.category}) — ₹${vehicle.price}/day. Please confirm availability.`;
    window.open(`https://wa.me/917702102097?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sliding panel */}
      <div className="relative ml-auto w-full max-w-xl h-full bg-white shadow-2xl animate-slide-in overflow-y-auto flex flex-col">

        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100 flex items-center gap-3 px-5 py-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-[#0F172A]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-[#0F172A] text-sm leading-none truncate">{vehicle.name}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold" style={{ color: color.text }}>{vehicle.category}</span>
              <span className="text-[#D1D5DB]">·</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F97316] text-[#F97316]" />
                ))}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-lg text-[#0F172A] leading-none">₹{vehicle.price.toLocaleString()}</div>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide">/ day</div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 flex-1">

          {/* Image gallery or SVG fallback */}
          {vehicle.images?.length > 0
            ? <ImageGallery images={vehicle.images} vehicleName={vehicle.name} />
            : <CarSVG vehicle={vehicle} />
          }

          {/* CTA buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eba58] text-white font-bold text-sm py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Book on WhatsApp
            </button>
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call to Book
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-2">About this Vehicle</h3>
            <p className="text-sm text-[#475569] leading-relaxed">{vehicle.description}</p>
          </div>

          <hr className="border-gray-100" />

          {/* Specs */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-3">Car Overview</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: <Settings className="w-4 h-4" />,    label: 'Transmission', value: vehicle.transmission },
                { icon: <Fuel className="w-4 h-4" />,        label: 'Fuel Type',    value: vehicle.fuel },
                { icon: <Users className="w-4 h-4" />,       label: 'Seating',      value: `${vehicle.seats} Persons` },
                { icon: <Gauge className="w-4 h-4" />,       label: 'Mileage',      value: vehicle.mileage },
                { icon: <Shield className="w-4 h-4" />,      label: 'A/C',          value: vehicle.ac ? 'Air Conditioned' : 'Non A/C' },
                { icon: <CheckCircle className="w-4 h-4" />, label: 'Engine',       value: vehicle.engine },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider leading-none">{item.label}</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5 truncate">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-3">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F8FAFC] text-[#374151] border border-gray-100"
                >
                  <CheckCircle className="w-3 h-3 text-[#22C55E]" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Booking contact info */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#0F172A] mb-2">Quick Contact</h3>
            <div className="flex flex-col gap-2">
              <button onClick={handleCall} className="flex items-center gap-3 text-sm hover:text-[#F97316] transition-colors">
                <Phone className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-[#0F172A]">+91 770-210-2097</span>
              </button>
              <button onClick={handleWhatsApp} className="flex items-center gap-3 text-sm">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="font-semibold text-[#0F172A]">WhatsApp — fastest response</span>
              </button>
            </div>
          </div>

          {/* Related vehicles */}
          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-3">Similar Vehicles</h3>
              <div className="flex flex-col gap-2">
                {related.map((v) => {
                  const rc = categoryColors[v.category] || { bg: '#F8FAFC', dot: '#64748B' };
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-vehicle', { detail: v }));
                      }}
                      className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl p-3 hover:border-[#0F172A] transition-colors text-left"
                    >
                      <div className="w-12 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rc.bg }}>
                        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
                          <rect x="6" y="6" width="28" height="28" rx="7" fill={rc.dot} opacity="0.9" />
                          <circle cx="8" cy="10" r="4" fill={rc.dot} />
                          <circle cx="32" cy="10" r="4" fill={rc.dot} />
                          <circle cx="8" cy="30" r="4" fill={rc.dot} />
                          <circle cx="32" cy="30" r="4" fill={rc.dot} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] truncate">{v.name}</div>
                        <div className="text-[11px] text-[#64748B]">{v.seats} seats · {v.fuel}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-[#0F172A]">₹{v.price.toLocaleString()}</div>
                        <div className="text-[10px] text-[#94A3B8]">/day</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-[#0F172A] rounded-2xl p-5 text-center mt-2">
            <p className="text-white/60 text-xs mb-1">Ready to book the {vehicle.name}?</p>
            <p className="text-white font-bold text-sm mb-4">Call or WhatsApp us for instant confirmation.</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eba58] text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
