import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import WhySection from "../components/landing/WhySection";
import RoadmapPreview from "../components/landing/RoadmapPreview";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Stats />
      <WhySection />
      <RoadmapPreview />
      <CTASection />
    </div>
  );
}