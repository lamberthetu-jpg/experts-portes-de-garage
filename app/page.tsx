import HeroSection from "@/components/HeroSection";
import BanniereMiseAuPoint from "@/components/BanniereMiseAuPoint";
import TrustBar from "@/components/TrustBar";
import ServicesGrid from "@/components/ServicesGrid";
import ReviewsSection from "@/components/ReviewsSection";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <BanniereMiseAuPoint />
      <HeroSection />
      <ReviewsSection />
      <ServicesGrid />
      <TrustBar />
      <CTABanner />
    </>
  );
}
