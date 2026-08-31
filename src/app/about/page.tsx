import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shubharambh Hotel & Banquet Hall — founded in 2025 by Jeewan Nagarkoti in Pithoragarh, Uttarakhand. Our story, philosophy, and Himalayan hospitality.",
};

const milestones = [
  { year: "1976", title: "Jeewan Nagarkoti Born", desc: "Born on 14 September 1976 in Pithoragarh, Uttarakhand — the scenic border town of Kumaon." },
  { year: "1988", title: "Family Sacrifice", desc: "Brother Late Sepoy Heera Ballabh Nagarkoti martyred in the line of duty, posthumously awarded the Shaurya Chakra — one of India's highest gallantry honours." },
  { year: "2000s", title: "Distribution Enterprise", desc: "Built a leading supply and distribution network across Pithoragarh district — authorised partner for Dabur, Patanjali, Haldiram, Godrej, Tata, and more." },
  { year: "2025", title: "Shubharambh Opens", desc: "Inaugurated Shubharambh Hotel & Banquet Hall — Pithoragarh's newest luxury hospitality destination, a dream realised." },
];

const values = [
  {
    title: "Himalayan Warmth",
    desc: "Every guest is welcomed as a pilgrim — with sincerity, care, and the gentle warmth of the Kumaoni people.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Serve Sincerely",
    desc: "We believe hospitality is about more than a stay — it is about making every guest feel welcome, valued, and cared for.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Cultural Preservation",
    desc: "We actively promote Kumaoni folk arts, cuisine, and festivals — keeping living traditions alive for future generations.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13M9 9l12-2" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: "Memorable Stays",
    desc: "With warm service, thoughtful details, and genuine attention, we create experiences that feel like home.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-10 4 6 3-4 6 8H3z" /><path d="M3 20h18" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header with real hotel photo */}
      <div className="relative pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/shubharambh.jpeg"
          alt="Shubharambh Hotel Pithoragarh"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Our Story</span>
          <h1 className="font-playfair text-5xl text-white mt-2">Heart of Kumaon</h1>
          <div className="w-10 h-0.5 bg-gold mt-4" />
          <p className="font-hind text-white/60 mt-4 max-w-xl leading-relaxed">
            Gateway to Kailash. Home of the Himalayas. A sanctuary where
            spirituality, culture, and luxury meet.
          </p>
        </div>
      </div>

      {/* Founder story */}
      <SectionWrapper bgColor="bg-ivory">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow">Meet the Founder</span>
            <h2 className="font-playfair text-4xl text-charcoal">
              Jeewan <em className="text-saffron not-italic">Nagarkoti</em>
            </h2>
            <div className="divider mt-4" />

            <p className="font-hind text-text-muted leading-relaxed mt-4 mb-4">
              My name is Jeewan Nagarkoti (D.O.B.: September 14, 1976), holding
              a Master's degree in History (M.A. History). I proudly belong to
              the scenic border town of Pithoragarh, Uttarakhand. Coming from a
              grounded middle-class background, my values have been deeply
              influenced by patriotism, discipline, and community service.
            </p>

            <p className="font-hind text-text-muted leading-relaxed mb-4">
              My family carries a proud legacy of national service. My eldest
              brother Mr. Krishnanand Nagarkoti retired as Sub-Inspector from
              the SSB. My brother Mr. Rajendra Nagarkoti currently serves as
              Inspector in the SSB. Most poignantly, my brother{" "}
              <strong className="text-charcoal">
                Late Sepoy Heera Ballabh Nagarkoti (1966–1988)
              </strong>{" "}
              made the supreme sacrifice for the nation and was posthumously
              awarded the{" "}
              <strong className="text-charcoal">Shaurya Chakra</strong> — one
              of India's highest peacetime gallantry honours.
            </p>

            <p className="font-hind text-text-muted leading-relaxed mb-4">
              My entrepreneurial journey began from a small tin-shade government
              fair-price shop. Through perseverance, integrity, and community
              trust, that humble start evolved into a major distribution
              enterprise covering the entire Pithoragarh district — today an
              authorised partner for Dabur, Patanjali, Parle, Tata, Haldiram,
              Godrej, and many more.
            </p>

            <p className="font-hind text-text-muted leading-relaxed mb-6">
              Shubharambh Hotel, which commenced operations in 2025, is the
              realisation of a personal dream — to offer travellers visiting
              Pithoragarh a refined experience blending modern comfort with
              genuine Pahadi warmth, and to elevate our region's presence on the
              tourism map.
            </p>

            {/* Hindi version */}
            <div className="border-l-2 border-gold pl-4 bg-gold-pale/30 py-3 pr-4">
              <p className="font-hind text-sm text-charcoal-mid leading-relaxed">
                होटल शुभारंभ केवल एक व्यावसायिक प्रोजेक्ट नहीं, बल्कि
                पिथौरागढ़ को कुछ बेहतरीन देने का मेरा एक सपना था जो अब साकार
                हुआ है।
              </p>
            </div>
          </div>

          {/* At a glance panel */}
          <div className="bg-white border border-stone-light p-8">
            <h3 className="font-playfair text-xl text-charcoal mb-6">At a Glance</h3>
            <div className="flex flex-col gap-5">
              {[
                { label: "Founder", value: "Jeewan Nagarkoti" },
                { label: "Hometown", value: "Pithoragarh, Uttarakhand" },
                { label: "Hotel Established", value: "2025" },
                { label: "Banquet Capacity", value: "500+ Guests" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between border-b border-stone-light pb-3 last:border-0 last:pb-0">
                  <span className="font-hind text-sm text-text-muted">{item.label}</span>
                  <span className="font-hind text-sm font-semibold text-charcoal text-right max-w-[55%]">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-stone-light pt-6">
              <p className="font-hind text-[10px] uppercase tracking-widest text-text-muted mb-3">
                Authorised Distributor For
              </p>
              <div className="flex flex-wrap gap-2">
                {["Dabur", "Patanjali", "Parle", "Tata", "Haldiram", "Godrej", "Amul", "Savour"].map((brand) => (
                  <span key={brand} className="font-hind text-[11px] border border-stone-light bg-ivory px-2.5 py-1 text-charcoal-mid">
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-stone-light pt-6">
              <p className="font-hind text-[10px] uppercase tracking-widest text-text-muted mb-2">
                Family Legacy
              </p>
              <p className="font-hind text-sm text-charcoal-mid leading-relaxed">
                Late Sepoy Heera Ballabh Nagarkoti —{" "}
                <strong className="text-charcoal">Shaurya Chakra</strong>{" "}
                (Posthumous, 1988)
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper bgColor="bg-ivory-dark">
        <div className="text-center mb-14">
          <span className="eyebrow">What We Stand For</span>
          <h2 className="font-playfair text-4xl text-charcoal">
            Culture, Spirituality &{" "}
            <em className="text-saffron not-italic">Hospitality</em>
          </h2>
          <div className="divider divider-center mt-4" />
          <p className="font-hind text-text-muted max-w-lg mx-auto mt-4 leading-relaxed">
            Welcome warmly. Serve sincerely. Create memorable stays.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-light">
          {values.map((v) => (
            <div key={v.title} className="p-8 border-b border-r border-stone-light bg-white hover:bg-saffron-pale transition-colors group">
              <div className="text-forest mb-4 group-hover:text-saffron transition-colors">{v.icon}</div>
              <h3 className="font-playfair text-[1.05rem] text-charcoal mb-2">{v.title}</h3>
              <p className="font-hind text-sm text-text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper bgColor="bg-ivory">
        <div className="text-center mb-14">
          <span className="eyebrow">Our Journey</span>
          <h2 className="font-playfair text-4xl text-charcoal">Milestones</h2>
          <div className="divider divider-center mt-4" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-[80px] top-0 bottom-0 w-px bg-stone-light hidden md:block" />
          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-8 items-start">
                <div className="flex flex-col items-center w-[80px] shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${i === milestones.length - 1 ? "bg-saffron border-saffron" : "bg-white border-stone"}`}>
                    <span className={`font-hind text-[10px] font-bold ${i === milestones.length - 1 ? "text-white" : "text-text-muted"}`}>
                      {m.year.slice(-2)}
                    </span>
                  </div>
                  <span className="font-playfair text-lg text-saffron font-semibold mt-1 text-center">{m.year}</span>
                </div>
                <div className="bg-white border border-stone-light p-6 flex-1">
                  <h3 className="font-playfair text-lg text-charcoal mb-1">{m.title}</h3>
                  <p className="font-hind text-sm text-text-muted leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Sacred land section */}
      <SectionWrapper bgColor="bg-forest">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow text-gold-light/70">Sacred Land</span>
            <h2 className="font-playfair text-4xl text-ivory">
              The Land of{" "}
              <em className="text-gold-light not-italic">Shiva & Shakti</em>
            </h2>
            <div className="divider mt-4" style={{ backgroundColor: "var(--gold)" }} />
            <p className="font-hind text-ivory/60 leading-relaxed mt-4 mb-4">
              The Kumaon Himalayas are not merely mountains — they are the abode
              of Mahadev. Every peak, river, and cave in this land carries the
              resonance of ancient devotion. Adi Kailash, visible from
              Pithoragarh on a clear day, is revered as equal in spiritual
              sanctity to the great Kailash in Tibet.
            </p>
            <p className="font-hind text-ivory/60 leading-relaxed">
              To stay in Pithoragarh is to rest within a living temple — where
              the mountains themselves are gods, and the air carries the weight
              of ten thousand years of prayer.
            </p>
          </div>
          <div className="border border-white/10 overflow-hidden aspect-[4/5] relative">
            <Image
              src="/images/shubharambh.jpeg"
              alt="Shubharambh Hotel — Gateway to the Himalayas"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
