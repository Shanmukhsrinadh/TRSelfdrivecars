import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {showTooltip && (
        <div className="bg-white text-[#0F172A] text-sm font-semibold py-2 px-4 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap">
          Book via WhatsApp
        </div>
      )}
      <button
        onClick={() => window.open('https://wa.me/917702102097', '_blank')}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
