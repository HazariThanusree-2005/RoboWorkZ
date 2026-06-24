import { motion } from 'framer-motion';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';

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
];

const ProductsShowcase = () => {
  return (
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Ambient background glows */}
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
        
      </div>
    </section>
  );
};

export default ProductsShowcase;
