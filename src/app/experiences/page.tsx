import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experiences & Tours",
  description:
    "Spiritual tours to Adi Kailash & Patal Bhuvaneshwar, adventure treks to Milam Glacier & Panchachuli, and cultural experiences from Shubharambh Hotel Pithoragarh.",
};

const allExperiences = [
  // Spiritual
  {
    id: "adi-kailash",
    category: "Spiritual",
    name: "Adi Kailash Yatra",
    duration: "5–7 Days",
    season: "May – October",
    difficulty: "Moderate" as const,
    minAltitude: "1,814m",
    maxAltitude: "5,945m",
    desc: "The Chhota Kailash pilgrimage — trek to the sacred Adi Kailash and Om Parvat, where the natural OM symbol appears in snow on the cliff face. Considered equally sacred to Tibet's Kailash.",
    includes: ["Accommodation", "Meals en route", "Certified guide", "Permits", "First aid kit"],
    image: "/images/adi-kailash.jpeg",
  },
  {
    id: "patal-bhuvaneshwar",
    category: "Spiritual",
    name: "Patal Bhuvaneshwar",
    duration: "1 Day",
    season: "Year Round",
    difficulty: "Easy" as const,
    minAltitude: "1,350m",
    maxAltitude: "1,350m",
    desc: "Descend into the ancient limestone cave temple of Patal Bhuvaneshwar near Gangolihat. The cave houses stone formations believed to be the lingam of Shiva, Brahma's lotus, and sculptures spanning all four Yugas.",
    includes: ["Transport", "Entry permits", "Local guide", "Return by evening"],
    image: "/images/patal-bhuvaneshwar.jpg",
  },
  {
    id: "dhwaj-temple",
    category: "Spiritual",
    name: "Dhwaj Temple Trek",
    duration: "Half Day",
    season: "Year Round",
    difficulty: "Easy" as const,
    minAltitude: "1,814m",
    maxAltitude: "2,100m",
    desc: "A short but rewarding trek to the ancient Shakti temple of Dhwaj, perched on a commanding ridge above Pithoragarh with sweeping views of the valley and distant Himalayan snow peaks.",
    includes: ["Local guide", "Breakfast at hotel", "Return by noon"],
    image: "/images/dhwaj.jpeg",
  },
  {
    id: "hat-kalika",
    category: "Spiritual",
    name: "Hat Kalika",
    duration: "1 Day",
    season: "Year Round",
    difficulty: "Easy" as const,
    minAltitude: "1,400m",
    maxAltitude: "1,700m",
    desc: "Visit the revered Hat Kalika temple in Gangolihat — a major Shakti shrine. It is a revered Shakti Peeth believed to have been consecrated in the 8th century by Adi Shankaracharya.",
    includes: ["Transport", "Local guide", "Lunch en route"],
    image: "/images/hat-kalika.jpg",
  },
  // Adventure
  {
    id: "milam-glacier",
    category: "Adventure",
    name: "Milam Glacier Trek",
    duration: "10 Days",
    season: "June – September",
    difficulty: "Challenging" as const,
    minAltitude: "2,040m",
    maxAltitude: "4,200m",
    desc: "One of the finest high-altitude treks in Kumaon — through remote Johar valley, past ancient shepherds' trails, dense forests, and wild camping at 4,000m above sea level.",
    includes: ["Camp accommodation", "All meals", "Certified mountaineer guide", "Permits", "Safety equipment"],
    image: "/images/milam.jpg",
  },
  {
    id: "panchachuli",
    category: "Adventure",
    name: "Panchachuli Base Camp",
    duration: "7 Days",
    season: "May–June, Sept–Oct",
    difficulty: "Moderate" as const,
    minAltitude: "2,200m",
    maxAltitude: "3,900m",
    desc: "Trek to the base of five sacred peaks in the pristine Darma valley wilderness. The Panchachuli massif — the legendary kitchen fires of the Pandavas — offers some of the most dramatic Himalayan vistas accessible on foot.",
    includes: ["Camp stays", "All meals", "Guide & porter", "Permits", "Emergency kit"],
    image: "/images/panchachuli.jpeg",
  },
  {
    id: "kali-rafting",
    category: "Adventure",
    name: "Kali River Rafting",
    duration: "1 Day",
    season: "September – November",
    difficulty: "Moderate" as const,
    minAltitude: "900m",
    maxAltitude: "900m",
    desc: "White-water rafting on the sacred Kali river — the natural boundary between India and Nepal — with Grade III–IV rapids through dramatic canyon scenery.",
    includes: ["Safety gear", "Certified instructor", "Transport", "Lunch"],
    image: "/images/rafting.jpg",
  },
  {
    id: "chandak-forest",
    category: "Adventure",
    name: "Chandak Forest Walk",
    duration: "Half Day",
    season: "March – June, Sept – Nov",
    difficulty: "Easy" as const,
    minAltitude: "1,814m",
    maxAltitude: "2,000m",
    desc: "A gentle forest walk through the pine and rhododendron forests of Chandak Hill, ending at the panoramic viewpoint above Pithoragarh with 180-degree Himalayan views.",
    includes: ["Local naturalist guide", "Packed breakfast", "Return transport"],
    image: "/images/chandak.jpg",
  },
  // Cultural
  {
    id: "chholiya-dance",
    category: "Cultural",
    name: "Chholiya Dance Evening",
    duration: "2 Hours",
    season: "Year Round",
    difficulty: "Cultural" as const,
    minAltitude: "1,814m",
    maxAltitude: "1,814m",
    desc: "Witness the vibrant traditional Kumaoni Chholiya dance — a sword-and-shield warrior folk dance performed in full regalia. Hosted at the hotel courtyard with local musicians.",
    includes: ["Cultural performance", "Kumaoni welcome drink", "Interaction with artists"],
    image: "/images/cholia.jpg",
  },
  {
    id: "cuisine-class",
    category: "Cultural",
    name: "Kumaoni Cuisine Class",
    duration: "3 Hours",
    season: "Year Round",
    difficulty: "Cultural" as const,
    minAltitude: "1,814m",
    maxAltitude: "1,814m",
    desc: "Cook authentic Kumaoni mountain dishes with our resident chef — Kafuli (fenugreek curry), Jhangora Kheer, Bhatt ki Churkani, and the famous Bal Mithai sweet.",
    includes: ["All ingredients", "Recipe card", "Tasting meal", "Cooking apron"],
    image: "/images/thhali.jpg",
  },
  {
    id: "hiljatra-festival",
    category: "Cultural",
    name: "Hiljatra Festival Tour",
    duration: "1 Day",
    season: "September – October",
    difficulty: "Cultural" as const,
    minAltitude: "1,814m",
    maxAltitude: "1,814m",
    desc: "Participate in Pithoragarh's beloved ancient folk festival celebrating local mythology, music, and community rituals. One of the most distinctive festivals in the Kumaon Himalayas.",
    includes: ["Festival guide", "Local costume", "Traditional meal", "Cultural briefing"],
    image: "/images/hiljatra.jpg",
  },
];

