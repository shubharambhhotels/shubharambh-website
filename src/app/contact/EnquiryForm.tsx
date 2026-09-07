"use client";

import { useState } from "react";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    purpose: "Hotel Stay", travelDate: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", purpose: "Hotel Stay", travelDate: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-stone-light p-8">
      <h3 className="font-playfair text-xl text-charcoal mb-6">Send an Enquiry</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Full Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
          </div>
          <div>
            <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Phone *</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
          </div>
        </div>
        <div>
          <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Purpose</label>
            <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors">
              <option>Hotel Stay</option>
              <option>Spiritual Tour</option>
              <option>Wedding / Event</option>
              <option>Adventure Trek</option>
              <option>Corporate Event</option>
            </select>
          </div>
          <div>
            <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Travel Date</label>
            <input type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors" />
          </div>
        </div>
        <div>
          <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">Message *</label>
          <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors resize-y" />
        </div>

        {status === "sent" && (
          <p className="font-hind text-sm text-forest bg-forest/10 px-3 py-2">
            Thank you! We will get back to you within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="font-hind text-sm text-red-600 bg-red-50 px-3 py-2">
            Please fill in all required fields and try again.
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className="btn-primary w-full text-center mt-2 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </div>
  );
}