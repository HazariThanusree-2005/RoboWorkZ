import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { Bot, Cpu, Zap } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import BrandText from '../ui/BrandText';

const highlights = [
  { icon: Bot, label: 'Smart Robots', desc: 'AI-driven robots for real-world interactions' },
  { icon: Cpu, label: 'Custom Solutions', desc: 'Tailored robotics for your unique needs' },
  { icon: Zap, label: 'Innovation', desc: 'Cutting-edge tech pushing boundaries' },
];

const AboutPreview = () => {
  return (
    <section id="about-preview" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative text-center">
        <ScrollReveal>
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Bot size={16} className="text-primary-400" />
            <span className="text-xs font-manrope font-semibold text-primary-300 tracking-wider uppercase">Who We Are</span>
          </motion.div>

          <h2 className="font-space text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            About <BrandText className="text-4xl md:text-5xl" />
          </h2>

          <p className="text-gray-300 font-inter text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            India's next generation robotics startup — designing intelligent robots for businesses, events, education, and automation.
          </p>
        </ScrollReveal>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.1}>
              <motion.div
                className="relative group p-6 rounded-xl"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-px rounded-xl bg-dark-900/90" />

                <div className="relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.3)] transition-all duration-300">
                    <item.icon size={22} className="text-primary-400" />
                  </div>
                  <h4 className="font-manrope font-bold text-white text-base mb-1">{item.label}</h4>
                  <p className="text-gray-500 text-sm font-inter">{item.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-manrope font-semibold text-white border border-primary-500/40 rounded-xl transition-all duration-300 hover:bg-primary-500 hover:border-primary-500 hover:shadow-[0_0_25px_rgba(123,57,252,0.4)] group"
          >
            Learn More About Us
            <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutPreview;
