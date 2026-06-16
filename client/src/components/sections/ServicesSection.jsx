import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import {
  Megaphone, CalendarDays, Package, Lightbulb,
  Wrench, BrainCircuit, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: BrainCircuit,
    title: 'Robotics Workshops',
    desc: 'Build, program, and experience real robots through hands-on workshops designed for schools, colleges, and future innovators.',
    gradient: 'from-violet-500/20 to-purple-600/20',
    borderGlow: 'rgba(139, 92, 246, 0.4)',
  },
  {
    icon: CalendarDays,
    title: 'Event Robotics',
    desc: 'Create unforgettable experiences with interactive robots for exhibitions, corporate events, weddings, and public showcases.',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    borderGlow: 'rgba(59, 130, 246, 0.4)',
  },
  {
    icon: Wrench,
    title: 'Industrial Automation',
    desc: 'Increase efficiency and productivity through smart robotic systems, automation solutions, and custom engineering support.',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    borderGlow: 'rgba(16, 185, 129, 0.4)',
  },
  {
    icon: Lightbulb,
    title: 'Smart Business Solutions',
    desc: 'Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.',
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderGlow: 'rgba(245, 158, 11, 0.4)',
  },
];

const ServicesSection = ({ hideHeader = false }) => {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background neon accents */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header slides up from below */}
        {!hideHeader && (
          <ScrollReveal direction="up">
            <div className="text-center mb-10 md:mb-16">
              <motion.div
                className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Wrench size={16} className="text-primary-400" />
                <span className="text-xs font-manrope font-semibold text-primary-300 tracking-wider uppercase">What We Offer</span>
              </motion.div>

              <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Our <span className="text-gradient">Services</span>
              </h2>
              <p className="text-lg text-gray-400 font-inter max-w-2xl mx-auto">
                Comprehensive robotics solutions designed for every need — from business automation to immersive event experiences.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Cards: alternating left / right entrance with parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mx-auto">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              staggerIndex={index}
              delay={0}
              parallax={true}
              parallaxDirection={index % 2 === 0 ? 'left' : 'right'}
              parallaxAmount={8}
            >
              <GlassCard
                className="h-full relative overflow-hidden flex flex-col group p-8 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500"
                hover={true}
                glow={false}
                tilt={true}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-dark-900/95 group-hover:bg-dark-900/85 transition-colors duration-300" />

                {/* Neon glow corner */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl pointer-events-none"
                  style={{ background: service.borderGlow }}
                />

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-primary-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon
                      size={26}
                      className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <h3 className="font-manrope font-bold text-white text-lg mb-3 group-hover:text-primary-100 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm font-inter leading-relaxed flex-1 group-hover:text-gray-400 transition-colors duration-300">
                    {service.desc}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    className="flex items-center gap-2 mt-5 text-primary-400/60 text-sm font-manrope font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  >
                    Learn More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
