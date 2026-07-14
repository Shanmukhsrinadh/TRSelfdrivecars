import { Phone, MessageCircle, MapPin, Mail, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">

      {/* Map background — full section */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d950.0218105695968!2d83.3151254!3d17.740527999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39435dfcbfed87%3A0x693877a980513aa1!2sGirinova%20Car%20Rentals%20%26%20Services!5e0!3m2!1sen!2sin!4v1777102430623!5m2!1sen!2sin"
          className="w-full h-full border-0 pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Girinova Location"
        />
      </div>

      {/* Mobile: solid dark overlay. Desktop: left-to-right fade */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gray-950/90 lg:bg-transparent"
        style={{
          background: undefined,
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10,14,26,0.97) 0%, rgba(10,14,26,0.92) 32%, rgba(10,14,26,0.65) 54%, rgba(10,14,26,0.20) 74%, transparent 100%)",
        }}
      />
      {/* Mobile solid overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gray-950/88 lg:hidden" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">

          {/* Left — headline + CTAs */}
          <div className="lg:w-[48%] lg:pr-16">
            <p className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
              Book Instantly
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-black leading-tight text-white mb-4">
              Your ride is one
              <br />
              <span className="text-blue-400">message away</span>
            </h2>

            <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-sm">
              Get in touch today to book your ride, confirm availability, or ask
              any travel questions. We respond within minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/917702102097?text=Hi%2C%20I%20want%20to%20book%20a%20vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/40"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+917702102097"
                className="flex items-center justify-center gap-2.5 border border-white/25 hover:border-white/60 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                Call +91 770-210-2097
              </a>
            </div>
          </div>

          {/* Right — location card */}
          <div className="lg:w-[52%] lg:flex lg:justify-end">
            <div className="w-full lg:max-w-md bg-gray-900/75 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

              {/* Card header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">
                    Actual Location
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed max-w-xs">
                    The map behind shows our pickup and contact location. Open in Maps for directions.
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/aH4iYWQzd7aYqMbTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto flex-shrink-0 flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold tracking-wide uppercase px-3.5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in Maps
                </a>
              </div>

              <div className="h-px bg-white/10 mb-5" />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-white text-sm font-medium leading-snug">
                      Flat No-13, Omkar Towers, Seethammadhaara<br />Visakhapatnam, AP IN
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                    <a href="tel:+917702102097" className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
                      +91 770-210-2097
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Email</p>
                    <a href="mailto:khalidbabusyed@gmail.com" className="text-white text-sm font-medium hover:text-blue-400 transition-colors break-all">
                      khalidbabusyed@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
