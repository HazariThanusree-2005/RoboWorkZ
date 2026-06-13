import { motion } from 'framer-motion';
import HowItWorks from '../components/sections/HowItWorks';
import ContactSection from '../components/sections/ContactSection';

const RentalsPage = () => {
  return (
    <div className="pt-20">
      <section className="pt-16 md:pt-24 pb-8 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <motion.h1
            className="font-instrument text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Robot <span className="text-gradient">Rentals</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 font-inter max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Rent cutting-edge robots for your events, business promotions, exhibitions, and more. Flexible plans, expert support.
          </motion.p>
        </div>
      </section>
      <HowItWorks />
      <ContactSection />
    </div>
  );
};

export default RentalsPage;
