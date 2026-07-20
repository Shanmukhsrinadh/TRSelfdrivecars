import React from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">

          {/* Brand + SEO text */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#1E3A8A] text-white flex items-center justify-center font-bold rounded-md text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                G
              </div>
              <span className="font-semibold text-sm">
                Padma Priya Enterprises
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Girinova is Padma Priya Enterprises' car rental and driver service,
              serving Visakhapatnam with airport pickups, outstation trips, and
              local travel across Andhra Pradesh.
            </p>
          </div>

          {/* Services (SEO keywords) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white">
              Services
            </h4>
            <ul className="space-y-2 text-[#64748B] text-xs">
              <li><a href="#services">Car Rental Vizag</a></li>
              <li><a href="#services">Airport Pickup</a></li>
              <li><a href="#services">Outstation Trips</a></li>
              <li><a href="#services">Driver Services</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white">
              Company
            </h4>
            <ul className="space-y-2 text-[#64748B] text-xs">
              <li><a href="#home">Home</a></li>
              <li><a href="#vehicles">Fleet</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white">
              Contact
            </h4>

            <ul className="space-y-2 text-xs text-[#64748B]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" />
                +91 770-210-2097
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1E3A8A] mt-0.5" />
                Visakhapatnam, Andhra Pradesh
              </li>

              <li>
                <button
                  onClick={() => window.open('https://wa.me/917702102097', '_blank')}
                  className="flex items-center gap-2 mt-2 bg-[#25D366] px-3 py-1.5 rounded-md text-white text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-4 flex flex-col items-center text-xs text-[#475569] gap-2">

          <p>© {currentYear} Padma Priya Enterprises</p>

          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>

          {/* Signature */}
          <p className="text-[10px] tracking-wider text-[#64748B] mt-1">
            DESIGNED BY{" "}
            <a
              href="https://shanmukhportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E3A8A] font-medium hover:text-[#2554D6] transition-colors duration-300"
            >
              SHANMUKH SRINADH
            </a>
          </p>

        </div>

      </div>
    </footer>
  );
}