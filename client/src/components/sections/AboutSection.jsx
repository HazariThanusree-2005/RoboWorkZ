import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import { 
  Bot, Cpu, Zap, Users, Rocket, Settings, 
  Target, Shield, Globe 
} from 'lucide-react';

const highlights = [
  { icon: Bot, label: 'Smart Robots', desc: 'AI-driven robots for real-world interactions' },
  { icon: Cpu, label: 'Custom Solutions', desc: 'Tailored robotics for your unique needs' },
  { icon: Zap, label: 'Innovation', desc: 'Cutting-edge tech pushing boundaries' },
];

const focusAreas = [
  { icon: Target, title: 'Business Attraction Robots', desc: 'AI-powered robots that engage customers and drive foot traffic to your business.' },
  { icon: Users, title: 'Event & Function Robots', desc: 'Interactive robots for events, exhibitions, weddings, and corporate functions.' },
  { icon: Settings, title: 'Robot Rental Services', desc: 'Rent cutting-edge robots for short-term engagements and special occasions.' },
  { icon: Rocket, title: 'Student Robotics Projects', desc: 'Empowering the next generation with hands-on robotics learning and innovation.' },
  { icon: Globe, title: 'AI Interactive Robots', desc: 'Conversational AI robots that adapt and respond to human interactions.' },
  { icon: Shield, title: 'Automation Systems', desc: 'Building the infrastructure for tomorrow\'s automated world.' },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Bot size={16} className="text-primary-400" />
              <span className="text-xs font-manrope font-semibold text-primary-300 tracking-wider uppercase">Who We Are</span>
            </motion.div>

            <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About <span className="text-gradient">RoboWorkz</span>
            </h2>
            <p className="text-lg md:text-xl text-primary-300/70 font-inter max-w-2xl mx-auto">
              Building futuristic robotic solutions for businesses and daily life.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left - About Text */}
          <ScrollReveal direction="left">
            <div>
              <p className="text-gray-300 font-inter text-lg leading-relaxed mb-6">
                RoboWorkz creates intelligent robotic products and automation solutions for businesses, 
                events, and domestic usage. We design and develop robots that help small businesses attract 
                customers, improve engagement, automate tasks, and create futuristic experiences.
              </p>

              <p className="text-gray-400 font-inter text-base leading-relaxed mb-6">
                We also provide robot rental services based on business requirements, events, exhibitions, 
                family functions, and commercial activities.
              </p>

              <p className="text-gray-400 font-inter text-base leading-relaxed mb-10">
                Our mission is to help businesses grow through innovative robotics, smart automation, 
                and futuristic product experiences.
              </p>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    {/* Glowing border card */}
                    <div className="relative p-4 rounded-xl overflow-hidden">
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/20 via-transparent to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-px rounded-xl bg-dark-900/90" />
                      
                      {/* Glow on hover */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-full blur-2xl transition-all duration-700" />
                      
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-3 group-hover:bg-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.3)] transition-all duration-300">
                          <item.icon size={20} className="text-primary-400" />
                        </div>
                        <h4 className="font-manrope font-bold text-white text-sm mb-1">{item.label}</h4>
                        <p className="text-gray-500 text-xs font-inter">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Focus Area Cards with Glowing Borders */}
          <div className="grid grid-cols-2 gap-4">
            {focusAreas.map((item, index) => (
              <ScrollReveal key={item.title} direction="right" staggerIndex={index}>
                <GlassCard
                  className="p-5 overflow-hidden group"
                  hover={true}
                  glow={false}
                  tilt={true}
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-3 group-hover:bg-primary-500/15 group-hover:shadow-[0_0_12px_rgba(123,57,252,0.25)] transition-all duration-300">
                      <item.icon size={20} className="text-primary-400 group-hover:text-primary-300 transition-colors" />
                    </div>
                    <h3 className="font-manrope font-semibold text-white text-sm mb-1.5 group-hover:text-primary-200 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-inter leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-primary-500/5 to-primary-500/20" />
            <div className="absolute inset-px rounded-2xl bg-dark-900/95" />
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
              {[
                { value: '50+', label: 'Robotics Projects' },
                { value: '100+', label: 'Event Engagements' },
                { value: '24/7', label: 'Support Available' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="text-3xl md:text-4xl font-manrope font-extrabold text-white mb-1"
                    style={{ textShadow: '0 0 20px rgba(123, 57, 252, 0.3)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-inter">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
