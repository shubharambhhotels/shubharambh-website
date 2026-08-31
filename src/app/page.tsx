import HeroSection from "@/components/sections/HeroSection";
import WhyStaySection from "@/components/sections/WhyStaySection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import RoomsSection from "@/components/sections/RoomsSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import CulturalSection from "@/components/sections/CulturalSection";
import BanquetSection from "@/components/sections/BanquetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingCTASection from "@/components/sections/BookingCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyStaySection />
      <RoomsSection />
      <BanquetSection />
      <DestinationsSection />
      <ExperiencesSection />
      <CulturalSection />
      <TestimonialsSection />
      <BookingCTASection />
    </>
  );
}
