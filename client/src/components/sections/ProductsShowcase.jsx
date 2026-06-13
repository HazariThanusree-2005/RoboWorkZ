import { motion } from 'framer-motion';
<<<<<<< HEAD
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';
=======
import { HiCheckCircle, HiExternalLink, HiCalendar } from 'react-icons/hi';
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';

<<<<<<< HEAD
const products = [
  {
    id: 1,
    name: 'AI Robotic Exoskeleton Arm',
    image: '/arm-robo.png',
    desc: 'A wearable robotic assistance system designed to enhance human strength, rehabilitation, and industrial productivity. Built for healthcare, research, and advanced robotics applications.',
    features: ['Motion Assistance', 'Smart Sensor Integration', 'Lightweight Design', 'AI-Powered Control']
  },
  {
    id: 2,
    name: 'Quadruped Robot Dog',
    image: '/robo-dog.png',
    desc: 'An intelligent four-legged robotic platform capable of stable movement, obstacle navigation, research experimentation, and autonomous operations.',
    features: ['Dynamic Walking System', 'Autonomous Navigation', 'Research Platform', 'Real-Time Control']
  },
  {
    id: 3,
    name: 'Industrial Robotic Manipulator',
    image: '/table-robo.png',
    desc: 'A precision robotic arm designed for automation, object handling, manufacturing, pick-and-place operations, and robotics education.',
    features: ['Multi-Axis Movement', 'Precision Control', 'Industrial Automation', 'Educational Applications']
  }
=======
const RoboCamFeatures = [
  { title: 'AI Camera Tracking', desc: 'Advanced face & body tracking keeps you perfectly framed as you move.' },
  { title: 'Smart Motion Recording', desc: 'Pre-programmed camera paths, motion-lapse, and automated orientation.' },
  { title: 'Automated Cinematic Capture', desc: 'Smooth cinematic tracking with fluid pan/tilt, replicating a pro camera crew.' },
  { title: 'Influencer Content Creation', desc: 'Hands-free operation lets creators and vloggers focus on their content.' },
  { title: 'Robotic Filming Assistance', desc: 'Autonomous gimbal system with zero-latency tracking for professional shots.' },
  { title: 'Creator-Friendly Setup', desc: 'Compatible with smartphones, GoPros, and professional DSLRs — plug and create.' },
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
];

const ProductsShowcase = () => {
  return (
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Ambient background glows */}
<<<<<<< HEAD
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading 
          title="Our Robotics Products" 
          subtitle="Advanced robotics solutions designed for education, automation, research, healthcare, and industrial innovation."
        />

        {/* 3-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.15}>
              <GlassCard
                className="p-0 h-full flex flex-col overflow-hidden group"
                hover={true}
                glow={true}
                tilt={true}
              >
                {/* Product Image Section */}
                <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900 border-b border-white/[0.05]">
                  {/* Subtle purple glow behind the image inside the card */}
                  <div className="absolute inset-0 bg-primary-500/10 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Tag overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-manrope font-semibold bg-dark-900/80 backdrop-blur-md text-white rounded-full border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                      Innovation
                    </span>
                  </div>
                </div>

                {/* Product Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-space text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6 flex-1">
                    {product.desc}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-inter text-gray-300">
                        <HiCheckCircle className="text-primary-500 mt-0.5 shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-white/[0.05]">
                    <MagneticButton className="w-full">
                      <motion.button 
                        className="w-full py-3 px-4 rounded-xl font-manrope font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 border border-primary-500/30 text-primary-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-[0_0_20px_rgba(123,57,252,0.4)]"
                      >
                        Learn More <HiArrowRight size={16} />
                      </motion.button>
                    </MagneticButton>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
        
=======
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading 
          title="Flagship Product" 
          subtitle="Empowering content creators, vlogs, events, and cinematic recording with next-generation smart tracking robotics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image / Showcase Presentation — Clickable */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal direction="left">
              <a 
                href="https://robocam.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <GlassCard
                  className="p-0 overflow-hidden relative"
                  hover={true}
                  glow={true}
                  tilt={true}
                >
                  {/* Spotlight background effect */}
                  <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(123,57,252,0.18)_0%,transparent_70%)] animate-pulse pointer-events-none" />

                  <div className="relative h-[400px] sm:h-[480px] bg-gradient-to-br from-primary-950/20 to-dark-900/90 overflow-hidden flex items-center justify-center p-8">
                    <motion.img 
                      src="/robocam.png" 
                      alt="RoboCam Smart Tracking Device"
                      className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(123,57,252,0.4)]"
                      initial={{ scale: 0.95, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 150, 
                        damping: 15,
                        default: { duration: 0.5 }
                      }}
                    />

                    {/* Flagship Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 text-xs font-manrope font-bold bg-primary-500 text-white rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(123,57,252,0.4)]">
                        Flagship Product
                      </span>
                    </div>

                    {/* Creator Choice Tag */}
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 text-xs font-manrope font-semibold bg-emerald-500/80 backdrop-blur-sm text-white rounded-full">
                        ✓ Creator-Focused
                      </span>
                    </div>

                    {/* Hover overlay CTA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 pointer-events-none">
                      <span className="px-6 py-2.5 bg-primary-500/90 backdrop-blur-sm text-white font-manrope font-semibold rounded-xl text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(123,57,252,0.5)]">
                        View Product <HiExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column: Description & Features */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <ScrollReveal direction="right">
              {/* Product Header */}
              <div className="mb-6">
                <span className="text-xs font-manrope font-bold text-primary-400 uppercase tracking-widest block mb-2">
                  Content Creation Robotics
                </span>
                <h3 className="font-space text-4xl sm:text-5xl font-bold text-white mb-4">
                  Robo<span className="text-gradient">Cam</span>
                </h3>
                <p className="text-gray-300 font-inter text-base leading-relaxed mb-6">
                  RoboCam is a state-of-the-art smart camera assistant focused mainly on influencers, vlogger teams, and event filmmakers. By tracking movement natively and automating gimbal orientation, it provides seamless hands-free recording.
                </p>
              </div>

              {/* Glowing Product Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {RoboCamFeatures.map((feat, index) => (
                  <div 
                    key={feat.title}
                    className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-primary-500/[0.02] hover:border-primary-500/20 transition-all duration-300 group"
                  >
                    <div className="flex gap-3">
                      <HiCheckCircle className="text-primary-400 group-hover:text-primary-300 shrink-0 mt-0.5 transition-colors" size={18} />
                      <div>
                        <h4 className="font-manrope font-semibold text-white text-sm group-hover:text-primary-200 transition-colors">
                          {feat.title}
                        </h4>
                        <p className="text-gray-500 text-xs font-inter mt-1 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="https://robocam.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MagneticButton>
                    <GlowButton variant="primary">
                      <span className="flex items-center gap-2">
                        Explore RoboCam <HiExternalLink size={16} />
                      </span>
                    </GlowButton>
                  </MagneticButton>
                </a>
                
                <a href="#contact">
                  <MagneticButton>
                    <GlowButton variant="outline">
                      <span className="flex items-center gap-2">
                        Book a Demo <HiCalendar size={16} />
                      </span>
                    </GlowButton>
                  </MagneticButton>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
      </div>
    </section>
  );
};

export default ProductsShowcase;
