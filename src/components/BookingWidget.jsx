import React, { useState } from 'react';
import { Car, Calendar, MapPin, User, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import vehicles from '../data/vehicles.json';

const LOCATIONS = [
  'Choose Location',
  'Vizag Airport',
  'Simhachalam',
  'Railway Station',
  'Madhurwada',
  'Gajuwaka',
  'NAD X Roads',
  'Others',
];

const WA_NUMBER = '919550563283';

const today = new Date().toISOString().split('T')[0];

/* ---------- shared styles ---------- */
const cell = "flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0";
const iconBox = "w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0";
const label = "text-[11px] font-semibold text-[#1F2937] uppercase tracking-wider mb-0.5";
const inputBase = "w-full text-[13px] bg-transparent border-0 outline-none p-0 text-[#0F172A] placeholder:text-[#94A3B8]";

export default function BookingWidget() {
  const [vehicle,  setVehicle]  = useState('');
  const [date,     setDate]     = useState('');
  const [pickup,   setPickup]   = useState('');
  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [error,    setError]    = useState('');

  /* ---- validation helpers ---- */
  const handleName = (e) => {
    // allow only letters and spaces
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setName(val);
  };

  const handlePhone = (e) => {
    // allow only digits, max 10
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  /* ---- submit ---- */
  const handleSubmit = () => {
    if (!vehicle)                      { setError('Please choose a vehicle.');        return; }
    if (!date)                         { setError('Please pick a date.');              return; }
    if (!pickup || pickup === 'Choose Location') { setError('Please select a pick-up location.'); return; }
    if (!name.trim())                  { setError('Please enter your name.');          return; }
    if (phone.length < 10)             { setError('Please enter a valid 10-digit phone number.'); return; }
    setError('');

    const msg = [
      `Hi, I'd like to check availability for a self-drive car rental.`,
      ``,
      `🚗 Vehicle: ${vehicle}`,
      `📅 Pick-up Date: ${date}`,
      `📍 Pick-up Location: ${pickup}`,
      `👤 Name: ${name.trim()}`,
      `📞 Phone: ${phone}`,
    ].join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  /* ---- divider between cells ---- */
  const Divider = ({ vertical }) =>
    vertical
      ? <div className="hidden sm:block w-px self-stretch bg-gray-100 my-2" />
      : <div className="sm:hidden h-px w-full bg-gray-100 mx-4" style={{ width: 'calc(100% - 2rem)' }} />;

  return (
    <div className="rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-gray-100 overflow-hidden">

      {/* ── Row 1 ── */}
      <div className="flex flex-col sm:flex-row border-b border-gray-100">

        {/* Vehicle */}
        <div className={`${cell} border-b sm:border-b-0 sm:border-r border-gray-100`}>
          <div className={iconBox}><Car className="w-4 h-4 text-[#475569]" /></div>
          <div className="min-w-0 flex-1">
            <div className={label}>Choose Vehicle</div>
            <div className="relative">
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className={`${inputBase} appearance-none pr-5 cursor-pointer`}
              >
                <option value="" disabled>Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Pick-up Date */}
        <div className={`${cell} border-b sm:border-b-0 sm:border-r border-gray-100`}>
          <div className={iconBox}><Calendar className="w-4 h-4 text-[#475569]" /></div>
          <div className="min-w-0 flex-1">
            <div className={label}>Pick-up Date</div>
            <div className="relative">
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputBase} ${!date ? '[color-scheme:light] text-[#94A3B8]' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Pick-up Location */}
        <div className={cell}>
          <div className={iconBox}><MapPin className="w-4 h-4 text-[#475569]" /></div>
          <div className="min-w-0 flex-1">
            <div className={label}>Pick-up Location</div>
            <div className="relative">
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className={`${inputBase} appearance-none pr-5 cursor-pointer ${!pickup ? 'text-[#94A3B8]' : ''}`}
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc === 'Choose Location' ? '' : loc} disabled={loc === 'Choose Location'}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2 ── */}
      <div className="flex flex-col sm:flex-row items-stretch">

        {/* Name */}
        <div className={`${cell} border-b sm:border-b-0 sm:border-r border-gray-100 flex-1`}>
          <div className={iconBox}><User className="w-4 h-4 text-[#475569]" /></div>
          <div className="min-w-0 flex-1">
            <div className={label}>Your Name</div>
            <input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Enter your name"
              autoComplete="name"
              className={inputBase}
            />
          </div>
        </div>

        {/* Phone */}
        <div className={`${cell} border-b sm:border-b-0 sm:border-r border-gray-100 flex-1`}>
          <div className={iconBox}><Phone className="w-4 h-4 text-[#475569]" /></div>
          <div className="min-w-0 flex-1">
            <div className={label}>Phone Number</div>
            <input
              type="tel"
              value={phone}
              onChange={handlePhone}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              autoComplete="tel"
              className={inputBase}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="p-2.5 sm:pl-0 flex items-stretch">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.98] text-white font-semibold px-7 py-3.5 sm:rounded-xl rounded-xl flex items-center justify-center gap-2 transition-all text-sm whitespace-nowrap"
          >
            Check Availability
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Validation error ── */}
      {error && (
        <div className="px-5 py-2.5 bg-red-50 border-t border-red-100">
          <p className="text-xs text-red-600 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
