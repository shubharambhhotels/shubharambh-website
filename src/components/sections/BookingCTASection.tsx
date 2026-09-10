"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function BookingCTASection() {
  const router = useRouter();
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    guests: "2",
    room: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <section id="book" className="bg-saffron py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <span
            className="font-hind text-[11px] tracking-[0.28em] uppercase text-white/60 block mb-3"
          >
            Reserve Your Stay
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-white font-bold">
            Begin Your Himalayan Journey
          </h2>
          <p className="font-hind text-white/70 mt-3 text-base max-w-md mx-auto leading-relaxed">
            Check availability and secure your stay in the heart of Pithoragarh.
          </p>
        </div>

        {/* Booking bar */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row max-w-4xl mx-auto bg-white border border-stone-light"
        >
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-stone-light">
            <label className="block font-hind text-[10px] font-semibold tracking-[0.15em] uppercase text-saffron px-4 pt-3 pb-1">
              Check In
            </label>
            <input
              type="date"
               min={new Date().toISOString().split("T")[0]}
              value={form.checkin}
              onChange={(e) => setForm({ ...form, checkin: e.target.value })}
              className="block w-full border-none outline-none px-4 pb-3 text-sm text-charcoal bg-transparent"
            />
          </div>
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-stone-light">
            <label className="block font-hind text-[10px] font-semibold tracking-[0.15em] uppercase text-saffron px-4 pt-3 pb-1">
              Check Out
            </label>
            <input
              type="date"
              min={form.checkin || new Date().toISOString().split("T")[0]}
              value={form.checkout}
              onChange={(e) => setForm({ ...form, checkout: e.target.value })}
              className="block w-full border-none outline-none px-4 pb-3 text-sm text-charcoal bg-transparent"
            />
          </div>
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-stone-light">
            <label className="block font-hind text-[10px] font-semibold tracking-[0.15em] uppercase text-saffron px-4 pt-3 pb-1">
              Guests
            </label>
            <select
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              className="block w-full border-none outline-none px-4 pb-3 text-sm text-charcoal bg-transparent"
            >
              {["1", "2", "3", "4", "5+"].map((g) => (
                <option key={g} value={g}>
                  {g} Guest{g !== "1" ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-stone-light">
            <label className="block font-hind text-[10px] font-semibold tracking-[0.15em] uppercase text-saffron px-4 pt-3 pb-1">
              Room Type
            </label>
            <select
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              className="block w-full border-none outline-none px-4 pb-3 text-sm text-charcoal bg-transparent"
            >
              <option value="">Any Room</option>
              <option>Deluxe Room</option>
              <option>Super Deluxe Room</option>
              <option>Executive Room</option>
              <option>Family Suite</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-forest text-white px-8 py-4 font-hind font-semibold text-[12px] tracking-[0.14em] uppercase hover:bg-forest-light transition-colors flex items-center gap-2 justify-center"
          >
            <Search size={15} />
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}
