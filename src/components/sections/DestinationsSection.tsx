import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const destinations = [
  {
    id: "adi-kailash",
    name: "Adi Kailash",
    tag: "Spiritual · 5–7 Days",
    desc: "The Chhota Kailash pilgrimage — Shiva's Himalayan abode in the Kumaon.",
    season: "May – October",
    image: "/images/adi-kailash.jpeg", // REPLACE
  },
  {
    id: "mansarovar",
    name: "Kailash Mansarovar",
    tag: "Pilgrimage · 18 Days",
    desc: "The ultimate sacred circumambulation around Mount Kailash via Tibet.",
    season: "June – September",
    image: "/images/mansarovar.jpg", // REPLACE
  },
  {
    id: "patal-bhuvaneshwar",
    name: "Patal Bhuvaneshwar",
    tag: "Cave Temple · Day Trip",
    desc: "Mystical underground limestone cave temple of Lord Shiva near Gangolihat.",
    season: "Year Round",
    image: "/images/patal-bhuvaneshwar.jpg", // REPLACE
  },
  {
    id: "munsyari",
    name: "Munsyari",
    tag: "Trek · 5–7 Days",
    desc: "Gateway to Milam Glacier and commanding views of the Panchachuli massif.",
    season: "March – June, Sept – Nov",
    image: "/images/munsyari.png", // REPLACE
  },
  {
    id: "dhwaj-temple",
    name: "Dhwaj Temple",
    tag: "Temple · Day Trip",
    desc: "Ancient Shakti shrine atop a ridge offering sweeping valley panoramas.",
    season: "Year Round",
    image: "/images/dhwaj.jpeg", // REPLACE
  },
  {
    id: "kapileshwar",
    name: "Kapileshwar Cave",
    tag: "Heritage · Day Trip",
    desc: "Sacred Shiva cave temple set in limestone, near the heart of Pithoragarh.",
    season: "Year Round",
    image: "/images/kapileshwar.jpg", // REPLACE
  },
  {
    id: "panchachuli",
    name: "Panchachuli Base",
    tag: "Trek · 8–10 Days",
    desc: "Five sacred peaks forming the Pandavas' legendary kitchen fire in Darma valley.",
    season: "May – October",
    image: "/images/panchachuli.jpeg", // REPLACE
  },
  {
    id: "chandak",
    name: "Chandak Hill",
    tag: "Scenic · Day Trip",
    desc: "Panoramic Himalayan viewpoint overlooking the entire Pithoragarh valley.",
    season: "Year Round",
    image: "/images/chandak.jpg", // REPLACE
  },
];

export default function DestinationsSection() {
  return (
    <SectionWrapper id="destinations" bgColor="bg-ivory">
      <div className="text-center mb-14">
        <span className="eyebrow">Sacred & Scenic Journeys</span>
        <h2 className="font-playfair text-4xl text-charcoal">
          Gateway to the <em className="text-saffron not-italic">Divine Himalayas</em>
        </h2>
        <div className="divider divider-center mt-4" />
        <p className="font-hind text-text-muted max-w-lg mx-auto leading-relaxed mt-4">
          Every destination within reach of Shubharambh carries centuries of
          spirituality, natural grandeur, and Kumaoni legend.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d) => (
          <Link
            key={d.id}
            href={`/experiences#${d.id}`}
            className="group block border border-stone-light bg-white hover:border-saffron transition-colors duration-300"
          >
            
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    width={360}
                    height={480}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
            <div className="p-5">
              <p className="font-hind text-[10px] tracking-[0.15em] uppercase text-saffron mb-1">
                {d.tag}
              </p>
              <h3 className="font-playfair text-lg text-charcoal mb-1.5">{d.name}</h3>
              <p className="font-hind text-sm text-text-muted leading-relaxed mb-3">
                {d.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-dark uppercase tracking-wide">
                  Best: {d.season}
                </span>
                <ArrowRight size={14} className="text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
