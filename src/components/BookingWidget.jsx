import React, { useState } from 'react';
import { Car, Calendar, Clock, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import vehicles from '../data/vehicles.json';

const fieldWrap = "flex items-center gap-3 px-5 py-4 flex-1 min-w-0 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-0";
const iconWrap = "w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0";

export default function BookingWidget() {
  const [carModel, setCarModel] = useState(vehicles[0]?.name || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleFindCar = () => {
    const lines = [
      `Hi, I'd like to check availability for a self-drive car.`,
      `Car model: ${carModel}`,
      `Date: ${date || 'Not specified'}`,
      `Time: ${time || 'Not specified'}`,
      `Pick-up location: ${location || 'Not specified'}`,
    ];
    window.open(`https://wa.me/917702102097?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  return (
    <div className="rounded-[20px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-gray-100 flex flex-col sm:flex-row items-stretch overflow-hidden">
      <div className={fieldWrap}>
        <div className={iconWrap}>
          <Car className="w-4 h-4 text-[#475569]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-[#1F2937]">Car Model</div>
          <div className="relative">
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="w-full appearance-none text-[13px] text-[#94A3B8] bg-transparent border-0 outline-none p-0 pr-5 truncate"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className={fieldWrap}>
        <div className={iconWrap}>
          <Calendar className="w-4 h-4 text-[#475569]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-[#1F2937]">Date</div>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full text-[13px] bg-transparent border-0 outline-none p-0 ${date ? 'text-[#1F2937]' : 'text-transparent'}`}
            />
            {!date && (
              <span className="absolute left-0 top-0 text-[13px] text-[#94A3B8] pointer-events-none">Select date</span>
            )}
          </div>
        </div>
      </div>

      <div className={fieldWrap}>
        <div className={iconWrap}>
          <Clock className="w-4 h-4 text-[#475569]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-[#1F2937]">Time</div>
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full text-[13px] bg-transparent border-0 outline-none p-0 ${time ? 'text-[#1F2937]' : 'text-transparent'}`}
            />
            {!time && (
              <span className="absolute left-0 top-0 text-[13px] text-[#94A3B8] pointer-events-none">Select time</span>
            )}
          </div>
        </div>
      </div>

      <div className={fieldWrap}>
        <div className={iconWrap}>
          <MapPin className="w-4 h-4 text-[#475569]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-[#1F2937]">Pick-up Location</div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Select location"
            className="w-full text-[13px] text-[#94A3B8] placeholder:text-[#94A3B8] bg-transparent border-0 outline-none p-0"
          />
        </div>
      </div>

      <div className="p-2.5 sm:pl-0 flex items-stretch">
        <button
          onClick={handleFindCar}
          className="w-full sm:w-auto bg-[#3B4A63] hover:bg-[#2E3A4F] text-white font-semibold px-7 py-4 sm:rounded-2xl rounded-xl flex items-center justify-center gap-2 transition-colors text-sm whitespace-nowrap"
        >
          Find My Car
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
