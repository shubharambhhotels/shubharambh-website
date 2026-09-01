import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shubharambh Hotel & Banquet Hall in Pithoragarh. Phone, email, WhatsApp, address, and Google Maps. 500 m from Naini-Saini Airport.",
};

const contactInfo = [
  {
    icon: <MapPin size={18} />,
    label: "Address",
    value: "500 m from Naini-Saini Airport, Airport Line, Village – Makholigaon,Pithoragarh, Uttarakhand – 262501",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "9897580016",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "shubharambh.banquet2026@gmail.com",
  },
  {
    icon: <Clock size={18} />,
    label: "Check-in / Check-out",
    value: "Check-in: 1:00 PM\nCheck-out: 11:00 AM",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Find Us</span>
          <h1 className="font-playfair text-5xl text-white mt-2">
            Come Home to the Mountains
          </h1>
        </div>
      </div>

      <SectionWrapper bgColor="bg-stone-light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-playfair text-2xl text-charcoal mb-8">
              Shubharambh Hotel & Banquet Hall
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-saffron flex items-center justify-center text-white shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-hind text-[11px] font-semibold uppercase tracking-widest text-charcoal mb-0.5">
                      {c.label}
                    </p>
                    <p className="font-hind text-sm text-text-muted leading-relaxed whitespace-pre-line">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/9897580016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3.5 w-full justify-center hover:bg-[#1da851] transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true">
                <path d="M17.47 14.89c-.29-.14-1.71-.84-1.97-.94-.27-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17 0-.37-.02-.56-.02s-.51.07-.78.37c-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.02c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.35A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 01-4.08-1.12l-.29-.18-3.01.8.82-2.96-.19-.31A8 8 0 1112 20z" />
              </svg>
              <span className="font-hind font-semibold text-sm tracking-wide">
                Chat on WhatsApp
              </span>
            </a>

            <div className="mt-8 border border-stone-light h-64 overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=29.589872885453975,80.23610118077387&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shubharambh Hotel & Banquet Hall — Pithoragarh"/>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="bg-white border border-stone-light p-8">
            <h3 className="font-playfair text-xl text-charcoal mb-6">Send an Enquiry</h3>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                    Purpose
                  </label>
                  <select className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors">
                    <option>Hotel Stay</option>
                    <option>Spiritual Tour</option>
                    <option>Wedding / Event</option>
                    <option>Adventure Trek</option>
                    <option>Corporate Event</option>
                  </select>
                </div>
                <div>
                  <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your plans, group size, or special requirements..."
                  className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors resize-y"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-center mt-2">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
