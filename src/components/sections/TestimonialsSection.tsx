import SectionWrapper from "@/components/ui/SectionWrapper";

const testimonials = [
  {
    quote:
      "Staying at Shubharambh was the most spiritually enriching experience of my life. The Adi Kailash tour they arranged left me completely transformed.",
    name: "Rajesh Kumar",
    origin: "Delhi",
    type: "Pilgrim",
    initials: "RK",
  },
  {
    quote:
      "We hosted our daughter's wedding here and it was beyond our dreams. The hall décor, Kumaoni cuisine, and mountain backdrop made it truly magical.",
    name: "Priya Mehta",
    origin: "Mumbai",
    type: "Wedding",
    initials: "PM",
  },
  {
    quote:
      "The mountain view suite was extraordinary. Waking to Panchachuli peaks every morning was worth every rupee. The staff treated us like family.",
    name: "Ananya Singh",
    origin: "Bangalore",
    type: "Trekker",
    initials: "AS",
  },
];

const StarRating = () => (
  <div className="flex gap-0.5 mb-4" aria-label="5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 16 16" width="14" height="14" fill="var(--gold)" aria-hidden="true">
        <path d="M8 1.5l1.7 3.5 3.8.55-2.75 2.68.65 3.77L8 10.2l-3.4 1.8.65-3.77L2.5 5.55 6.3 5 8 1.5z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" bgColor="bg-ivory">
      <div className="text-center mb-14">
        <span className="eyebrow">Guest Stories</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          Voices from the <em className="text-saffron not-italic">Mountains</em>
        </h2>
        <div className="divider divider-center mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border-t-2 border-saffron p-8"
          >
            <StarRating />
            <blockquote className="font-playfair text-[1rem] text-charcoal italic leading-[1.75] mb-6">
              "{t.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron-pale border border-saffron/20 flex items-center justify-center">
                <span className="font-playfair text-sm text-saffron font-bold">
                  {t.initials}
                </span>
              </div>
              <div>
                <p className="font-hind text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="font-hind text-[12px] text-text-muted">
                  {t.origin} &middot; {t.type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
