import { X } from 'lucide-react';

const CREDITS = [
  {
    category: 'Design & Development',
    items: [
      {
        title: 'Website Design & Development',
        author: 'Shanmukh Srinadh',
        description: 'Full UI/UX design and frontend development of this website.',
        link: 'https://shanmukhportfolio.vercel.app/',
        linkLabel: 'shanmukhportfolio.vercel.app',
      },
    ],
  },
  {
    category: 'Images',
    items: [
      {
        title: 'Car Top-View Image (Why Choose Us section)',
        author: 'PNGWing',
        description: 'Free-to-use PNG image of a car used in the About / Why Choose Us section of this website.',
        link: 'https://www.pngwing.com',
        linkLabel: 'pngwing.com',
        note: 'Source: pngwing.com — free for non-commercial use with attribution.',
      },
    ],
  },
  {
    category: 'Open Source Libraries',
    items: [
      {
        title: 'React',
        author: 'Meta Open Source',
        description: 'The JavaScript library used to build this user interface.',
        link: 'https://react.dev',
        linkLabel: 'react.dev',
        license: 'MIT License',
      },
      {
        title: 'Vite',
        author: 'Evan You & Contributors',
        description: 'The build tool and development server powering this project.',
        link: 'https://vitejs.dev',
        linkLabel: 'vitejs.dev',
        license: 'MIT License',
      },
      {
        title: 'Tailwind CSS',
        author: 'Tailwind Labs',
        description: 'The utility-first CSS framework used for all styling on this website.',
        link: 'https://tailwindcss.com',
        linkLabel: 'tailwindcss.com',
        license: 'MIT License',
      },
      {
        title: 'Lucide React',
        author: 'Lucide Contributors',
        description: 'The icon library used throughout the website for all UI icons.',
        link: 'https://lucide.dev',
        linkLabel: 'lucide.dev',
        license: 'ISC License',
      },
      {
        title: 'MapLibre GL JS',
        author: 'MapLibre Contributors',
        description: 'The open-source map rendering engine powering the live animated map in the hero section.',
        link: 'https://maplibre.org',
        linkLabel: 'maplibre.org',
        license: 'BSD 3-Clause License',
      },
      {
        title: 'OpenStreetMap',
        author: 'OpenStreetMap Contributors',
        description: 'Map data used in the hero section, provided under the Open Database Licence.',
        link: 'https://www.openstreetmap.org',
        linkLabel: 'openstreetmap.org',
        license: 'ODbL 1.0',
      },
      {
        title: 'Framer Motion',
        author: 'Framer',
        description: 'Animation library used for smooth transitions and motion effects.',
        link: 'https://www.framer.com/motion/',
        linkLabel: 'framer.com/motion',
        license: 'MIT License',
      },
    ],
  },
  {
    category: 'Fonts',
    items: [
      {
        title: 'Google Fonts',
        author: 'Google',
        description: 'Web fonts served via Google Fonts, including Space Grotesk and Inter used across the site.',
        link: 'https://fonts.google.com',
        linkLabel: 'fonts.google.com',
        license: 'SIL Open Font License',
      },
    ],
  },
];

export default function CreditsPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto" role="dialog" aria-modal="true" aria-label="Credits">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Acknowledgements</p>
          <h1 className="text-base font-bold text-[#0F172A]">Credits</h1>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors" aria-label="Close">
          <X className="w-4 h-4 text-[#0F172A]" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        <p className="text-sm text-[#64748B] leading-relaxed">
          This website was built using a number of open-source tools, free resources, and the contributions of talented individuals. We sincerely thank everyone listed below.
        </p>

        {CREDITS.map((section) => (
          <div key={section.category} className="space-y-4">
            <h2 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest pb-2 border-b border-gray-100">
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.title} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[#0F172A] font-semibold text-sm">{item.title}</h3>
                      <p className="text-[#94A3B8] text-xs mt-0.5">{item.author}</p>
                    </div>
                    {item.license && (
                      <span className="text-[10px] font-medium text-[#64748B] bg-white border border-gray-200 rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0">
                        {item.license}
                      </span>
                    )}
                  </div>
                  <p className="text-[#64748B] text-xs leading-relaxed">{item.description}</p>
                  {item.note && (
                    <p className="text-[#94A3B8] text-[11px] italic">{item.note}</p>
                  )}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#0F172A] text-xs font-semibold hover:underline mt-1"
                  >
                    ↗ {item.linkLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-xs text-[#94A3B8] pt-4 border-t border-gray-100">
          © {new Date().getFullYear()} Padma Priya Enterprises, Visakhapatnam. All rights reserved.
        </p>
      </div>
    </div>
  );
}
