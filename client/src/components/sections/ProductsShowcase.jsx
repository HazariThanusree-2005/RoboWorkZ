import { motion } from 'framer-motion';
import { HiCheckCircle, HiExternalLink, HiCalendar } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';

const RoboCamFeatures = [
  { title: 'AI Camera Tracking', desc: 'Advanced face & body tracking keeps you perfectly framed as you move.' },
  { title: 'Smart Motion Recording', desc: 'Pre-programmed camera paths, motion-lapse, and automated orientation.' },
  { title: 'Automated Cinematic Capture', desc: 'Smooth cinematic tracking with fluid pan/tilt, replicating a pro camera crew.' },
  { title: 'Influencer Content Creation', desc: 'Hands-free operation lets creators and vloggers focus on their content.' },
  { title: 'Robotic Filming Assistance', desc: 'Autonomous gimbal system with zero-latency tracking for professional shots.' },
  { title: 'Creator-Friendly Setup', desc: 'Compatible with smartphones, GoPros, and professional DSLRs — plug and create.' },
];

const ProductsShowcase = () => {
  return (
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Ambient background glows */}
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
      </div>
    </section>
  );
};

export default ProductsShowcase;
