"use client";

import { useState } from "react";
import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Link from "next/link";
import Image from "next/image";
import { Wifi, Droplets, Tv, Eye, ArrowRight, Wind, Shield } from "lucide-react";

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
    desc: "Spacious room  overlooking the Himalayan ridgeline. King bed, en-suite bathroom with hot water, flat-screen TV, and complimentary WiFi.",
    amenities: ["Mountain View", "King Bed", "Free WiFi", "Hot Water", "Room Service", "Smart TV"],
    images: [
      "/images/rooms/deluxe1.jpg",
      "/images/rooms/deluxe2.jpg",
      "/images/rooms/amenities.jpg",
    ],
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
    images: [
      "/images/rooms/super-deluxe1.jpg",
      "/images/rooms/super-deluxe2.jpg",
      "/images/rooms/amenities.jpg",
      "/images/rooms/amenities2.jpg",
      "/images/rooms/balcony-view.jpg",
    ],
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
    images: [
      "/images/rooms/executive2.jpg",
      "/images/rooms/executive1.jpg",
      "/images/rooms/shower.jpg",
      "/images/rooms/amenities.jpg",
      "/images/rooms/amenities2.jpg",
      "/images/rooms/balcony-view.jpg",
    ],
  },
  {
    id: "family-suite",
    name: "Family Suite",
    price: "₹7,500",
    priceDbl: "₹7,500",
    size: "Double Occupancy only",
    occupancy: "4 Persons",
    badge: "Best for Families",
    badgeColor: "bg-gold",
    desc: "Spacious suite with living area, AC, private balcony, and mountain-facing windows. Ideal for families visiting Pithoragarh.",
    amenities: ["Living Area", "AC", "Balcony", "Smart TV", "Safe/Locker", "Hot Water"],
    images: [
      "/images/rooms/family-suite1.jpg",
      "/images/rooms/family-suite2.jpg",
      "/images/rooms/family-suite3.jpg",
      "/images/rooms/amenities.jpg",
      "/images/rooms/amenities2.jpg",
      "/images/rooms/balcony-view.jpg",
    ],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi size={13} />,
  "Hot Water": <Droplets size={13} />,
  "Smart TV": <Tv size={13} />,
  "Mountain View": <Eye size={13} />,
  "Panoramic View": <Eye size={13} />,
  "Garden View": <Eye size={13} />,
  "AC": <Wind size={13} />,
  "Safe/Locker": <Shield size={13} />,
};

function RoomGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col h-full">
      {/* Main image */}
      <div className="relative overflow-hidden flex-1 min-h-[260px]">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-all duration-500"
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1 p-1 bg-stone-light">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 overflow-hidden border-2 transition-colors ${
                active === i ? "border-saffron" : "border-transparent"
              }`}
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={img}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
              {/* Image gallery — 2 cols */}
              <div className="lg:col-span-2 overflow-hidden">
                <RoomGallery images={room.images} name={room.name} />
              </div>

              {/* Details — 3 cols */}
              <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-playfair text-2xl text-charcoal">{room.name}</h2>
                    {room.badge && (
                      <span className={`${room.badgeColor} text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 ml-3 shrink-0`}>
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

        {/* OTA Booking Links */}
        <div className="mt-12 border border-stone-light bg-white p-6">
          <p className="font-hind text-[11px] uppercase tracking-widest text-text-muted text-center mb-5">
            Also Available On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: "MakeMyTrip", color: "bg-[#E8F5E9] text-[#1a7a4a] border-[#1a7a4a]/20", href: "https://www.makemytrip.com/hotels/hotel-details/?hotelId=202601011826573569" },
              { name: "Goibibo", color: "bg-[#FFF3E0] text-[#e65c00] border-[#e65c00]/20", href: "https://www.goibibo.com/hotels/hotel-details/?checkin=20260911&checkout=20260912&roomString=1-2-0&searchText=Nagarkoti%20Residency%20Inn&locusId=CTPGH&locusType=city&cityCode=CTPGH&cc=IN&_uCurrency=INR&vcid=6068171037273245672&giHotelId=4297801558748841121&mmtId=202601011826573569#location" },
              { name: "Booking.com", color: "bg-[#E3F2FD] text-[#003580] border-[#003580]/20", href: "https://www.booking.com/hotel/in/nagarkoti-residency-inn" },
              { name: "Agoda", color: "bg-[#F3E5F5] text-[#6A1B9A] border-[#6A1B9A]/20", href: "https://www.agoda.com/en-gb/nagarkoti-residency-inn/hotel/pithoragarh-in.html" },
              { name: "TripAdvisor", color: "bg-[#E0F7FA] text-[#00796B] border-[#00796B]/20", href: "https://www.tripadvisor.in/Hotel_Review-g1209426-d34475846-Reviews-Nagarkoti_Residency_Inn-Pithoragarh_Pithoragarh_District_Uttarakhand" },
            ].map((ota) => (
              <Link
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
              </Link>
            ))}
          </div>
          <p className="font-hind text-[11px] text-text-muted text-center mt-4">
            For best rates, book directly with us.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}