import { useState } from "react";
import { IdCard, FileText, Coins, MapPin, ExternalLink, ChevronDown } from "lucide-react";

export default function PickupRequirements() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What are the timings for vehicle pickup?",
      a: "Pickups are available from 6:00 AM to 10:00 PM. Please coordinate your arrival at least 30 minutes in advance."
    },
    {
      q: "Is the security deposit refunded instantly?",
      a: "Yes, the refundable monetary deposit is processed immediately upon returning the vehicle safely."
    },
    {
      q: "Can I extend my ride duration later?",
      a: "Extensions are subject to availability. Message us via WhatsApp 2 hours before your trip ends."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="requirements" className="bg-white lg:h-screen w-full flex items-center py-16 lg:py-0 px-6 md:px-12 lg:px-24 font-sans text-[#0f172a] select-none">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

        {/* Left Column: Fixed Structural Dimensions (7/12 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-[520px]">

          {/* Section 1: Requirements (Fixed Height Boundary) */}
          <div className="h-[250px]">
            <div className="mb-4">
              <p className="text-[#94A3B8] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
                PROCESS.
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                Pickup Requirements
              </h2>
            </div>

            {/* Compact Requirements List */}
            <div className="space-y-2">
              <div className="flex items-start gap-3.5 border border-[#e2e8f0] rounded-xl p-3 bg-white shadow-sm">
                <IdCard className="w-4 h-4 text-[#0f172a] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#0f172a] font-semibold text-xs mb-0.5">Valid Driving License</h4>
                  <p className="text-[#64748b] text-[11px] leading-relaxed">Original copy must be presented for physical matching.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border border-[#e2e8f0] rounded-xl p-3 bg-white shadow-sm">
                <FileText className="w-4 h-4 text-[#0f172a] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#0f172a] font-semibold text-xs mb-0.5">Government ID</h4>
                  <p className="text-[#64748b] text-[11px] leading-relaxed">Valid proof of identity required (e.g., ID card).</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border border-[#e2e8f0] rounded-xl p-3 bg-white shadow-sm">
                <Coins className="w-4 h-4 text-[#0f172a] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#0f172a] font-semibold text-xs mb-0.5">Security Deposit</h4>
                  <p className="text-[#64748b] text-[11px] leading-relaxed">Two-wheeler asset deposit or refundable monetary deposit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Fixed Height FAQ Block (Locks dimensions entirely) */}
          <div className="h-[230px] flex flex-col justify-end">
            <h3 className="text-[#0f172a] font-bold text-[11px] tracking-[0.2em] uppercase mb-3 text-opacity-90">
              FREQUENTLY ASKED QUESTIONS.
            </h3>

            {/* The outer container and inner panels use rigid layout rules to prevent any size mutation */}
            <div className="border border-[#e2e8f0] rounded-xl divide-y divide-[#e2e8f0] bg-white shadow-sm overflow-hidden h-[175px] flex flex-col justify-start">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-white flex-shrink-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between gap-4 p-3 text-left text-[#0f172a] hover:bg-[#f8fafc] transition-colors"
                    >
                      <span className="text-xs font-semibold leading-none truncate">{faq.q}</span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 text-[#64748b] flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180 text-[#0f172a]" : ""
                        }`}
                      />
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isOpen ? "max-h-[75px] border-t border-[#f1f5f9]" : "max-h-0"
                      }`}
                    >
                      <p className="p-3 text-[11px] text-[#64748b] bg-[#f8fafc] leading-relaxed dynamic-text-box">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Coverage Map Card matching exact layout specifications (5/12 Cols) */}
        <div className="lg:col-span-5 border border-[#e2e8f0] rounded-2xl p-8 bg-white shadow-sm w-full max-w-xl mx-auto flex flex-col justify-between h-[520px]">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <MapPin className="w-5 h-5 text-[#0f172a]" />
              <h3 className="text-[#0f172a] font-bold text-lg tracking-tight">
                Coverage Map
              </h3>
            </div>

            <p className="text-[#64748b] text-xs mb-6">
              Care Hospital Arilova hub with priority delivery limits:
            </p>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {[
                "Simhachalam",
                "Madurawada",
                "Gajuwaka",
                "NAD X Road",
                "Railway Station",
                "Vizag Airport",
              ].map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2.5 text-[#334155] text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Navy Button matching the hero layout style */}
          <a
            href="https://maps.app.goo.gl/aH4iYWQzd7aYqMbTA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold py-4 rounded-xl transition-all shadow-sm mt-auto"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>

      </div>
    </section>
  );
}