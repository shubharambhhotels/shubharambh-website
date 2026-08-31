import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { Wifi, Droplets, Tv, Eye, UtensilsCrossed, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Rooms & Stay",
  description:
    "Luxury rooms and suites at Shubharambh Hotel Pithoragarh. Mountain view deluxe, Himalayan suite, family rooms. Book direct for best rates.",
};

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: "₹3,000",
    priceDbl: "₹4,000",
    size: "Single / Double Occupancy",
    occupancy: "1–2 Persons",
    badge: "Most Popular",
    badgeColor: "bg-saffron",
    desc: "Spacious room with a private balcony overlooking the Himalayan ridgeline. King bed, en-suite bathroom with hot water, flat-screen TV, and complimentary WiFi.",
    amenities: ["Mountain View", "King Bed", "Free WiFi", "Hot Water", "Room Service", "Smart TV"],
    image: "/images/rooms/deluxe.jpg",
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room",
    price: "₹3,500",
    priceDbl: "₹4,500",
    size: "Single / Double Occupancy",
    occupancy: "1–2 Persons",
    badge: "",
    badgeColor: "",
    desc: "Contemporary room with garden and valley views, premium cotton linens, a writing desk, and all modern amenities for a comfortable stay.",
    amenities: ["Garden View", "Queen Bed", "Smart TV", "Free WiFi", "Hot Water"],
    image: "/images/rooms/super-deluxe.jpg",
  },
  {
    id: "executive",
    name: "Executive Room",
    price: "₹4,000",
    priceDbl: "₹5,000",
    size: "Single / Double Occupancy",
    occupancy: "1–2 Persons",
    badge: "Luxury",
    badgeColor: "bg-forest",
    desc: "Premium room with AC, private balcony, and panoramic snow-peak views. Features a separate living area, Smart TV, and safe/locker.",
    amenities: ["Panoramic View", "Private Balcony", "AC", "Smart TV", "Safe/Locker"],
    image: "/images/rooms/executive.jpg",
  },
  {
    id: "family-suite",
    name: "Family Suite",
    price: "₹7,500",
    priceDbl: "₹7,500",
    size: "Double Occupancy only",
    occupancy: "2–4 Persons",
    badge: "Best for Families",
    badgeColor: "bg-gold",
    desc: "Spacious suite with living area, AC, private balcony, and mountain-facing windows. Ideal for families visiting Pithoragarh.",
    amenities: ["Living Area", "AC", "Balcony", "Smart TV", "Safe/Locker", "Hot Water"],
    image: "/images/rooms/family-suite.jpg",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi size={13} />,
  "Hot Water": <Droplets size={13} />,
  "Smart TV": <Tv size={13} />,
  "Minibar": <UtensilsCrossed size={13} />,
  "Mountain View": <Eye size={13} />,
  "Panoramic View": <Eye size={13} />,
  "Garden View": <Eye size={13} />,
};

export default function RoomsPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Where You Rest</span>
          <h1 className="font-playfair text-5xl text-white mt-2">
            Rooms & Stay
          </h1>
          <div className="w-10 h-0.5 bg-gold mt-4" />
          <p className="font-hind text-white/50 mt-4 max-w-lg leading-relaxed">
            Each room is a sanctuary — thoughtfully designed with Kumaoni warmth, modern comforts, and views that restore the spirit.
          </p>
        </div>
      </div>

      <SectionWrapper bgColor="bg-stone-light">
        <div className="flex flex-col gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-stone-light grid grid-cols-1 lg:grid-cols-5 group"
            >
              {/* Image — 2 cols */}
              <div className="lg:col-span-2 overflow-hidden">
                <ImagePlaceholder
                  label={room.name}
                  aspectRatio="aspect-video lg:aspect-auto lg:h-full"
                  className="group-hover:scale-105 transition-transform duration-500 h-full"
                />
                {/*
                  Replace with:
                  <Image src={room.image} alt={room.name} width={560} height={400} className="object-cover w-full h-full" />
                */}
              </div>

              {/* Details — 3 cols */}
              <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-playfair text-2xl text-charcoal">{room.name}</h2>
                    {room.badge && (
                      <span className={`${room.badgeColor} text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 ml-3`}>
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="font-hind text-[11px] text-text-muted uppercase tracking-wide">
                      {room.size}
                    </span>
                    <span className="font-hind text-[11px] text-text-muted uppercase tracking-wide">
                      {room.occupancy}
                    </span>
                  </div>
                  <p className="font-hind text-sm text-text-muted leading-relaxed mb-5">
                    {room.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1.5 font-hind text-[11px] text-charcoal-mid border border-stone-light bg-ivory px-2.5 py-1"
                      >
                        {iconMap[a] ?? null}
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-stone-light pt-5">
                  <div>
  <div className="flex gap-4 mb-1">
    <div>
      <span className="font-hind text-[10px] text-text-muted uppercase tracking-wide block">Single</span>
      <span className="font-playfair text-xl text-charcoal font-semibold">{room.price}</span>
    </div>
    <div className="border-l border-stone-light pl-4">
      <span className="font-hind text-[10px] text-text-muted uppercase tracking-wide block">Double</span>
      <span className="font-playfair text-xl text-saffron font-semibold">{room.priceDbl}</span>
    </div>
  </div>
  <span className="font-hind text-[10px] text-text-muted block">+ taxes · Extra person: ₹1,500/night</span>
</div>
                  <Link
                    href={`/book?room=${room.id}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    Book Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
