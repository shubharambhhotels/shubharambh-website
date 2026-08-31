"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const tabs = ["Spiritual", "Adventure", "Cultural"] as const;
type Tab = (typeof tabs)[number];

const experiences: Record<Tab, {
  id: string;
  name: string;
  duration: string;
  season: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Cultural";
  desc: string;
  image: string;
}[]> = {
  Spiritual: [
    {
      id: "adi-kailash",
      name: "Adi Kailash Yatra",
      duration: "5–7 Days",
      season: "May – October",
      difficulty: "Moderate",
      desc: "Trek to the revered Adi Kailash and Om Parvat — the original Kailash of the Kumaon Himalayas, considered as sacred as Kailash in Tibet.",
      image: "/images/adi-kailash.jpeg",
    },
    {
      id: "patal-bhuvaneshwar",
      name: "Patal Bhuvaneshwar",
      duration: "1 Day",
      season: "Year Round",
      difficulty: "Easy",
      desc: "Descend into the mystical limestone cave temple housing divine sculptures spanning all four Yugas. An extraordinary subterranean world.",
      image: "/images/patal-bhuvaneshwar.jpg",
    },
    {
      id: "dhwaj-temple",
      name: "Dhwaj Temple Trek",
      duration: "Half Day",
      season: "Year Round",
      difficulty: "Easy",
      desc: "Visit the hilltop Shakti temple with sweeping views of the Pithoragarh valley and distant snow peaks beyond.",
      image: "/images/dhwaj.jpeg",
    },
  ],
  Adventure: [
    {
      id: "milam-glacier",
      name: "Milam Glacier Trek",
      duration: "10 Days",
      season: "June – September",
      difficulty: "Challenging",
      desc: "One of Kumaon's finest high-altitude treks through remote valleys and ancient shepherds' trails above 4,000 metres.",
      image: "/images/milam.jpg",
    },
    {
      id: "panchachuli",
      name: "Panchachuli Base Camp",
      duration: "7 Days",
      season: "May–June, Sept–Oct",
      difficulty: "Moderate",
      desc: "Trek to the base of five sacred peaks in pristine alpine wilderness above Munsyari, with breathtaking close-up views.",
      image: "/images/panchachuli.jpeg",
    },
    {
      id: "kali-rafting",
      name: "Kali River Rafting",
      duration: "1 Day",
      season: "September – November",
      difficulty: "Moderate",
      desc: "White-water thrills on the sacred Kali river — the natural boundary between India and Nepal.",
      image: "/images/rafting.jpg",
    },
  ],
  Cultural: [
    {
      id: "chholiya-dance",
      name: "Chholiya Dance Evening",
      duration: "2 Hours",
      season: "Year Round",
      difficulty: "Cultural",
      desc: "Witness the vibrant traditional Kumaoni sword-and-shield warrior dance performed in full regalia at the hotel.",
      image: "/images/cholia.jpg",
    },
    {
      id: "cuisine-class",
      name: "Kumaoni Cuisine Class",
      duration: "3 Hours",
      season: "Year Round",
      difficulty: "Cultural",
      desc: "Cook authentic mountain dishes — Kafuli, Jhangora Kheer, and herb-infused Bal Mithai with our resident chef.",
      image: "/images/thhali.jpg",
    },
    {
      id: "hiljatra",
      name: "Hiljatra Festival",
      duration: "1 Day",
      season: "September – October",
      difficulty: "Cultural",
      desc: "Participate in Pithoragarh's beloved folk festival celebrating local mythology, ancient rituals, and community music.",
      image: "/images/hiljatra.jpg",
    },
  ],
};

const difficultyStyle: Record<string, string> = {
  Easy: "bg-forest/10 text-forest border border-forest/20",
  Moderate: "bg-saffron/10 text-saffron border border-saffron/20",
  Challenging: "bg-charcoal/10 text-charcoal border border-charcoal/20",
  Cultural: "bg-gold/10 text-charcoal border border-gold/30",
};

export default function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Spiritual");

  return (
    <SectionWrapper id="experiences" bgColor="bg-stone-light">
      <div className="mb-10">
        <span className="eyebrow">Curated Journeys</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          Live the <em className="text-saffron not-italic">Himalayan Story</em>
        </h2>
        <div className="divider mt-4" />
        <p className="font-hind text-text-muted max-w-lg leading-relaxed mt-4">
          Beyond a hotel stay — we are your guide to the spiritual, adventurous, and cultural soul of Kumaon.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-stone-light mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-hind text-[12px] font-semibold tracking-[0.12em] uppercase px-7 py-3 border-b-2 transition-all duration-200 -mb-px ${
              activeTab === tab
                ? "border-saffron text-saffron"
                : "border-transparent text-text-muted hover:text-charcoal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiences[activeTab].map((exp) => (
          <div
            key={exp.id}
            className="bg-white border border-stone-light hover:border-saffron transition-colors duration-300 group"
          >
            <div className="relative overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <Image 
                  src={exp.image}
                  alt={exp.name}
                  width={480}
                  height={270}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <span
                className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wide px-2.5 py-1 uppercase ${difficultyStyle[exp.difficulty]}`}
              >
                {exp.difficulty}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-playfair text-lg text-charcoal mb-2">{exp.name}</h3>
              <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center gap-1.5 font-hind text-[11px] text-text-muted">
                  <Clock size={12} /> {exp.duration}
                </span>
                <span className="flex items-center gap-1.5 font-hind text-[11px] text-text-muted">
                  <Calendar size={12} /> {exp.season}
                </span>
              </div>
              <p className="font-hind text-sm text-text-muted leading-relaxed mb-4">
                {exp.desc}
              </p>
              <Link
                href={`/experiences#${exp.id}`}
                className="inline-flex items-center gap-1.5 font-hind text-[12px] font-semibold text-saffron tracking-wide uppercase hover:gap-2.5 transition-all"
              >
                Enquire <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/experiences" className="btn-secondary">
          View All Experiences
        </Link>
      </div>
    </SectionWrapper>
  );
}
