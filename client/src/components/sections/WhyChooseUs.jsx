import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { HiLightningBolt, HiStar, HiClock, HiChip } from 'react-icons/hi';

const stats = [
  { icon: HiLightningBolt, value: 50, suffix: '+', label: 'Robotics Projects', color: 'from-violet-500 to-purple-600' },
  { icon: HiStar, value: 100, suffix: '+', label: 'Event Engagements', color: 'from-blue-500 to-cyan-600' },
  { icon: HiClock, value: 24, suffix: '/7', label: 'Support Available', color: 'from-emerald-500 to-teal-600' },
  { icon: HiChip, value: 100, suffix: '%', label: 'AI-Powered Experiences', color: 'from-amber-500 to-orange-600' },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading 
          title="Why Choose RoboWorkz" 
          subtitle="We don't just build robots — we create experiences that leave lasting impressions."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                className="glass rounded-2xl p-6 md:p-8 text-center group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="text-white" size={24} />
                </motion.div>

                {/* Counter */}
                <div className="text-3xl md:text-4xl font-manrope font-extrabold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm font-inter">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
