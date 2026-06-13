import { motion } from 'framer-motion';
import AboutSection from '../components/sections/AboutSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const AboutPage = () => {
  return (
    <div className="pt-20">
<<<<<<< HEAD
      <section className="pt-16 md:pt-24 pb-8 px-6 text-center relative">
=======
      <section className="section-padding text-center relative">
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <motion.h1
            className="font-instrument text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
<<<<<<< HEAD
            About <span className="text-gradient">RoboWorkZ</span>
=======
            About <span className="text-gradient">RoboWorkz</span>
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 font-inter max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            India's next generation robotics startup, creating smart solutions for a future powered by innovation.
          </motion.p>
        </div>
      </section>
<<<<<<< HEAD
      <AboutSection hideHeader={true} />
=======
      <AboutSection />
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
      <WhyChooseUs />
      <TestimonialsSection />
    </div>
  );
};

export default AboutPage;
