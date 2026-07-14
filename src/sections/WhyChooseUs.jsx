import {
  Shield,
  MapPin,
  Headphones,
  Car,
  Wallet,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Professional Drivers",
    description:
      "Experienced, verified drivers who know every route in and around Vizag.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Reach us instantly via WhatsApp or phone — quick response, any time.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "What you see is what you pay. No hidden charges, no surprise fees.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "All vehicles are comprehensively insured for complete peace of mind.",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description:
      "City rides, outstation trips, and airport transfers across Andhra Pradesh.",
  },
  {
    icon: CheckCircle,
    title: "Well-Maintained Fleet",
    description:
      "Every vehicle is regularly serviced and inspected before each trip.",
  },
];

const proofStats = [
  { value: '50+', label: 'Vehicles Available' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '<10 min', label: 'Response Time' },
  { value: '7 yrs', label: 'In Business' },
  { value: '500+', label: 'Successful Rentals' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Numbers, not adjectives
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">Here's what backs up "reliable."</p>
        </div>

        {/* Proof strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12 pb-10 border-b border-gray-100">
          {proofStats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr_3fr] gap-10 items-center">

          {/* Car */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="https://i.ibb.co/qFRYSpzK/pngwing-com.png"
              alt="Premium rental car top view"
              className="
                w-full 
                max-w-sm 
                lg:max-w-xl 
                object-contain
                translate-x-6
                scale-105
                transition-transform duration-500 ease-out
                hover:-translate-y-4
              "
              style={{
                mixBlendMode: "multiply",
                maxHeight: "480px",
                filter: "drop-shadow(0px 25px 40px rgba(0,0,0,0.15))",
              }}
            />
          </div>

          {/* Tagline */}
          <div className="flex items-center lg:-ml-6">
            <p className="
              text-gray-500 
              text-[17px] 
              leading-7 
              max-w-xl
            ">
              From daily city commutes to long outstation journeys —{" "}
              <span className="text-gray-900 font-semibold">Girinova</span>{" "}
              has been getting Vizag where it needs to go since 2019, one
              trip at a time.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#1E3A8A] group-hover:scale-110">
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}