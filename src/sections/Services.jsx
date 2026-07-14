import React from 'react';
import { motion } from 'framer-motion';
import { Building2, PlaneTakeoff, Map, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Building2 className="w-6 h-6" />,
    tag: 'City',
    title: 'Explore Vizag your way',
    description: 'No fixed routes, no waiting for autos. Meetings, errands, a beach evening at Rushikonda — the car and driver stay with you all day.',
    cta: 'Book a City Ride',
  },
  {
    icon: <PlaneTakeoff className="w-6 h-6" />,
    tag: 'Airport',
    title: 'Stress-free airport arrivals',
    description: 'We track your flight, not the clock — so a delay never means an empty pickup point. Driver on the curb, bags loaded, done.',
    cta: 'Book Airport Transfer',
  },
  {
    icon: <Map className="w-6 h-6" />,
    tag: 'Outstation',
    title: 'Weekend escapes',
    description: 'Araku Valley at sunrise, Annavaram for the family, Srikakulam for a quick detour — a driver who knows the ghat roads better than the GPS.',
    cta: 'Plan an Outstation Trip',
  },
];

export default function Services() {
  const handleBook = (name) => {
    window.open(`https://wa.me/917702102097?text=${encodeURIComponent(`Hi, I want to book a vehicle for ${name}.`)}`, '_blank');
  };

  return (
    <section id="services" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-[#1E3A8A] font-bold text-sm uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            The Right Ride<br />for Every Journey
          </h2>
          <p className="text-[#64748B] text-base leading-relaxed">
            Whether it's a quick city drop or a multi-day outstation trip, we have a vehicle and driver ready for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center text-white mb-5">
                {s.icon}
              </div>

              <span className="text-[#1E3A8A] text-xs font-bold uppercase tracking-widest mb-2">{s.tag}</span>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{s.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed flex-1 mb-6">{s.description}</p>

              <button
                onClick={() => handleBook(s.title)}
                className="flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#F97316] transition-colors group"
              >
                {s.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
