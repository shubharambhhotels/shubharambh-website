import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, Camera, Utensils, Car, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Banquet",
  description:
    "Grand banquet hall in Pithoragarh for weddings, receptions, corporate events, and cultural functions. 600+ guest capacity. Shubharambh Hotel.",
};

const eventTypes = [
  { name: "Weddings", icon: <Star size={18} />, desc: "Fairy-tale Himalayan weddings with full decoration, DJ, catering, and mandap setup." },
  { name: "Receptions", icon: <Users size={18} />, desc: "Elegant receptions for 100 to 500+ guests with complete event management." },
  { name: "Corporate Events", icon: <Mic size={18} />, desc: "Board meetings, conferences, product launches, and team offsites." },
  { name: "Seminars", icon: <Users size={18} />, desc: "Fully equipped seminar rooms with AV systems, projectors, and high-speed WiFi." },
  { name: "Family Functions", icon: <Users size={18} />, desc: "Anniversaries, naming ceremonies, birthday celebrations, and family gatherings." },
  { name: "Cultural Programs", icon: <Camera size={18} />, desc: "Folk dance performances, music evenings, and cultural exhibitions." },
];

const weddingPackages = [
  {
    name: "Silver Package",
    capacity: "Up to 125 Guests",
    features: ["Venue", "Decoration", "DJ", "Food"],
    price: "Custom Pricing",
    highlight: false,
  },
  {
    name: "Gold Package",
    capacity: "Up to 200 Guests",
    features: ["Venue", "Decoration", "DJ", "Food"],
    price: "Custom Pricing",
    highlight: true,
  },
  {
    name: "Platinum Package",
    capacity: "Up to 250 Guests",
    features: ["Venue", "Decoration", "DJ", "Food"],
    price: "Custom Pricing",
    highlight: false,
  },
];

const facilities = [
  { icon: <Users size={20} />, label: "600+ Capacity", desc: "Main hall with flexible seating configurations" },
  { icon: <Utensils size={20} />, label: "In-house Catering", desc: "Kumaoni, North Indian, and continental menus" },
  { icon: <Car size={20} />, label: "Free Parking", desc: "Spacious private parking for guests and vendors" },
  { icon: <Camera size={20} />, label: "Photography Setup", desc: "Dedicated photography and videography platforms" },
  { icon: <Mic size={20} />, label: "DJ & Sound", desc: "Professional sound system and DJ setup" },
  { icon: <Star size={20} />, label: "Stage & Mandap", desc: "Custom stage builds and traditional mandap setups" },
];

