const REVIEWS = [
  {
    name: 'Priya Sharma',
    city: 'Visakhapatnam',
    avatar: 'PS',
    car: 'Hyundai Creta SX',
    rating: 5,
    text: "Booking was instant and the car was exactly as described. Picked it up, drove to Araku, returned — zero hassle from start to finish.",
  },
  {
    name: 'Arjun Nair',
    city: 'Visakhapatnam',
    avatar: 'AN',
    car: 'Toyota Fortuner',
    rating: 5,
    text: "Best self-drive experience in Vizag. Clean car, transparent pricing, and they responded on WhatsApp within minutes.",
  },
  {
    name: 'Sneha Kulkarni',
    city: 'Visakhapatnam',
    avatar: 'SK',
    car: 'Maruti Baleno',
    rating: 5,
    text: "Used it for a week-long trip. The car was well-maintained and the support team was always reachable. Would book again.",
  },
  {
    name: 'Rahul Desai',
    city: 'Visakhapatnam',
    avatar: 'RD',
    car: 'Tata Nexon',
    rating: 5,
    text: "Very fair pricing compared to others in Vizag. No hidden charges, everything was clear upfront.",
  },
  {
    name: 'Meera Iyer',
    city: 'Visakhapatnam',
    avatar: 'MI',
    car: 'Maruti Fronx',
    rating: 5,
    text: "Drove to Rushikonda and RK Beach over the weekend. The car was spotless and fuel-efficient. Great service.",
  },
  {
    name: 'Vikram Joshi',
    city: 'Visakhapatnam',
    avatar: 'VJ',
    car: 'Kia Seltos',
    rating: 5,
    text: "Smooth pickup, no paperwork drama. The whole process felt professional. Highly recommend for outstation trips.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#0F172A] text-[11px] leading-none">★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
      <Stars count={review.rating} />

      <p className="text-[#374151] text-sm mt-3 mb-5 leading-relaxed">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
          {review.avatar}
        </div>
        <div>
          <p className="text-[#0F172A] text-sm font-semibold leading-none">{review.name}</p>
          <p className="text-[#94A3B8] text-xs mt-0.5">{review.city} · {review.car}</p>
        </div>
      </div>
    </div>
  );
}

function Column({ data, speed }) {
  return (
    <div className="overflow-hidden h-[520px] relative mask-fade">
      <div className={`flex flex-col gap-4 ${speed}`}>
        {[...data, ...data].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const COLUMN_1 = REVIEWS;
  const COLUMN_2 = [...REVIEWS.slice(2), ...REVIEWS.slice(0, 2)];
  const COLUMN_3 = [...REVIEWS.slice(4), ...REVIEWS.slice(0, 4)];

  return (
    <section className="py-20 bg-white overflow-hidden">

      <div className="text-center mb-14 px-4">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
          What our customers say
        </h2>
        <p className="text-[#64748B] text-sm mt-3 max-w-sm mx-auto leading-relaxed">
          Real reviews from people who've driven with us across Visakhapatnam.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4">
        <Column data={COLUMN_1} speed="animate-slow" />
        <div className="hidden sm:block">
          <Column data={COLUMN_2} speed="animate-medium" />
        </div>
        <div className="hidden md:block">
          <Column data={COLUMN_3} speed="animate-fast" />
        </div>
      </div>

    </section>
  );
}
