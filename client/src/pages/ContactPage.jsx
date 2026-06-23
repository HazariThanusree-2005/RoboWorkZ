import { motion } from 'framer-motion';
import ContactSection from '../components/sections/ContactSection';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const ContactPage = () => {
  return (
    <div className="pt-20">
      <section className="section-padding text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <motion.h1
            className="font-instrument text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 font-inter max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have a question or ready to get started? We'd love to hear from you.
          </motion.p>
          
          {/* Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: HiMail, title: 'Email', info: 'roboworkz.in@gmail.com', href: 'mailto:roboworkz.in@gmail.com' },
              { icon: HiPhone, title: 'Phone', info: '+91 93811 03776', href: 'tel:+919381103776' },
              { icon: HiLocationMarker, title: 'Location', info: 'Hyderabad, India', href: '#' },
            ].map(({ icon: Icon, title, info, href }) => (
              <a 
                key={title} 
                href={href} 
                className="glass rounded-xl p-6 text-center hover:border-primary-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(123,57,252,0.15)] cursor-pointer flex flex-col items-center justify-center w-full"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.3)] transition-all duration-300">
                  <Icon className="text-primary-400 group-hover:text-primary-300 transition-colors" size={22} />
                </div>
                <h3 className="font-manrope font-semibold text-white text-sm mb-1">{title}</h3>
                <p 
                  className="text-gray-400 font-inter break-words w-full px-1"
                  style={{ 
                    fontSize: title === 'Email' ? 'clamp(0.7rem, 2vw, 0.875rem)' : '0.875rem',
                    wordBreak: 'break-word'
                  }}
                >
                  {info}
                </p>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
      <ContactSection />
    </div>
  );
};

export default ContactPage;
