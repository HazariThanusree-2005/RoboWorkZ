import { motion } from 'framer-motion';
import HowItWorks from '../components/sections/HowItWorks';
import { InteractiveRobotSpline } from '../components/ui/interactive-3d-robot';
import { GlassVideoDemos } from '../components/ui/glass-video-demos';

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const DEMO_VIDEOS = [
  {
    src: `${import.meta.env.BASE_URL}dog_video.mp4`,
    title: 'Robot Dog — Field Navigation',
    description: 'Watch our quadruped robot dog autonomously navigate complex terrains and perform real-time object detection at events and exhibitions.',
    tag: 'Autonomous Navigation',
    color: '#8b5cf6',
  },
  {
    src: `${import.meta.env.BASE_URL}hand_video.mp4`,
    title: 'Robotic Arm — Precision Handling',
    description: 'See our robotic arm perform delicate, high-precision pick-and-place operations for industrial automation and public demonstrations.',
    tag: 'Industrial Demo',
    color: '#a855f7',
  },
  {
    src: `${import.meta.env.BASE_URL}picker_video.mp4`,
    title: 'Smart Picker — Product Showcase',
    description: 'Our smart picker robot effortlessly identifies and retrieves objects, perfect for retail displays, trade shows, and interactive brand activations.',
    tag: 'Interactive Experience',
    color: '#c084fc',
  },
  {
    src: `${import.meta.env.BASE_URL}robo-video.mp4`,
    title: 'Humanoid Robot — Event Greeter',
    description: 'Deploy our humanoid robot as a premium event host or brand ambassador — engaging visitors with AI-powered conversation and gesture control.',
    tag: 'Event Ready',
    color: '#7c3aed',
  },
  {
    src: `${import.meta.env.BASE_URL}workshop-new.mp4`,
    title: 'Workshop Live — Behind the Tech',
    description: 'An exclusive look inside our robotics workshop where our engineers build, test, and calibrate every robot before your event deployment.',
    tag: 'Workshop Session',
    color: '#9333ea',
  },
];

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
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none mt-56 md:mt-64">
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

      {/* Live Demo Videos Section */}
      <div className="relative z-30">
        <GlassVideoDemos
          videos={DEMO_VIDEOS}
          sectionTitle="See Them in Action"
          sectionSubtitle="Real robots. Real deployments. Watch our fleet perform live demos across events, exhibitions, and business activations."
        />
      </div>
    </div>
  );
};

export default RentalsPage;
