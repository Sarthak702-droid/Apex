import AboutSection from "@/components/landing/about-section";
import ContactSection from "@/components/landing/contact-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
    </div>
  );
}
