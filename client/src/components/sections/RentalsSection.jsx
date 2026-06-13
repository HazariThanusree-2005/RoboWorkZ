import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar, HiTruck, HiClock } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import BrandText from '../ui/BrandText';

const RentalPerks = [
  {
    icon: HiCalendar,
    title: 'Flexible Plans',
    desc: 'Daily, weekly, or event-based rental options customized to your requirements.',
    color: 'from-violet-500/20 to-purple-600/20',
    borderGlow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    icon: HiTruck,
    title: 'Turnkey Delivery',
    desc: 'Complete logistics, on-site installation, calibration, and support.',
    color: 'from-blue-500/20 to-cyan-600/20',
    borderGlow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: HiClock,
    title: '24/7 Expert Backup',
    desc: 'End-to-end operational support and on-site engineering backup.',
    color: 'from-emerald-500/20 to-teal-600/20',
    borderGlow: 'rgba(16, 185, 129, 0.3)',
  },
];

const RentalsSection = () => {
  return (
    <section id="rentals-preview" className="section-padding relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-600/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative px-6 md:px-8">
        <SectionHeading
          title="Robot Rentals"
          subtitle={<>Bring cutting-edge automation to your events, exhibitions, or business promotions with <BrandText className="text-base font-normal leading-none" />.</>}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
                <HiTruck size={16} className="text-primary-400" />
                <span className="text-xs font-manrope font-semibold text-primary-300 tracking-wider uppercase">On-Demand Deployment</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="font-space text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Bring Tomorrow's Tech to <span className="text-gradient">Your Event</span>
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-300 font-inter text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Create unforgettable experiences and massive engagement at your next exhibition, corporate meet, or campaign. We offer short-term rentals of advanced quadruped robot dogs, interactive AI bots, and custom robotic arms.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <MagneticButton>
                <Link
                  to="/rentals"
                  className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-manrope font-semibold text-white bg-primary-500 rounded-xl transition-all duration-300 hover:bg-primary-600 hover:shadow-[0_0_25px_rgba(123,57,252,0.4)] group"
                >
                  Explore Rental Fleet
                  <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Right Column: Perks Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {RentalPerks.map((perk, index) => (
              <ScrollReveal key={perk.title} delay={index * 0.15}>
                <GlassCard
                  className="relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 group hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(123,57,252,0.1)] transition-all duration-500"
                  hover={true}
                  glow={false}
                  tilt={false}
                >
                  {/* Hover background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${perk.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-dark-900/95 group-hover:bg-dark-900/85 transition-colors duration-300" />

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.2)] transition-all duration-300">
                    <perk.icon className="text-primary-400 group-hover:text-primary-300 transition-colors" size={24} />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 text-left flex-1">
                    <h4 className="font-manrope font-bold text-white text-lg mb-1 group-hover:text-primary-100 transition-colors">
                      {perk.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-inter leading-relaxed">
                      {perk.desc}
                    </p>
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

export default RentalsSection;
