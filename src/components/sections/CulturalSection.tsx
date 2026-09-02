import SectionWrapper from "@/components/ui/SectionWrapper";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Image from "next/image";

const culture = [
  {
    id: "chholiya",
    name: "Chholiya Dance",
    desc: "Kumaoni warrior folk dance performed with swords and shields during weddings and festivals.",
    image: "/images/cholia.jpg",
  },
  {
    id: "kumaoni-holi",
    name: "Kumaoni Holi",
    desc: "A classical spring festival celebrated with traditional Baithaki Holi songs and Khari Holi folk singing.",
    image: "/images/holi.jpg",
  },
  {
    id: "hiljatra",
    name: "Hiljatra",
    desc: "An ancient ritual harvest festival unique to Pithoragarh celebrating mythology and community.",
    image: "/images/hiljatra.jpg",
  },
  {
    id: "jhora",
    name: "Jhora Dance",
    desc: "A joyous community circle dance performed at seasonal fairs and cultural gatherings.",
    image: "/images/jhora.jpg",
  },
  {
    id: "phooldei",
    name: "Phooldei",
    desc: "The spring welcoming ritual where children place wildflowers at doorsteps to invite prosperity.",
    image: "/images/phooldei.jpg",
  },
];

export default function CulturalSection() {
  return (
    <SectionWrapper id="culture" bgColor="bg-forest">
      <div className="text-center mb-14">
        <span className="eyebrow text-gold-light/80">Living Traditions</span>
        <h2 className="font-playfair text-4xl text-ivory">
          The <em className="text-gold-light not-italic">Soul of Kumaon</em>
        </h2>
        <p className="font-hind text-ivory/60 max-w-lg mx-auto leading-relaxed mt-4">
          Centuries of culture, devotion, and artistry pulse through every festival, dance, and feast of this Himalayan land.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {culture.map((c) => (
          <div key={c.id} className="group">
            {/* Image */}
            <div className="overflow-hidden border border-white/10 mb-4 aspect-[2/3]">
            <Image
              src={c.image}
              alt={c.name}
              width={240}
              height={360}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <h3 className="font-playfair text-[1rem] text-ivory mb-1">{c.name}</h3>
            <p className="font-hind text-[13px] text-ivory/50 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
