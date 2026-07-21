import React, { useState } from 'react';
import { ArrowRight, Car, Plane, Clock, MapPin, Heart, Sparkles, Building, Calendar, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Self Drive Cars',
    icon: Car,
    description: 'Skip the driver and take the wheel. Enjoy our well-maintained fleet for weekend getaways, errands, or personal trips.',
  },
  {
    title: 'Airport Pickup & Drop',
    icon: Plane,
    description: 'We track your flight live so delays never mean a missed connection. A professional driver awaits right at the curb.',
  },
  {
    title: 'Daily Rentals',
    icon: Clock,
    description: 'Perfect for busy meeting schedules or shopping sprees. Keep a dedicated vehicle and driver all day.',
  },
  {
    title: 'Outstation Trips',
    icon: MapPin,
    description: 'Travel safely to Araku Valley, Annavaram, or beyond with expert drivers who know the ghat roads perfectly.',
  },
  {
    title: 'Wedding Rentals',
    icon: Heart,
    description: 'Keep your guests, family, and VIPs moving smoothly on schedule with coordinated fleet logistics management.',
  },
  {
    title: 'Luxury Fleet',
    icon: Sparkles,
    description: 'Make an impression. Premium segment luxury vehicles tailored for special events or high-end corporate executives.',
  },
  {
    title: 'Corporate Travel',
    icon: Building,
    description: 'Streamlined corporate mobility solutions featuring regular monthly billing options and priority execution.',
  },
  {
    title: 'Monthly Subscriptions',
    icon: Calendar,
    description: 'Get a reliable vehicle for your daily commute without long-term bank loans, down payments, or maintenance stress.',
  },
  {
    title: '24/7 Dedicated Support',
    icon: ShieldCheck,
    description: 'Travel with total peace of mind. Our customer help desk stands ready around the clock to assist your journey.',
  },
];

export default function Services() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleBook = (name) => {
    window.open(`https://wa.me/919550563283?text=${encodeURIComponent(`Hi, I want to book a vehicle for ${name}.`)}`, '_blank');
  };

  const handleButtonMouseEnter = (e) => {
    const btn = e.currentTarget;
    const bubble = btn.querySelector('.btn-ink-bubble');
    if (!bubble) return;

    bubble.style.transition = 'none';
    bubble.style.transform = 'translate(-50%, -50%) scale(0)';

    void bubble.offsetWidth;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    bubble.style.transition = 'transform 500ms cubic-bezier(0.1, 0.8, 0.3, 1)';
    bubble.style.transform = 'translate(-50%, -50%) scale(2.5)';
  };

  const handleButtonMouseLeave = (e) => {
    const bubble = e.currentTarget.querySelector('.btn-ink-bubble');
    if (bubble) {
      bubble.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  const DynamicButtonCta = ({ title }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        handleBook(title);
      }}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
      className="group/btn relative overflow-hidden inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] border border-gray-300 rounded-xl px-4 py-1.5 mt-3 w-fit transition-all duration-300 z-10 bg-white group-hover:bg-[#0F172A] group-hover:text-white group-hover:border-transparent shrink-0"
    >
      <span className="btn-ink-bubble absolute w-[140px] h-[140px] bg-[#0F172A] rounded-full pointer-events-none -z-10 transform scale-0" />
      <span className="relative z-10 transition-colors duration-300">Book Now</span> 
      <ArrowRight className="w-3.5 h-3.5 relative z-10 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
    </button>
  );

  const DesktopCard = ({ item, className = "" }) => (
    <div className={`group bg-white border border-gray-300 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#0F172A] hover:ring-1 hover:ring-[#0F172A] hover:bg-white/40 hover:backdrop-blur-md hover:shadow-sm overflow-hidden h-full ${className}`}>
      <div>
        <h3 className="text-sm font-bold text-[#0F172A] mb-1.5 tracking-tight">{item.title}</h3>
        <p className="text-[#64748B] text-xs leading-relaxed">
          {item.description}
        </p>
      </div>
      <DynamicButtonCta title={item.title} />
    </div>
  );

  return (
    <section id="services" className="w-full bg-gray-50/50 border-t border-gray-100 py-12 lg:py-16 overflow-x-hidden">
      <div className="max-w-7xl w-full mx-auto px-6">

        {/* Section Header */}
        <div className="mb-8">
          <p className="text-[#94A3B8] font-bold text-xs uppercase tracking-widest mb-1">Our Services</p>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-1">
            Comprehensive Mobility Services
          </h2>
          <p className="text-[#64748B] text-xs max-w-xl leading-relaxed">
            Tailored transportation solutions for every requirement in Visakhapatnam.
          </p>
        </div>

        {/* MOBILE & TABLET: Interactive Expanding Accordion Matrix (Hidden on lg) */}
        <div className="flex flex-col gap-2 lg:hidden">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            const isOpen = activeMobileIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveMobileIndex(idx)}
                onMouseEnter={() => setActiveMobileIndex(idx)}
                className={`flex flex-col rounded-xl transition-all duration-300 border bg-white overflow-hidden p-3 cursor-pointer
                  ${isOpen 
                    ? 'border-[#0F172A] ring-1 ring-[#0F172A] bg-white/40 backdrop-blur-md shadow-sm' 
                    : 'border-gray-300 bg-white/60 hover:border-gray-400 hover:bg-white'
                  }`}
              >
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#0F172A]' : 'text-[#64748B]'}`} />
                  <span className="text-xs font-semibold text-[#0F172A] tracking-tight">{s.title}</span>
                </div>

                {/* Animated Inner Expansion Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden flex flex-col">
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      {s.description}
                    </p>
                    <DynamicButtonCta title={s.title} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP: Asymmetric Staggered Grid Layout (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4">

          {/* Row 1: Split 60/40 */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3"><DesktopCard item={services[0]} /></div>
            <div className="col-span-2"><DesktopCard item={services[1]} /></div>
          </div>

          {/* Row 2: Symmetric 3-Card Split */}
          <div className="grid grid-cols-3 gap-4">
            <div><DesktopCard item={services[2]} /></div>
            <div><DesktopCard item={services[3]} /></div>
            <div><DesktopCard item={services[4]} /></div>
          </div>

          {/* Row 3: Inverted 40/60 */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2"><DesktopCard item={services[5]} /></div>
            <div className="col-span-3"><DesktopCard item={services[6]} /></div>
          </div>

          {/* Row 4: Final Duo Layout Balance */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7"><DesktopCard item={services[7]} /></div>
            <div className="col-span-5"><DesktopCard item={services[8]} /></div>
          </div>

        </div>

      </div>
    </section>
  );
}