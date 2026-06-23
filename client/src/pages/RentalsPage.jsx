import { motion } from 'framer-motion';
import HowItWorks from '../components/sections/HowItWorks';
import { InteractiveRobotSpline } from '../components/ui/interactive-3d-robot';

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const RentalsPage = () => {
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
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none mt-32">
          <motion.h1
            className="font-instrument text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Robot <span className="text-gradient">Rentals</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 font-inter max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Rent cutting-edge robots for your events, business promotions, exhibitions, and more. Flexible plans, expert support.
          </motion.p>
        </div>
      </section>

      <div className="relative z-30 bg-[#050312]">
        <HowItWorks />
      </div>
    </div>
  );
};

export default RentalsPage;
