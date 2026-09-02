"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Image from "next/image";

const categories = ["All", "Rooms", "Banquet", "Weddings", "Himalayas", "Culture", "Food"] as const;
type Category = (typeof categories)[number];

const galleryItems: {
  id: string;
  label: string;
  category: Exclude<Category, "All">;
  span: "normal" | "wide" | "tall";
  image: string;
}[] = [
  { id: "g1", label: "View from Suite Balcony", category: "Himalayas", span: "wide", image: "/images/balcony-view.jpg" },
  { id: "g2", label: "Deluxe Room Interior", category: "Rooms", span: "normal", image: "/images/rooms/deluxe2.jpg" },
  { id: "g3", label: "Adi Kailash Peak", category: "Himalayas", span: "tall", image: "/images/adi-kailash.jpeg" },
  { id: "g4", label: "Wedding Mandap Setup", category: "Weddings", span: "normal", image: "/images/mandap2.jpg" },
  { id: "g5", label: "Banquet Hall — Full Capacity", category: "Banquet", span: "wide", image: "/images/banquet3.jpg" },
  { id: "g6", label: "Himalayan Suite Bathroom", category: "Rooms", span: "normal", image: "/images/rooms/shower.jpg" },
  { id: "g7", label: "Chholiya Dance Performance", category: "Culture", span: "normal", image: "/images/cholia.jpg" },
  { id: "g8", label: "Kumaoni Thali", category: "Food", span: "normal", image: "/images/thhali.jpg" },
  { id: "g9", label: "Panchachuli Peaks at Dusk", category: "Himalayas", span: "wide", image: "/images/panchachuli.jpeg" },
  { id: "g10", label: "Reception Floral Decor", category: "Weddings", span: "tall", image: "/images/banquet-hall.jpeg" },
  { id: "g11", label: "Family Room", category: "Rooms", span: "normal", image: "/images/rooms/family-suite1.jpg" },
  { id: "g12", label: "Bal Mithai & Local Sweets", category: "Food", span: "normal", image: "/images/bal-mithai.jpg" },
  { id: "g13", label: "Kumaoni Holi Celebration", category: "Culture", span: "normal", image: "/images/holi.jpg" },
  { id: "g14", label: "Banquet Stage Setup", category: "Banquet", span: "normal", image: "/images/banquet4.jpg" },
  { id: "g15", label: "Pithoragarh Valley View", category: "Himalayas", span: "normal", image: "/images/view.jpg" },
  { id: "g16", label: "Mahendi Decor", category: "Weddings", span: "normal", image: "/images/decor2.jpeg" },
  { id: "g17", label: "Hiljatra Festival Rituals", category: "Culture", span: "normal", image: "/images/hiljatra.jpg" },
  { id: "g18", label: "Jhora Dance Performance", category: "Culture", span: "normal", image: "/images/jhora.jpg" },
  { id: "g19", label: "Phooldei Ritual Celebration", category: "Culture", span: "normal", image: "/images/phooldei.jpg" },
  { id: "g20", label: "Banquet Hall — Decor", category: "Banquet", span: "wide", image: "/images/decor3.jpeg" },
  { id: "g21", label: "Banquet Hall — Mandap", category: "Weddings", span: "normal", image: "/images/mandap2.jpg" },
];

const spanClass: Record<string, string> = {
  normal: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
};

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <>
      {/* Page header */}
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Visual Journeys</span>
          <h1 className="font-playfair text-5xl text-white mt-2">Gallery</h1>
          <div className="w-10 h-0.5 bg-gold mt-4" />
          <p className="font-hind text-white/50 mt-4 max-w-lg leading-relaxed">
            Through the lens of Shubharambh — rooms, celebrations, culture, and the Himalayas.
          </p>
        </div>
      </div>

      <div className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`font-hind text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-2 border transition-colors duration-200 ${
                  active === c
                    ? "bg-saffron text-white border-saffron"
                    : "bg-white text-text-muted border-stone-light hover:border-saffron hover:text-saffron"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`relative overflow-hidden group cursor-pointer border border-stone-light ${spanClass[item.span]}`}
                onClick={() => setLightbox(item.id)}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-playfair text-sm text-white">{item.label}</p>
                    <p className="font-hind text-[10px] tracking-widest uppercase text-white/60 mt-0.5">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox — basic implementation */}
          {lightbox && (
            <div
              className="fixed inset-0 bg-charcoal/95 z-50 flex items-center justify-center p-8"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/60 hover:text-white"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                <ImagePlaceholder
                  label={galleryItems.find((i) => i.id === lightbox)?.label ?? ""}
                  aspectRatio="aspect-video"
                  className="w-full border border-white/10"
                />
                <p className="font-playfair text-white text-base mt-4 text-center">
                  {galleryItems.find((i) => i.id === lightbox)?.label}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
