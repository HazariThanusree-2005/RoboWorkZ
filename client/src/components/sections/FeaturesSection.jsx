import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import { 
  Cpu, BrainCircuit, Wrench, Package, 
  TrendingUp, Radio 
} from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Smart Automation',
    desc: 'Intelligent automation systems that learn, adapt, and optimize processes in real-time.',
    accent: '#7b39fc',
  },
  {
    icon: BrainCircuit,
    title: 'AI Powered Systems',
    desc: 'Advanced machine learning and neural networks driving next-generation robotic intelligence.',
    accent: '#8b5cf6',
  },
  {
    icon: Wrench,
    title: 'Custom Built Robots',
    desc: 'Precision-engineered robots designed from scratch to meet your exact specifications.',
    accent: '#a78bfa',
  },
  {
    icon: Package,
    title: 'Rental Availability',
    desc: 'Flexible robot rental programs with 24/7 support for events, demos, and business trials.',
    accent: '#7c3aed',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth Solutions',
    desc: 'Robots that drive customer engagement, increase foot traffic, and boost revenue.',
    accent: '#6d28d9',
  },
  {
    icon: Radio,
    title: 'Real-time Interaction',
    desc: 'Responsive AI with voice, gesture, and facial recognition for natural human-robot interaction.',
    accent: '#9333ea',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(123, 57, 252, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 57, 252, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Cpu size={16} className="text-primary-400" />
              <span className="text-xs font-cabin font-semibold text-primary-300 tracking-wider uppercase">Core Capabilities</span>
            </motion.div>

            <h2 className="font-instrument text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Powered by <span className="text-gradient">Innovation</span>
            </h2>
            <p className="text-lg text-gray-400 font-inter max-w-2xl mx-auto">
              Every RoboWorkz solution is built on cutting-edge technology designed to deliver exceptional results.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <motion.div
                className="relative group"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl overflow-hidden h-full">
                  {/* Background */}
                  <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-500" />
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.05] group-hover:border-primary-500/20 transition-all duration-500" />

                  {/* Animated neon line on top */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                      boxShadow: `0 0 10px ${feature.accent}40`,
                    }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute -top-12 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl"
                    style={{ background: `${feature.accent}15` }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with neon ring */}
                    <motion.div
                      className="relative w-16 h-16 mb-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${feature.accent}40, transparent 70%)`,
                        }}
                      />
                      <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-primary-500/20 transition-all duration-300 flex items-center justify-center">
                        <feature.icon 
                          size={28} 
                          className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300" 
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-manrope font-bold text-white text-xl mb-3 group-hover:text-primary-100 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm font-inter leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {feature.desc}
                    </p>

                    {/* Animated dot indicator */}
                    <motion.div
                      className="flex items-center gap-1.5 mt-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: feature.accent, boxShadow: `0 0 6px ${feature.accent}` }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${feature.accent}60, transparent)` }} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
