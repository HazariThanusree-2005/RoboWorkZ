import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import TextType from '../ui/TextType';
import {
  CalendarDays, Lightbulb,
  Wrench, BrainCircuit, ArrowRight
} from 'lucide-react';

const serviceCards = [
  {
    icon: Lightbulb,
    title: 'Smart Business Solutions',
    desc: 'Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.',
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderGlow: 'rgba(245, 158, 11, 0.4)',
  },
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
];

const ServicesSection = ({ hideHeader = false }) => {
  return (
    <section id="services" className="section-padding relative overflow-hidden mt-20 md:mt-32">
      {/* Background neon accents */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative px-6 lg:px-8">
        {/* Header slides up from below */}
        {!hideHeader && (
          <ScrollReveal direction="up">
            <div className="text-left mb-16 md:mb-24">
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
                <TextType 
                  text="Our Services" 
                  typingSpeed={50} 
                  initialDelay={600}
                  startOnVisible={true} 
                  loop={false}
                  cursorClassName="text-primary-500"
                />
              </h2>
              <p className="text-lg text-gray-400 font-inter max-w-2xl">
                Comprehensive robotics solutions designed for every need — from business automation to immersive event experiences.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Thread Connected Timeline Cards */}
        <div className="relative pt-12 md:pt-16">
          {/* Main Horizontal Thread */}
          <div className="hidden lg:block absolute top-0 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {serviceCards.map((service, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 0.15}
                className="relative"
              >
                {/* Connection Thread & Dot */}
                <div className="hidden lg:flex flex-col items-center absolute -top-16 left-1/2 -translate-x-1/2 h-16 w-full">
                  {/* Glowing end dot */}
                  <div className="w-4 h-4 rounded-full bg-dark-900 border-2 border-primary-400 shadow-[0_0_15px_rgba(139,92,246,0.8)] -mt-[9px] relative z-10">
                    <div className="absolute inset-[3px] bg-primary-400 rounded-full" />
                  </div>
                  {/* Vertical drop line */}
                  <div className="w-[2px] flex-1 bg-gradient-to-b from-primary-500/60 to-transparent" />
                </div>

                {/* Straight Card */}
                <GlassCard
                  className="h-full relative overflow-hidden flex flex-col group p-8 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)] transition-all duration-500 border border-white/[0.08]"
                  hover={true}
                  glow={false}
                  tilt={false}
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
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:border-primary-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300">
                      <service.icon
                        size={26}
                        className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="font-manrope font-bold text-white text-xl mb-3 group-hover:text-primary-100 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm md:text-base font-inter leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                      {service.desc}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 mt-6 text-primary-400/80 text-sm font-manrope font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Learn More
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