const difficultyStyle: Record<string, string> = {
  Easy: "bg-forest/10 text-forest border border-forest/20",
  Moderate: "bg-saffron/10 text-saffron border border-saffron/20",
  Challenging: "bg-charcoal/10 text-charcoal border border-charcoal/20",
  Cultural: "bg-gold/10 text-charcoal-mid border border-gold/30",
};

const categories = ["All", "Spiritual", "Adventure", "Cultural"];

export default function ExperiencesPage() {
  const grouped = {
    Spiritual: allExperiences.filter((e) => e.category === "Spiritual"),
    Adventure: allExperiences.filter((e) => e.category === "Adventure"),
    Cultural: allExperiences.filter((e) => e.category === "Cultural"),
  };

  return (
    <>
      {/* Header */}
      <div className="bg-saffron pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="eyebrow font-bold" style={{ color: "#fff" }}>Curated Journeys</span>
          <h1 className="font-playfair text-5xl text-white mt-2">
            Experiences & Tours
          </h1>
          <p className="font-hind text-white/50 mt-4 max-w-xl leading-relaxed">
            Beyond a hotel stay — Shubharambh is your guide to the spiritual, adventurous, and cultural soul of the Kumaon Himalayas.
          </p>
        </div>
      </div>

      {/* Spiritual */}
      <SectionWrapper id="spiritual" bgColor="bg-ivory">
        <span className="eyebrow">Pilgrimage & Devotion</span>
        <h2 className="font-playfair text-3xl text-charcoal mb-2">
          Spiritual <em className="text-saffron not-italic">Experiences</em>
        </h2>
        <div className="divider mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grouped.Spiritual.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </SectionWrapper>

      {/* Adventure */}
      <SectionWrapper id="adventure" bgColor="bg-stone-light">
        <span className="eyebrow">Trekking & Wilderness</span>
        <h2 className="font-playfair text-3xl text-charcoal mb-2">
          Adventure <em className="text-saffron not-italic">Experiences</em>
        </h2>
        <div className="divider mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grouped.Adventure.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </SectionWrapper>

      {/* Cultural */}
      <SectionWrapper id="cultural" bgColor="bg-ivory">
        <span className="eyebrow">Folk Arts & Heritage</span>
        <h2 className="font-playfair text-3xl text-charcoal mb-2">
          Cultural <em className="text-saffron not-italic">Experiences</em>
        </h2>
        <div className="divider mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grouped.Cultural.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} compact />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

function ExperienceCard({
  exp,
  compact = false,
}: {
  exp: (typeof allExperiences)[0];
  compact?: boolean;
}) {
  return (
    <div
      id={exp.id}
      className={`bg-white border border-stone-light hover:border-saffron transition-colors duration-300 group flex ${
        compact ? "flex-col" : "flex-col md:flex-row"
      }`}
    >
      {/* Image */}
      <div className={`overflow-hidden ${compact ? "" : "md:w-2/5 shrink-0"}`}>
        <Image src={exp.image} alt={exp.name} width={400} height={300} className="object-cover w-full h-full" />
        {/*
          Replace with:
          <Image src={exp.image} alt={exp.name} width={400} height={300} className="object-cover w-full h-full" />
        */}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 uppercase ${difficultyStyle[exp.difficulty]}`}>
              {exp.difficulty}
            </span>
            <span className="font-hind text-[11px] text-text-muted uppercase tracking-wide">
              {exp.category}
            </span>
          </div>
          <h3 className="font-playfair text-xl text-charcoal mb-2">{exp.name}</h3>
          <div className="flex items-center gap-4 mb-3">
            <span className="flex items-center gap-1.5 font-hind text-[11px] text-text-muted">
              <Clock size={12} /> {exp.duration}
            </span>
            <span className="flex items-center gap-1.5 font-hind text-[11px] text-text-muted">
              <Calendar size={12} /> {exp.season}
            </span>
          </div>
          <p className="font-hind text-sm text-text-muted leading-relaxed mb-4">{exp.desc}</p>

          {!compact && exp.includes.length > 0 && (
            <div className="mb-4">
              <p className="font-hind text-[10px] font-semibold uppercase tracking-widest text-charcoal mb-2">
                Includes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.includes.map((item) => (
                  <span key={item} className="font-hind text-[11px] border border-stone-light bg-ivory px-2.5 py-1 text-text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link
          href={`/contact?purpose=${encodeURIComponent(exp.name)}`}
          className="inline-flex items-center gap-1.5 font-hind text-[12px] font-semibold text-saffron tracking-wide uppercase hover:gap-3 transition-all mt-2"
        >
          Enquire Now <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
