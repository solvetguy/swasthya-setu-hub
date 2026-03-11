import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ImpactSection from "@/components/landing/ImpactSection";
import SecuritySection from "@/components/landing/SecuritySection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <ImpactSection />
    <SecuritySection />
    <Footer />
  </div>
);

export default Index;
