"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const steps = ["Select Dates", "Choose Room", "Guest Details", "Payment"] as const;
type Step = 0 | 1 | 2 | 3;

export default function BookPage() {
  const [step, setStep] = useState<Step>(0);
  const [booking, setBooking] = useState({
    checkin: "",
    checkout: "",
    guests: "2",
    room: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const rooms = [
    { id: "mountain-view-deluxe", name: "Nagarkoti Deluxe", price: 3500 },
    { id: "himalayan-suite", name: "Mountain View Suite", price: 6500 },
    { id: "family-room", name: "Nagarkoti Executive Room", price: 4800 },
    { id: "super-deluxe", name: " Super Deluxe Room", price: 4200 },
  ];

  const selectedRoom = rooms.find((r) => r.id === booking.room);

  const handleRazorpay = async () => {
    // TODO: Call /api/bookings/create to create order
    // Then load Razorpay checkout SDK
    // const res = await fetch("/api/bookings/create", { method: "POST", body: JSON.stringify(booking) });
    // const order = await res.json();
    // const options = {
    //   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    //   amount: order.amount,
    //   currency: "INR",
    //   name: "Shubharambh Hotel",
    //   description: `Booking — ${selectedRoom?.name}`,
    //   order_id: order.id,
    //   handler: function (response) {
    //     // Verify on server, then redirect to /book/confirmation?id=...
    //   },
    // };
    // const rzp = new (window as any).Razorpay(options);
    // rzp.open();
    alert("Razorpay integration: replace this stub with the SDK call above.");
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-charcoal pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <span className="eyebrow text-gold-light/70">Reservation</span>
          <h1 className="font-playfair text-4xl text-white mt-1">Book Your Stay</h1>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-stone-light">
        <div className="max-w-3xl mx-auto px-6 py-5 flex gap-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                    i < step
                      ? "bg-forest text-white"
                      : i === step
                      ? "bg-saffron text-white"
                      : "bg-stone-light text-text-muted"
                  }`}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span
                  className={`font-hind text-[11px] uppercase tracking-wide hidden sm:block ${
                    i === step ? "text-saffron font-semibold" : "text-text-muted"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? "bg-forest" : "bg-stone-light"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Step 0 — Dates */}
        {step === 0 && (
          <div className="bg-white border border-stone-light p-8">
            <h2 className="font-playfair text-2xl text-charcoal mb-6">Select Your Dates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Check In</label>
                <input type="date" value={booking.checkin} onChange={(e) => setBooking({ ...booking, checkin: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
              </div>
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Check Out</label>
                <input type="date" value={booking.checkout} onChange={(e) => setBooking({ ...booking, checkout: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Number of Guests</label>
              <select value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors">
                {["1", "2", "3", "4", "5+"].map((g) => <option key={g}>{g} Guest{g !== "1" ? "s" : ""}</option>)}
              </select>
            </div>
            <button onClick={() => setStep(1)} className="btn-primary w-full text-center" disabled={!booking.checkin || !booking.checkout}>
              Continue to Room Selection
            </button>
          </div>
        )}

        {/* Step 1 — Room */}
        {step === 1 && (
          <div>
            <h2 className="font-playfair text-2xl text-charcoal mb-6">Choose Your Room</h2>
            <div className="flex flex-col gap-4 mb-6">
              {rooms.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setBooking({ ...booking, room: r.id })}
                  className={`bg-white border-2 p-5 cursor-pointer transition-colors ${
                    booking.room === r.id ? "border-saffron" : "border-stone-light hover:border-stone"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${booking.room === r.id ? "border-saffron bg-saffron" : "border-stone"}`}>
                        {booking.room === r.id && <Check size={11} className="text-white" />}
                      </div>
                      <span className="font-playfair text-lg text-charcoal">{r.name}</span>
                    </div>
                    <span className="font-playfair text-xl text-saffron font-semibold">₹{r.price.toLocaleString()}<span className="font-hind text-sm text-text-muted font-normal">/night</span></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => setStep(2)} className="btn-primary flex-1" disabled={!booking.room}>Continue</button>
            </div>
          </div>
        )}

        {/* Step 2 — Guest Details */}
        {step === 2 && (
          <div className="bg-white border border-stone-light p-8">
            <h2 className="font-playfair text-2xl text-charcoal mb-6">Guest Details</h2>
            <div className="flex flex-col gap-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Full Name *</label>
                  <input type="text" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm outline-none focus:border-saffron transition-colors" />
                </div>
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Phone *</label>
                  <input type="tel" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm outline-none focus:border-saffron transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Email *</label>
                <input type="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm outline-none focus:border-saffron transition-colors" />
              </div>
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Special Requests</label>
                <textarea rows={3} value={booking.specialRequests} onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm outline-none focus:border-saffron transition-colors resize-y" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1" disabled={!booking.name || !booking.email || !booking.phone}>Continue to Payment</button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div className="bg-white border border-stone-light p-8">
            <h2 className="font-playfair text-2xl text-charcoal mb-6">Review & Pay</h2>
            <div className="border border-stone-light bg-ivory p-5 mb-6 flex flex-col gap-2">
              <div className="flex justify-between"><span className="font-hind text-sm text-text-muted">Room</span><span className="font-hind text-sm font-semibold text-charcoal">{selectedRoom?.name}</span></div>
              <div className="flex justify-between"><span className="font-hind text-sm text-text-muted">Check-in</span><span className="font-hind text-sm text-charcoal">{booking.checkin}</span></div>
              <div className="flex justify-between"><span className="font-hind text-sm text-text-muted">Check-out</span><span className="font-hind text-sm text-charcoal">{booking.checkout}</span></div>
              <div className="flex justify-between"><span className="font-hind text-sm text-text-muted">Guests</span><span className="font-hind text-sm text-charcoal">{booking.guests}</span></div>
              <div className="border-t border-stone-light my-1" />
              <div className="flex justify-between items-end"><span className="font-hind text-sm font-semibold text-charcoal">Total (per night)</span><span className="font-playfair text-2xl text-saffron font-semibold">₹{selectedRoom?.price.toLocaleString()}</span></div>
            </div>
            <p className="font-hind text-xs text-text-muted mb-6 leading-relaxed">
              Secure payment via Razorpay. Supports UPI, Cards, Net Banking, and Wallets. A confirmation email will be sent to {booking.email}.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
              <button onClick={handleRazorpay} className="btn-primary flex-1">Pay with Razorpay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
