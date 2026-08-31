import SectionWrapper from "@/components/ui/SectionWrapper";

const features = [
  {
    title: "Near Naini-Saini Airport",
    desc: "Minutes from the airport with commanding views of Pithoragarh Fort and the Himalayan peaks.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16l-9 5-9-5V8l9-5 9 5v8z" />
        <path d="M12 3v18M3 8l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Spiritual Tour Gateway",
    desc: "Expert-guided journeys to Adi Kailash, Patal Bhuvaneshwar, and Mansarovar pilgrimage routes.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: "Grand Banquet Hall",
    desc: "Elegant spaces for 500+ guests — weddings, receptions, conferences, and cultural functions.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Kumaoni Cuisine",
    desc: "Authentic mountain flavours — Bhatt ki Churkani, Aloo Ke Gutke, and local herb teas.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
  {
    title: "Mountain View Rooms",
    desc: "Wake to panoramic vistas of snow-capped peaks from your private balcony or suite window.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="1" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v3M9 15h6" />
      </svg>
    ),
  },
  {
    title: "Adventure Base Camp",
    desc: "Starting point for treks to Panchachuli, Milam Glacier, and rafting on the Kali river.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17l5-10 4 6 3-4 6 8H3z" />
      </svg>
    ),
  },
  {
    title: "Wedding Destination",
    desc: "Your Himalayan fairy-tale wedding with majestic snow peaks as your natural backdrop.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Cultural Heritage",
    desc: "Chholiya dance performances, Kumaoni craft workshops, and festival celebrations on site.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13M9 9l12-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
];

export default function WhyStaySection() {
  return (
    <SectionWrapper id="why-stay" bgColor="bg-ivory-dark">
      <div className="text-center mb-14">
        <span className="eyebrow">The Shubharambh Difference</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          A Journey Beyond <em className="text-saffron not-italic">Hospitality</em>
        </h2>
        <div className="divider divider-center mt-4" />
        <p className="font-hind text-text-muted max-w-lg mx-auto leading-relaxed mt-4">
          Perched above the Saur valley, Shubharambh is more than a hotel — it is your portal to the spiritual heart of the Kumaon Himalayas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-light">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 border-b border-r border-stone-light hover:bg-saffron-pale transition-colors duration-300 group"
          >
            <div className="text-forest mb-4 group-hover:text-saffron transition-colors">
              {f.icon}
            </div>
            <h3 className="font-playfair text-[1.05rem] text-charcoal mb-2">{f.title}</h3>
            <p className="font-hind text-sm text-text-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
