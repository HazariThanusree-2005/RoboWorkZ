import { motion } from 'framer-motion';
import BrandText from '../components/ui/BrandText';
import AboutSection from '../components/sections/AboutSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { InteractiveRobotSpline } from '../components/ui/interactive-3d-robot';

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const AboutPage = () => {
  return (
    <div className="pt-20">
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center -mt-20">
        
        {/* Interactive 3D Robot Background */}
        <InteractiveRobotSpline
          scene={ROBOT_SCENE_URL}
          className="absolute inset-0 z-0" 
        />
        
        {/* Gradient overlay to ensure text is readable and blends into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050312]/10 via-[#050312]/30 to-[#050312] pointer-events-none z-10" />

        {/* Heading Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none mt-56 md:mt-64">
          <motion.h1
            className="font-instrument text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 flex flex-wrap items-center justify-center gap-2 md:gap-4 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About <BrandText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 font-inter max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            India's next generation robotics startup, creating smart solutions for a future powered by innovation.
          </motion.p>
        </div>
      </section>

      <div className="relative z-30 bg-[#050312]">
        <AboutSection hideHeader={true} />
        <WhyChooseUs />
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default AboutPage;
