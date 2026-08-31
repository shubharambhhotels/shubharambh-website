import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";
import Link from "next/link";

const features = [
  { title: "Wedding Packages", desc: "Full décor, catering, DJ, stage design, and floral arrangements." },
  { title: "Corporate Events", desc: "Conference hall with AV equipment and high-speed WiFi." },
  { title: "Kumaoni Catering", desc: "Traditional and contemporary multi-cuisine menus by our chefs." },
  { title: "Free Parking", desc: "Spacious private parking for all guests and vendors." },
];

const stats = [
  { value: "500+", label: "Guest Capacity" },
  { value: "2025", label: "Established" },
  { value: "3", label: "Packages" },
];

export default function BanquetSection() {
  return (
    <SectionWrapper id="banquet" bgColor="bg-ivory-dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Images side */}
        <div className="relative">
          {/* Main image */}
          <div className="border border-stone-light overflow-hidden aspect-[4/5] relative">
            <Image
              src="/images/banquet-hall.jpeg"
              alt="Shubharambh Banquet Hall"
              fill
              className="object-cover"
            />
          </div>
          {/* Accent image — bottom right overlap */}
          <div className="absolute -bottom-6 -right-6 w-2/5 border-4 border-ivory-dark overflow-hidden hidden lg:block aspect-square relative">
            <Image
              src="/images/banquet-hall2.jpeg"
              alt="Shubharambh Banquet Setup"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content side */}
        <div>
          <span className="eyebrow">Events & Celebrations</span>
          <h2 className="font-playfair text-4xl text-charcoal">
            Your Grand{" "}
            <em className="text-saffron not-italic">Himalayan Event</em>
          </h2>
          <div className="divider mt-4" />
          <p className="font-hind text-text-muted leading-relaxed mt-4 mb-8">
            From intimate family functions to grand weddings for 500 guests —
            our banquet hall is Pithoragarh's finest event venue, set against
            the backdrop of sacred Himalayan peaks.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mb-10">
            {stats.map((s) => (
              <div key={s.label}>
                <span className="font-playfair text-4xl text-saffron font-bold block">
                  {s.value}
                </span>
                <span className="font-hind text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-5 mb-8">
            {features.map((f) => (
              <div key={f.title} className="border-l-2 border-saffron pl-4">
                <h4 className="font-playfair text-[1rem] text-charcoal mb-1">{f.title}</h4>
                <p className="font-hind text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/events" className="btn-primary">
            Enquire for Events
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
