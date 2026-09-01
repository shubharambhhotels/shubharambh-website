import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import Image from "next/image"; 
import { Wifi, Droplets, Tv, Car, UtensilsCrossed, Eye, ArrowRight } from "lucide-react";

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: "₹3,000",
    priceDbl: "₹4,000",
    occupancy: "1–2 Persons",
    badge: "Most Popular",
    badgeColor: "bg-saffron",
    desc: "Spacious room with a private balcony overlooking the Himalayan ridgeline and Pithoragarh valley.",
    amenities: ["Mountain View", "King Bed", "Free WiFi", "Hot Water", "Room Service"],
    image: "/images/rooms/deluxe2.jpg",
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room",
    price: "₹3,500",
    priceDbl: "₹4,500",
    occupancy: "1–2 Persons",
    badge: "",
    badgeColor: "",
    desc: "Contemporary room with garden and valley views, premium linens, and all modern amenities.",
    amenities: ["Garden View", "Queen Bed", "Smart TV", "Free WiFi", "Hot Water"],
    image: "/images/rooms/super-deluxe1.jpg",
  },
  {
    id: "executive",
    name: "Executive Room",
    price: "₹4,000",
    priceDbl: "₹5,000",
    occupancy: "1–2 Persons",
    badge: "Luxury",
    badgeColor: "bg-forest",
    desc: "Premium room with AC, private balcony, panoramic snow-peak views, and a separate living area.",
    amenities: ["Panoramic View", "Private Balcony", "AC", "Smart TV", "Safe/Locker"],
    image: "/images/rooms/executive2.jpg",
  },
  {
    id: "family-suite",
    name: "Family Suite",
    price: "—",
    priceDbl: "₹7,500",
    occupancy: "2–4 Persons",
    badge: "Best for Families",
    badgeColor: "bg-gold",
    desc: "Spacious suite with living area, AC, private balcony, and mountain-facing windows — ideal for families.",
    amenities: ["Living Area", "AC", "Balcony", "Smart TV", "Safe/Locker"],
    image: "/images/rooms/family-suite1.jpg",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi size={13} />,
  "Hot Water": <Droplets size={13} />,
  "Smart TV": <Tv size={13} />,
  "Minibar": <UtensilsCrossed size={13} />,
  "Mountain View": <Eye size={13} />,
  "Panoramic View": <Eye size={13} />,
  "Garden View": <Eye size={13} />,
  "Parking": <Car size={13} />,
};

export default function RoomsSection() {
  return (
    <SectionWrapper id="rooms" bgColor="bg-stone-light">
      <div className="mb-14">
        <span className="eyebrow">Where You Rest</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          Rooms Crafted for <em className="text-saffron not-italic">Mountain Dreams</em>
        </h2>
        <div className="divider mt-4" />
        <p className="font-hind text-text-muted max-w-lg leading-relaxed mt-4">
          Each room is a sanctuary — thoughtfully designed with Kumaoni warmth, modern comforts, and views that restore the spirit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border border-stone-light group hover:border-saffron transition-colors duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <div className="aspect-video overflow-hidden">
    <Image
      src={room.image}
      alt={room.name}
      width={640}
      height={360}
      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  
              {room.badge && (
                <span className={`absolute top-4 right-4 ${room.badgeColor} text-white text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1`}>
                  {room.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-7">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-playfair text-xl text-charcoal">{room.name}</h3>
                <div className="text-right">
                  <div className="text-right">
                    <span className="font-hind text-[10px] text-text-muted uppercase tracking-wide block">Single: <strong className="text-charcoal">{room.price}</strong></span>
                    <span className="font-hind text-[10px] text-text-muted uppercase tracking-wide block">Double: <strong className="text-saffron">{room.priceDbl}</strong></span>
                    <span className="font-hind text-[9px] text-text-muted block mt-0.5">+ taxes · Extra person: ₹1,500</span>
                  </div>
                </div>
              </div>

              <p className="font-hind text-[11px] text-stone-dark uppercase tracking-wider mb-3">
                Up to {room.occupancy}
              </p>
              <p className="font-hind text-sm text-text-muted leading-relaxed mb-4">
                {room.desc}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-6">
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 font-hind text-[11px] text-charcoal-mid border border-stone-light bg-ivory px-2.5 py-1"
                  >
                    {amenityIcons[a] ?? null}
                    {a}
                  </span>
                ))}
              </div>

              <Link
                href={`/rooms/${room.id}`}
                className="inline-flex items-center gap-2 btn-primary text-sm"
              >
                Book This Room
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/rooms" className="btn-secondary">
          View All Rooms & Rates
        </Link>
      </div>
      {/* OTA Booking Links */}
<div className="mt-12 border border-stone-light bg-white p-6">
  <p className="font-hind text-[11px] uppercase tracking-widest text-text-muted text-center mb-5">
    Also Available On
  </p>
  <div className="flex flex-wrap items-center justify-center gap-4">
    {[
      { name: "MakeMyTrip", color: "bg-[#E8F5E9] text-[#1a7a4a] border-[#1a7a4a]/20", href: "#" },
      { name: "Goibibo", color: "bg-[#FFF3E0] text-[#e65c00] border-[#e65c00]/20", href: "#" },
      { name: "Booking.com", color: "bg-[#E3F2FD] text-[#003580] border-[#003580]/20", href: "#" },
    ].map((ota) => (
      <a
        key={ota.name}
        href={ota.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 border px-6 py-3 font-hind font-semibold text-sm tracking-wide hover:opacity-80 transition-opacity ${ota.color}`}
      >
        {ota.name}
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    ))}
  </div>
  <p className="font-hind text-[11px] text-text-muted text-center mt-4">
    For best rates, book directly with us.
  </p>
</div>
    </SectionWrapper>
  );
}
