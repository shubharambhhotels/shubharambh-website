"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Play, X } from "lucide-react";

const testimonials = [
  {
    name: "Guest from Raipur",
    origin: "Raipur, Chhattisgarh",
    type: "Hotel Stay",
    initials: "GR",
    quote: "Wonderful stay and hospitality at Shubharambh Hotel. Truly a memorable experience.",
    youtubeId: "QVwPBAeTmPk",
    thumbnail: "https://img.youtube.com/vi/QVwPBAeTmPk/hqdefault.jpg",
  },
  {
    name: "Seema Jain",
    origin: "Delhi, India",
    type: "Hotel Stay",
    initials: "SJ",
    quote: "A wonderful experience at Shubharambh Hotel. The hospitality was exceptional and the stay was truly enjoyable.",
    youtubeId: "sx5GstH0xco",
    thumbnail: "https://img.youtube.com/vi/sx5GstH0xco/hqdefault.jpg",
  },
  {
    name: "Valued Guest",
    origin: "India",
    type: "Hotel Stay",
    initials: "VG",
    quote: "Enjoyed my stay at Shubharambh Hotel a lot. Highly satisfied with the overall experience.",
    youtubeId: "Ochiy17Pkj8",
    thumbnail: "https://img.youtube.com/vi/Ochiy17Pkj8/hqdefault.jpg",
  },
  {
    name: "Deepali",
    origin: "India",
    type: "Hotel Stay",
    initials: "D",
    quote: "Had a wonderful experience at Shubharambh Hotel. Highly recommend this stay to all travellers.",
    youtubeId: "LZvfSWjwQlU",
    thumbnail: "https://img.youtube.com/vi/LZvfSWjwQlU/hqdefault.jpg",
  },
  {
    name: "Jatin Patel",
    origin: "Surat, Gujarat",
    type: "Adventure",
    initials: "JP",
    quote: "Stayed here during my biking trip to Adi Kailash and Om Parvat. The perfect base for an adventurous Himalayan journey.",
    youtubeId: "LbAcVB9gqeU",
    thumbnail: "https://img.youtube.com/vi/LbAcVB9gqeU/hqdefault.jpg",
  },
];

const StarRating = () => (
  <div className="flex gap-0.5 mb-3" aria-label="5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 16 16" width="13" height="13" fill="var(--gold)" aria-hidden="true">
        <path d="M8 1.5l1.7 3.5 3.8.55-2.75 2.68.65 3.77L8 10.2l-3.4 1.8.65-3.77L2.5 5.55 6.3 5 8 1.5z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <SectionWrapper id="testimonials" bgColor="bg-ivory">
      <div className="text-center mb-14">
        <span className="eyebrow">Guest Stories</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          Voices from the <em className="text-saffron not-italic">Mountains</em>
        </h2>
        <div className="divider divider-center mt-4" />
        <p className="font-hind text-text-muted mt-4">
          Real experiences, shared by our guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border-t-2 border-saffron group"
          >
            {/* Video thumbnail */}
            <div
              className="relative aspect-video overflow-hidden cursor-pointer"
              onClick={() => setActiveVideo(t.youtubeId)}
            >
              <img
                src={t.thumbnail}
                alt={`${t.name} review`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center group-hover:bg-charcoal/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-saffron flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={22} className="text-white ml-1" fill="white" />
                </div>
              </div>
              {/* Type badge */}
              <span className="absolute top-3 left-3 font-hind text-[10px] font-semibold tracking-widest uppercase bg-white text-saffron px-2.5 py-1">
                {t.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <StarRating />
              <blockquote className="font-playfair text-[0.95rem] text-charcoal italic leading-[1.75] mb-5">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-saffron-pale border border-saffron/20 flex items-center justify-center shrink-0">
                  <span className="font-playfair text-sm text-saffron font-bold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-hind text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="font-hind text-[11px] text-text-muted">
                    {t.origin} &middot; {t.type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-3xl aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&shorts=1`}
              title="Guest Review"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}