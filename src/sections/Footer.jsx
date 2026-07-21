import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "919550563283";

  // Keyword-optimized links acting as internal SEO backlinks
  const services = [
    { name: 'Self Drive Cars Vizag', href: '#vehicles', title: 'Self Drive Car Rental Vizag' },
    { name: 'Airport Pickups', href: '#services', title: 'Visakhapatnam Airport Car Rental' },
    { name: 'Outstation Trips', href: '#services', title: 'Outstation Car Rentals from Vizag' },
    { name: 'Local Rentals', href: '#services', title: 'Local Hourly Car Rentals' },
  ];

  const exploreLinks = [
    { name: 'Our Fleet', href: '#vehicles' },
    { name: 'How It Works', href: '#services' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Requirements', href: '#requirements' },
  ];

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-100 py-10 font-sans" role="contentinfo">
      <div className="max-w-[1180px] mx-auto px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 pb-8 border-b border-slate-100">

          {/* Brand Identity */}
          <div className="col-span-2 space-y-3">
            <a href="#home" className="inline-flex items-center gap-3 no-underline" title="TRSELDFRIVECARS">
              <div className="w-9 h-9 rounded-full border-[1.5px] border-black flex items-center justify-center shrink-0">
                <span 
                  className="font-semibold text-[15px] text-black leading-none"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  T
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span 
                  className="font-bold text-[13px] md:text-[14px] tracking-[0.15em] text-black whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  TRSELDFRIVECARS
                </span>
                <span className="text-[9px] font-medium tracking-[0.3em] text-[#64748B] whitespace-nowrap mt-1">
                  SELF DRIVE
                </span>
              </div>
            </a>

            {/* Concise Hyperlinked Tagline for SEO */}
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Premimun <a href="#vehicles" className="text-slate-700 font-medium hover:underline">self drive cars in Visakhapatnam</a> by Padma Priya Enterprises.
            </p>
          </div>

          {/* Column 1: Services (SEO Backlinks) */}
          <nav aria-label="Services" className="col-span-1">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">
              Services
            </h2>
            <ul className="space-y-2 text-xs text-slate-500">
              {services.map((item) => (
                <li key={item.name}>
                  <a href={item.href} title={item.title} className="hover:text-black transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2: Explore */}
          <nav aria-label="Explore" className="col-span-1">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">
              Explore
            </h2>
            <ul className="space-y-2 text-xs text-slate-500">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-black transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <address className="not-italic col-span-2 md:col-span-1 border-t md:border-none border-slate-100 pt-6 md:pt-0 space-y-3">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">
              Contact
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <a href={`tel:+${phoneNumber}`} className="hover:text-black transition-colors">
                +91 955-056-3283
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <a href="https://maps.google.com/?q=Visakhapatnam" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                Visakhapatnam, AP
              </a>
            </div>

            {/* WhatsApp Button */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-[#262626] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="block">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </address>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center md:text-left">
          <p>© {currentYear} Padma Priya Enterprises.</p>

          <div className="flex items-center gap-4 text-[11px] md:text-xs">
            <a href="#privacy" className="hover:text-black transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-black transition-colors">Terms</a>
          </div>

          <p className="text-[10px] md:text-[11px] text-slate-400">
            DESIGNED BY{" "}
            <a
              href="https://shanmukhportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-semibold hover:text-blue-600 transition-colors"
            >
              SHANMUKH SRINADH
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}