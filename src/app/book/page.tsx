"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Script from "next/script";

const steps = ["Select Dates", "Choose Room", "Guest Details", "Payment"] as const;
type Step = 0 | 1 | 2 | 3;

export default function BookPage() {
  const [step, setStep] = useState<Step>(0);
  const [booking, setBooking] = useState({
    checkin: "",
    checkout: "",
    guests: "2 Guests",
    room: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ type: string; value: number; name: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  const rooms = [
    { id: "deluxe", name: "Deluxe Room", price: 4000 },
    { id: "super-deluxe", name: "Super Deluxe Room", price: 4500 },
    { id: "executive", name: "Executive Room", price: 5000 },
    { id: "family-suite", name: "Family Suite", price: 7500 },
  ];

  const selectedRoom = rooms.find((r) => r.id === booking.room);

  // Bill calculation
  const calcBill = () => {
    if (!selectedRoom || !booking.checkin || !booking.checkout) return null;
    const checkinDate = new Date(booking.checkin);
    const checkoutDate = new Date(booking.checkout);
    const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = selectedRoom.price;
    const numGuests = parseInt(booking.guests);
    const extraPersons = numGuests > 2 ? numGuests - 2 : 0;
    const extraPersonCharge = extraPersons * 1500;
    const subtotal = pricePerNight * nights + extraPersonCharge;
    const discountAmount = appliedDiscount
      ? appliedDiscount.type === "Percentage"
        ? Math.round(subtotal * appliedDiscount.value / 100)
        : appliedDiscount.value
      : 0;
    const afterDiscount = subtotal - discountAmount;
    const gstRate = pricePerNight >= 7500 ? 0.18 : 0.12;
    const gstAmount = Math.round(afterDiscount * gstRate);
    const total = afterDiscount + gstAmount;
    return { nights, pricePerNight, extraPersons, extraPersonCharge, subtotal, discountAmount, afterDiscount, gstRate, gstAmount, total };
  };

  const bill = calcBill();

  const handleCheckAvailabilityAndPay = async () => {
    setChecking(true);
    setAvailabilityError("");

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: booking.room,
          checkin: booking.checkin,
          checkout: booking.checkout,
          guests: booking.guests,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          specialRequests: booking.specialRequests,
          discountCode: discountCode || "", 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAvailabilityError(data.error ?? "Something went wrong.");
        setChecking(false);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.totalAmount,
        currency: "INR",
        name: "Shubharambh Hotel & Banquet Hall",
        description: `${selectedRoom?.name} · ${bill?.nights} night${bill?.nights !== 1 ? "s" : ""}`,
        order_id: data.orderId,
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone,
        },
        theme: { color: "#A44A1E" },
        handler: async function (response: any) {
          // Verify payment
          const verifyRes = await fetch("/api/bookings/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          console.log("Verify response:", verifyData);

          if (verifyRes.ok && verifyData.success) {
            window.location.href = `/book/confirmation?ref=${verifyData.bookingRef}&room=${encodeURIComponent(selectedRoom?.name ?? "")}&checkin=${booking.checkin}&checkout=${booking.checkout}&nights=${bill?.nights}&amount=${bill?.total}`;
          } else {
            setAvailabilityError("Payment verification failed. Please contact us.");
          }
        },
        modal: {
          ondismiss: () => {
            setChecking(false);
            setAvailabilityError("Payment was cancelled. Please try again.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setChecking(false);

    } catch (err) {
      setAvailabilityError("Network error. Please try again.");
      setChecking(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-ivory">
        {/* Header */}
        <div className="bg-saffron pt-28 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <span className="eyebrow font-bold" style={{ color: "#fff" }}>Reservation</span>
            <h1 className="font-playfair text-4xl text-white mt-1">Book Your Stay</h1>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white border-b border-stone-light">
          <div className="max-w-3xl mx-auto px-6 py-5 flex gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${i < step ? "bg-forest text-white" : i === step ? "bg-saffron text-white" : "bg-stone-light text-text-muted"}`}>
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span className={`font-hind text-[11px] uppercase tracking-wide hidden sm:block ${i === step ? "text-saffron font-semibold" : "text-text-muted"}`}>
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
                  <input type="date" min={new Date().toISOString().split("T")[0]} value={booking.checkin} onChange={(e) => setBooking({ ...booking, checkin: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
                </div>
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Check Out</label>
                  <input type="date" min={booking.checkin || new Date().toISOString().split("T")[0]} value={booking.checkout} onChange={(e) => setBooking({ ...booking, checkout: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Number of Guests</label>
                <select value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors">
                  {["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests"].map((g) => <option key={g}>{g}</option>)}
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
                  <div key={r.id} onClick={() => setBooking({ ...booking, room: r.id })} className={`bg-white border-2 p-5 cursor-pointer transition-colors ${booking.room === r.id ? "border-saffron" : "border-stone-light hover:border-stone"}`}>
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
          {step === 3 && bill && (
            <div className="bg-white border border-stone-light p-8">
              <h2 className="font-playfair text-2xl text-charcoal mb-6">Review & Pay</h2>

              {/* Bill summary */}
              <div className="border border-stone-light bg-ivory p-5 mb-5 flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">Room</span>
                  <span className="font-hind text-sm font-semibold text-charcoal">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">Check-in</span>
                  <span className="font-hind text-sm text-charcoal">{booking.checkin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">Check-out</span>
                  <span className="font-hind text-sm text-charcoal">{booking.checkout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">Guests</span>
                  <span className="font-hind text-sm text-charcoal">{booking.guests}</span>
                </div>
                <div className="border-t border-stone-light my-1" />
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">
                    Room charges (₹{bill.pricePerNight.toLocaleString()} × {bill.nights} night{bill.nights !== 1 ? "s" : ""})
                  </span>
                  <span className="font-hind text-sm text-charcoal">₹{(bill.pricePerNight * bill.nights).toLocaleString()}</span>
                </div>
                {bill.extraPersons > 0 && (
                  <div className="flex justify-between">
                    <span className="font-hind text-sm text-text-muted">Extra person ({bill.extraPersons} × ₹1,500)</span>
                    <span className="font-hind text-sm text-charcoal">₹{bill.extraPersonCharge.toLocaleString()}</span>
                  </div>
                )}
                {bill.discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-hind text-sm text-forest">Discount ({discountCode.toUpperCase()})</span>
                    <span className="font-hind text-sm text-forest">− ₹{bill.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-hind text-sm text-text-muted">GST ({bill.gstRate === 0.18 ? "18%" : "12%"})</span>
                  <span className="font-hind text-sm text-charcoal">₹{bill.gstAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-stone-light my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-hind text-sm font-bold text-charcoal">Total Payable</span>
                  <span className="font-playfair text-2xl text-saffron font-semibold">₹{bill.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Discount code */}
              <div className="mb-5">
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                  Promo / Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => { setDiscountCode(e.target.value); setDiscountMsg(""); }}
                    placeholder="Enter code"
                    className="flex-1 border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors uppercase"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!discountCode) return;
                      try {
                        const res = await fetch("/api/discounts/validate", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ code: discountCode }),
                        });
                        const data = await res.json();
                        if (!res.ok) {
                          setDiscountMsg("Invalid or expired code.");
                          setAppliedDiscount(null);
                        } else {
                          setDiscountMsg(`"${data.name}" applied — ${data.type === "Percentage" ? data.value + "% off" : "₹" + data.value + " off"}`);
                          setAppliedDiscount(data);
                        }
                      } catch {
                        setDiscountMsg("Could not validate code. Try again.");
                      }
                    }}
                    className="btn-secondary px-5 py-2.5 text-sm"
                  >
                    Apply
                  </button>
                </div>
                {discountMsg && (
                  <p className={`font-hind text-xs mt-1.5 ${discountMsg.includes("Invalid") || discountMsg.includes("Could not") ? "text-red-500" : "text-forest"}`}>
                    {discountMsg}
                  </p>
                )}
              </div>

              <p className="font-hind text-xs text-text-muted mb-5 leading-relaxed">
                All prices include GST. Payment secured by Razorpay — supports UPI, Cards, Net Banking, and Wallets.
              </p>

              {availabilityError && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 mb-4">
                  <p className="font-hind text-sm text-red-600">{availabilityError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                <button
                  onClick={handleCheckAvailabilityAndPay}
                  disabled={checking}
                  className="btn-primary flex-1 disabled:opacity-60"
                >
                  {checking ? "Processing..." : `Pay ₹${bill.total.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}