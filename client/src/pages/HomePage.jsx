import { useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import ServicesSection from '../components/sections/ServicesSection';
import RentalsSection from '../components/sections/RentalsSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  // Scroll lock during initial load for premium feel
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <RentalsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