export default function EventsPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Celebrations & Functions</span>
          <h1 className="font-playfair text-5xl text-white mt-2">Events & Banquet</h1>
          <p className="font-hind text-white/50 mt-4 max-w-xl leading-relaxed">
            Pithoragarh's finest event venue — where Himalayan grandeur meets elegant hospitality.
          </p>
        </div>
      </div>

      {/* Intro with real photos */}
      <SectionWrapper bgColor="bg-ivory">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="border border-stone-light overflow-hidden aspect-[4/5] relative">
              <Image src="/images/banquet4.jpg" alt="Shubharambh Banquet Hall Interior" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-2/5 border-4 border-ivory overflow-hidden hidden lg:block aspect-square relative">
              <Image src="/images/mandap2.jpg" alt="Wedding Mandap Setup" fill className="object-cover" />
            </div>
          </div>
          <div>
            <span className="eyebrow">The Venue</span>
            <h2 className="font-playfair text-4xl text-charcoal">
              Grand Himalayan <em className="text-saffron not-italic">Banquet Hall</em>
            </h2>
            <div className="divider mt-4" />
            <p className="font-hind text-text-muted leading-relaxed mt-4 mb-4">
              Shubharambh's banquet hall is Pithoragarh's most prestigious event space — accommodating up to 600 guests across three floors — 1st Floor (200–250), 2nd Floor (150–200), and Rooftop (100–125), with a 24x7 café.
            </p>
            <p className="font-hind text-text-muted leading-relaxed mb-6">
              Whether you are planning an intimate family celebration or a full Himalayan wedding, our team handles every detail — from mandap construction and floral design to multi-cuisine catering.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[["600+", "Combined Capacity"], ["3", "Floors & Areas"], ["2025", "Established"]].map(([val, label]) => (
                <div key={label} className="text-center border border-stone-light p-4">
                  <span className="font-playfair text-2xl text-saffron font-semibold block">{val}</span>
                  <span className="font-hind text-[11px] text-text-muted uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
            <Link href="/contact?purpose=Wedding+%2F+Event" className="btn-primary">
              Enquire for Events
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Wedding Packages + Venue Table */}
      <SectionWrapper id="weddings" bgColor="bg-stone-light">
        <div className="text-center mb-12">
          <span className="eyebrow">Weddings</span>
          <h2 className="font-playfair text-3xl text-charcoal">
            Wedding <em className="text-saffron not-italic">Packages</em>
          </h2>
          <div className="divider divider-center mt-4" />
          <p className="font-hind text-text-muted max-w-md mx-auto mt-4 leading-relaxed">
            Tailored packages for every scale of celebration. All packages can be fully customised.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weddingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`border p-8 flex flex-col ${
                pkg.highlight ? "border-saffron bg-saffron-pale" : "border-stone-light bg-white"
              }`}
            >
              {pkg.highlight && (
                <span className="font-hind text-[10px] font-bold tracking-widest uppercase text-saffron mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="font-playfair text-2xl text-charcoal mb-1">{pkg.name}</h3>
              <p className="font-hind text-[12px] text-text-muted uppercase tracking-wide mb-5">{pkg.capacity}</p>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-hind text-sm text-charcoal-mid">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--forest)" strokeWidth="2">
                      <path d="M3 8l4 4 6-6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-stone-light pt-5">
                <p className="font-playfair text-lg text-saffron font-semibold mb-3">{pkg.price}</p>
                <Link href="/contact?purpose=Wedding+%2F+Event" className="btn-primary w-full text-center block">
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="font-hind text-sm text-text-muted text-center mt-8 max-w-xl mx-auto leading-relaxed">
          Final pricing is subject to selected menu, decoration requirements, and event specifications. Contact us for a custom quote.
        </p>
        <div className="mt-8 border border-stone-light bg-white max-w-xl mx-auto">
          <div className="bg-forest px-5 py-3">
            <p className="font-playfair text-base text-white">Venue Details</p>
          </div>
          <table className="w-full text-sm font-hind">
            <thead>
              <tr className="bg-ivory border-b border-stone-light">
                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted">Floor / Area</th>
                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted">Min Capacity</th>
                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted">Max Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light">
              {[
                ["1st Floor", "200", "250"],
                ["2nd Floor", "150", "200"],
                ["Rooftop", "100", "125"],
                ["Café", "24x7", "—"],
              ].map(([floor, min, max]) => (
                <tr key={floor} className="hover:bg-ivory transition-colors">
                  <td className="px-5 py-3 text-charcoal font-medium">{floor}</td>
                  <td className="px-5 py-3 text-text-muted">{min}</td>
                  <td className="px-5 py-3 text-text-muted">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-hind text-sm font-semibold text-white bg-red-600 px-5 py-3">
            Total venue capacity can cater up to 600 people for combined/large events.
          </p>
        </div>
      </SectionWrapper>

      {/* Gallery strip */}
      <SectionWrapper bgColor="bg-ivory">
        <div className="text-center mb-10">
          <span className="eyebrow">Our Venue</span>
          <h2 className="font-playfair text-3xl text-charcoal">
            Inside <em className="text-saffron not-italic">Shubharambh</em>
          </h2>
          <div className="divider divider-center mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { src: "/images/banquet5.jpg", alt: "Banquet Hall" },
            { src: "/images/mandap2.jpg", alt: "Wedding Mandap" },
            { src: "/images/banquet-hall.jpeg", alt: "Banquet Setup" },
            { src: "/images/catering1.jpg", alt: "Food section" },
            { src: "/images/catering2.jpg", alt: "Food Hall" },
            { src: "/images/shubharambh2.jpg", alt: "View of the Banquet Hall" },
          ].map((img) => (
            <div key={img.alt} className="relative aspect-[4/3] overflow-hidden border border-stone-light">
              <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Event types */}
      <SectionWrapper bgColor="bg-stone-light">
        <div className="text-center mb-12">
          <span className="eyebrow">What We Host</span>
          <h2 className="font-playfair text-3xl text-charcoal">
            Every Celebration, <em className="text-saffron not-italic">Welcomed</em>
          </h2>
          <div className="divider divider-center mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eventTypes.map((e) => (
            <div key={e.name} className="bg-white border border-stone-light p-6 hover:border-saffron transition-colors group">
              <div className="text-saffron mb-3">{e.icon}</div>
              <h3 className="font-playfair text-lg text-charcoal mb-2">{e.name}</h3>
              <p className="font-hind text-sm text-text-muted leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Facilities */}
      <SectionWrapper bgColor="bg-forest">
        <div className="text-center mb-12">
          <span className="eyebrow text-gold-light/70">Hall Features</span>
          <h2 className="font-playfair text-3xl text-ivory">
            Everything <em className="text-gold-light not-italic">Included</em>
          </h2>
          <div className="divider divider-center mt-4" style={{ backgroundColor: "var(--gold)" }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/10">
          {facilities.map((f) => (
            <div key={f.label} className="border-b border-r border-white/10 p-6 hover:bg-white/5 transition-colors group">
              <div className="text-gold mb-3">{f.icon}</div>
              <h3 className="font-playfair text-base text-ivory mb-1">{f.label}</h3>
              <p className="font-hind text-sm text-ivory/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}