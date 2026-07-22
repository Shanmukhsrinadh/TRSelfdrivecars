import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { label: 'City Tour — Vizag', sub: 'Daily city rides', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&auto=format' },
  { label: 'Araku Valley', sub: 'Outstation trips', image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=900&q=80&auto=format' },
  { label: 'Airport Transfer', sub: 'On-time pickups', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&auto=format' },
  { label: 'Family Getaway', sub: 'Weekend escapes', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=80&auto=format' },
  { label: 'Corporate Travel', sub: 'Business class', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=80&auto=format' },
  { label: 'Coastal Drive', sub: 'Rushikonda & Bheemili', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80&auto=format' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-[#94A3B8] font-bold text-sm uppercase tracking-widest mb-3">Gallery</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Moments from Our Journeys</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[220px]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 ${i === 1 || i === 4 ? 'md:row-span-2' : ''}`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center pb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-white/90 text-[#0F172A]">
                  {item.sub}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {item.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
