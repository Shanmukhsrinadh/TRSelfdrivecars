const REVIEWS = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'PS',
    avatarColor: 'from-pink-400 to-rose-500',
    car: 'Hyundai Creta SX 2022',
    rating: 5,
    text: "Mohan Cars completely changed my mind about buying used cars. The paperwork took less than a day, and they delivered it to my doorstep. Zero stress.",
  },
  {
    name: 'Arjun Nair',
    city: 'Bangalore',
    avatar: 'AN',
    avatarColor: 'from-sky-400 to-indigo-500',
    car: 'Toyota Fortuner 2021',
    rating: 5,
    text: "Showed me the full inspection report before I even asked. No pressure, no upselling.",
  },
  {
    name: 'Sneha Kulkarni',
    city: 'Pune',
    avatar: 'SK',
    avatarColor: 'from-violet-400 to-purple-500',
    car: 'Maruti Baleno 2022',
    rating: 5,
    text: "Got a great EMI deal and drove home the same week!",
  },
  {
    name: 'Rahul Desai',
    city: 'Delhi',
    avatar: 'RD',
    avatarColor: 'from-emerald-400 to-teal-500',
    car: 'BMW 3 Series 2020',
    rating: 5,
    text: "Pricing was fair and the process was completely hassle-free.",
  },
  {
    name: 'Meera Iyer',
    city: 'Chennai',
    avatar: 'MI',
    avatarColor: 'from-amber-400 to-orange-500',
    car: 'Tata Nexon EV 2023',
    rating: 5,
    text: "Felt like advice from a friend, not a salesperson.",
  },
  {
    name: 'Vikram Joshi',
    city: 'Hyderabad',
    avatar: 'VJ',
    avatarColor: 'from-cyan-400 to-sky-500',
    car: 'Kia Seltos 2022',
    rating: 5,
    text: "Entire journey was digital and smooth.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full" />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm 
                    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
                    transition-all duration-300">

      <Stars count={review.rating} />

      <p className="text-gray-700 text-sm mt-3 mb-4 leading-relaxed">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarColor}
                        flex items-center justify-center text-white text-xs font-bold`}>
          {review.avatar}
        </div>

        <div>
          <p className="text-gray-900 text-sm font-semibold">
            {review.name}
          </p>
          <p className="text-gray-500 text-xs">
            {review.city} · {review.car}
          </p>
        </div>
      </div>
    </div>
  );
}

function Column({ data, speed }) {
  return (
    <div className="overflow-hidden h-[500px] relative mask-fade">
      <div className={`flex flex-col gap-5 ${speed}`}>
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

      {/* Header */}
      <div className="text-center mb-14 px-4">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
          Testimonials
        </p>

        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
          What our users say
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Discover how thousands of teams streamline their operations.
        </p>
      </div>

      {/* Columns */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">

        {/* Mobile = 1 */}
        <Column data={COLUMN_1} speed="animate-slow" />

        {/* Tablet = 2 */}
        <div className="hidden sm:block">
          <Column data={COLUMN_2} speed="animate-medium" />
        </div>

        {/* Desktop = 3 */}
        <div className="hidden md:block">
          <Column data={COLUMN_3} speed="animate-fast" />
        </div>

      </div>
    </section>
  );
}