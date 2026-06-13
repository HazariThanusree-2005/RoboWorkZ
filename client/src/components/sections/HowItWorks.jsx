import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import { HiCursorClick, HiCalendar, HiTruck } from 'react-icons/hi';

const steps = [
  {
    icon: HiCursorClick,
    step: '01',
    title: 'Choose Robot / Service',
    desc: 'Browse our collection of robots and services. Select the perfect solution for your business, event, or project needs.',
  },
  {
    icon: HiCalendar,
    step: '02',
    title: 'Book Demo or Rental',
    desc: 'Schedule a live demo or book a rental through our simple booking system. Choose your dates and preferences.',
  },
  {
    icon: HiTruck,
    step: '03',
    title: 'RoboWorkZ Delivers & Supports',
    desc: 'Our expert team delivers, sets up, and provides full support throughout your event or rental period.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading 
          title="How It Works" 
          subtitle="Getting started with RoboWorkZ is simple. Three easy steps to bring robotics to your doorstep."
        />

        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.66%] right-[16.66%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500/50 via-primary-500 to-primary-500/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.2}>
                <div className="text-center relative">
                  {/* Step Number Circle */}
                  <motion.div
                    className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-dark-700 border-2 border-primary-500/30 flex items-center justify-center"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(123, 57, 252, 0.8)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-glow-pulse" />
                    <step.icon className="text-primary-400 relative z-10" size={28} />
                  </motion.div>

                  {/* Step Label */}
                  <span className="inline-block text-xs font-cabin font-bold text-primary-400 tracking-widest uppercase mb-3">
                    Step {step.step}
                  </span>

                  <h3 className="font-manrope font-bold text-white text-xl mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-sm font-inter leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
