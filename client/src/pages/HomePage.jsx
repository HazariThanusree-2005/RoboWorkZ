import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ProductsShowcase from '../components/sections/ProductsShowcase';
import HowItWorks from '../components/sections/HowItWorks';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import GallerySection from '../components/sections/GallerySection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <ProductsShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default HomePage;
