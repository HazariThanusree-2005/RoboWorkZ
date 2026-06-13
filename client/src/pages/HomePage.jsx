import HeroSection from '../components/hero/HeroSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import ServicesSection from '../components/sections/ServicesSection';
import RentalsSection from '../components/sections/RentalsSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <RentalsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
