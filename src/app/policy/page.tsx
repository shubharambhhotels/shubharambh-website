import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Hotel Policies",
  description:
    "Hotel policies for Shubharambh Hotel & Banquet Hall, Pithoragarh — check-in, check-out, cancellation, guest conduct, and booking terms.",
};

const policies = [
  {
    title: "Check-in & Check-out",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    items: [
      "Standard Check-in: 1:00 PM onwards.",
      "Standard Check-out: Before 11:00 AM.",
      "Early check-in / late check-out: Subject to room availability and prior hotel approval. Additional charges apply.",
    ],
  },
  {
    title: "Guest Identification & Age Limits",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    items: [
      "Minimum age: Primary guests must be 18 years or older to check in independently.",
      "Minors must be accompanied by a parent or legal guardian at all times.",
      "A valid government-issued photo ID (Aadhaar, Passport, Driving License, or Voter ID) is mandatory for all guests at check-in.",
    ],
  },
  {
    title: "Reservations & Payments",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M7 15h2M15 15h2" />
      </svg>
    ),
    items: [
      "Accepted payment modes: UPI, Credit/Debit Cards, and Cash.",
      "Advance payment may be required to confirm bookings.",
      "Group bookings: Special terms apply for reservations of 5 or more rooms.",
      "Confirmed bookings cannot be transferred to another individual without management approval.",
    ],
  },
  {
    title: "Pet Policy",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5" />
      </svg>
    ),
    items: [
      "Pets are strictly not allowed on the property.",
    ],
  },
  {
    title: "Smoking Policy",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    items: [
      "Smoking inside guest rooms and non-smoking common areas is strictly prohibited.",
      "Cleaning fees will be assessed for violations of the smoking policy.",
    ],
  },
  {
    title: "Visitors",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    items: [
      "External visitors are permitted only with prior management approval.",
      "All visitors must present a valid government-issued photo ID.",
    ],
  },
  {
    title: "Property Care & Conduct",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    items: [
      "Guests are held liable for any physical damage caused to hotel property.",
      "Quiet hours and reasonable noise levels must be maintained out of respect for other guests.",
      "Guests are requested to maintain cleanliness and discipline throughout their stay.",
    ],
  },
  {
    title: "Prohibited Activities",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" />
      </svg>
    ),
    items: [
      "Consumption or possession of illegal substances or weapons is strictly prohibited.",
      "Harassment or illegal conduct of any kind will result in immediate reporting to authorities.",
      "Violation of this policy will lead to immediate cancellation of stay without refund.",
    ],
  },
];

export default function PolicyPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Guest Information</span>
          <h1 className="font-playfair text-5xl text-white mt-2">Hotel Policies</h1>
          
          <p className="font-hind text-white/60 mt-4 max-w-xl leading-relaxed">
            Please read our hotel policies carefully to ensure a comfortable and pleasant stay for all guests.
          </p>
          <p className="font-playfair text-xl text-white italic leading-relaxed">
            "We believe hospitality is about more than a stay — it's about making every guest feel welcome, valued, and cared for."
          </p>
          <p className="font-hind text-gold font-semibold tracking-wide mt-3 text-sm uppercase">
            Welcome warmly. Serve sincerely. Create memorable stays.
          </p>
        </div>
      </div>

      <SectionWrapper bgColor="bg-ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <div key={policy.title} className="bg-white border border-stone-light p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-saffron-pale border border-saffron/20 flex items-center justify-center text-saffron shrink-0">
                  {policy.icon}
                </div>
                <h2 className="font-playfair text-lg text-charcoal">{policy.title}</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {policy.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-hind text-sm text-text-muted leading-relaxed">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--saffron)" strokeWidth="2" className="shrink-0 mt-0.5">
                      <path d="M3 8l4 4 6-6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
<div className="mt-8 bg-forest text-ivory p-6 flex items-start gap-4">
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
  </svg>
  <div>
    <p className="font-hind text-sm text-ivory/80 leading-relaxed mb-3">
      Hotel management reserves the right to take appropriate action in case of violation of any hotel rules. For queries, contact our front desk at{" "}
      <strong className="text-gold">+91 9762622335</strong> or{" "}
      <strong className="text-gold">shubharambh.banquet2026@gmail.com</strong>.
    </p>
  </div>
</div>
      </SectionWrapper>
    </>
  );
}