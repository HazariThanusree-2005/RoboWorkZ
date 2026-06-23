import { useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import RobotVideoSection from '../components/sections/RobotVideoSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import RentalsSection from '../components/sections/RentalsSection';

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
      <RobotVideoSection />
      <FeaturedProducts />
      <RentalsSection />
    </div>
  );
};

export default HomePage;
