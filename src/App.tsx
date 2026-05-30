import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import BrandShowcase from "@/components/sections/BrandShowcase";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import MaterialsCapabilities from "@/components/sections/MaterialsCapabilities";
import ProcessCTA from "@/components/sections/ProcessCTA";
import MarqueeTestimonials from "@/components/sections/MarqueeTestimonials";
import ContactSection from "@/components/sections/ContactSection";

function App() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <BrandShowcase />
        <ServicesOverview />
        <FeaturedProjects />
        <MaterialsCapabilities />
        <ProcessCTA />
        <MarqueeTestimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
