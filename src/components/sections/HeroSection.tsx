"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [code, setCode] = useState("");

  const handleBookNow = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    if (code) params.set("code", code);

    router.push(`/book${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — Shubharambh Hotel Pithoragarh"
    >
      {/* Real hotel photo as background */}
      <Image
        src="/images/shubharambh.jpeg"
        alt="Shubharambh Hotel & Banquet Hall, Pithoragarh"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-charcoal/55" />

      {/* Saffron top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-saffron z-10" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-8">

        {/* Location pill */}
        <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
          <MapPin size={11} className="text-gold-light shrink-0" />
          <span className="font-hind text-[10px] tracking-[0.22em] uppercase text-white/80">
            Pithoragarh · Uttarakhand · Kumaon Himalayas
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair font-bold leading-[1.08] mb-4">
          <span className="block text-4xl md:text-5xl lg:text-[3.8rem] text-ivory">
            Where the Himalayas
          </span>
          <span className="block text-4xl md:text-5xl lg:text-[3.8rem] text-gold-light ">
            Welcome Your Soul
          </span>
        </h1>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold" />
          <div className="w-1 h-1 rotate-45 bg-gold" />
          <div className="h-px w-12 bg-gold" />
        </div>

        {/* Subtitle */}
        <p className="font-hind text-white font-semibold text-base leading-relaxed mb-2 max-w-lg mx-auto">
          A sanctuary of luxury, spirituality, and adventure at the gateway to
          Adi Kailash and Kailash Mansarovar.
        </p>

        {/* Hindi tagline */}
        <p className="font-hind text-white/80 text-base mb-7 tracking-wide font-semibold">
          शुभारम्भ — एक दिव्य यात्रा का प्रारम्भ
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link href="/book" className="btn-primary px-8 py-3 text-[12px]">
            Book Your Stay
          </Link>
          <Link
            href="/experiences"
            className="bg-transparent text-white border border-white/50 px-8 py-3 font-hind text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white/10 transition-colors"
          >
            Explore Kailash Routes
          </Link>
        </div>

        {/* Booking strip */}
        <div className="flex flex-col sm:flex-row items-stretch border border-white/20 bg-white max-w-3xl mx-auto shadow-lg">
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-stone-light px-5 py-3">
            <label className="block font-hind text-[9px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-1">
              Check In
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full font-hind text-sm text-charcoal bg-transparent outline-none"
            />
          </div>
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-stone-light px-5 py-3">
            <label className="block font-hind text-[9px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-1">
              Check Out
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full font-hind text-sm text-charcoal bg-transparent outline-none"
            />
          </div>
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-stone-light px-5 py-3">
            <label className="block font-hind text-[9px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full font-hind text-sm text-charcoal bg-transparent outline-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5+">5+ Guests</option>
            </select>
          </div>
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-stone-light px-5 py-3">
            <label className="block font-hind text-[9px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-1">
              Special Code
            </label>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full font-hind text-sm text-charcoal bg-transparent outline-none placeholder-stone"
            />
          </div>
          <button
            type="button"
            onClick={handleBookNow}
            className="bg-gold hover:bg-gold-light transition-colors text-white font-hind font-bold text-[12px] tracking-[0.15em] uppercase px-8 py-3 shrink-0"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="font-hind text-[9px] tracking-[0.25em] uppercase text-white/40">
          Scroll
        </span>
        <div className="w-px h-6 bg-white/30 animate-pulse" />
        <ArrowDown size={11} className="text-white/40" />
      </div>
    </section>
  );
}
