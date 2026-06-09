import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import { HiUser, HiMail, HiPhone, HiChat, HiPaperAirplane, HiCheckCircle } from 'react-icons/hi';

const serviceOptions = [
  'Robotics for Business',
  'Event & Function Robots',
  'Robot Rental',
  'Student Project Development',
  'AI Interactive Robots',
  'Exhibition & Demo Robots',
  'Custom Solution',
  'General Inquiry',
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/inquiries', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-5 py-3.5 input-glow rounded-xl text-white placeholder-gray-500 font-inter text-sm";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Ready to bring robotics to your business or event? Let's talk about how we can help."
        />

        <ScrollReveal>
          <GlassCard className="p-8 md:p-10 lg:p-12" hover={false} glow={true} tilt={false}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Direct Contacts */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-space text-2xl font-bold text-white mb-4">
                    Direct <span className="text-gradient">Channels</span>
                  </h3>
                  <p className="text-gray-400 font-inter text-sm mb-8 leading-relaxed">
                    Have an urgent deployment, operational inquiry, or custom request? Connect with our team directly.
                  </p>

                  <div className="space-y-4">
                    {/* Email Link */}
                    <a 
                      href="mailto:startupoperations.team@gmail.com" 
                      className="flex items-center gap-3 sm:gap-4 group p-3 sm:p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-primary-500/[0.03] hover:border-primary-500/25 transition-all duration-300 w-full hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(123,57,252,0.15)] cursor-pointer"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.3)] transition-all duration-300">
                        <HiMail className="text-primary-400 group-hover:text-primary-300" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 font-manrope font-semibold uppercase tracking-wider mb-0.5">Email Us</div>
                        <div className="text-[11px] sm:text-sm font-inter text-white font-medium group-hover:text-primary-300 transition-colors break-words" style={{ wordBreak: 'break-word' }}>
                          startupoperations.team@gmail.com
                        </div>
                      </div>
                    </a>

                    {/* Phone Link */}
                    <a 
                      href="tel:+919345XXXXXX" 
                      className="flex items-center gap-3 sm:gap-4 group p-3 sm:p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-primary-500/[0.03] hover:border-primary-500/25 transition-all duration-300 w-full hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(123,57,252,0.15)] cursor-pointer"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 group-hover:shadow-[0_0_15px_rgba(123,57,252,0.3)] transition-all duration-300">
                        <HiPhone className="text-primary-400 group-hover:text-primary-300" size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 font-manrope font-semibold uppercase tracking-wider mb-0.5">Call Directly</div>
                        <div className="text-sm font-inter text-white font-medium group-hover:text-primary-300 transition-colors">
                          +91 9345XXXXXX
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 hidden lg:block">
                  <div className="text-xs text-gray-500 font-manrope">
                    OPERATIONAL HOURS
                  </div>
                  <div className="text-xs text-gray-400 font-inter mt-1">
                    Monday — Saturday: 9:00 AM - 7:00 PM IST
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
                {success ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <HiCheckCircle className="mx-auto text-emerald-400 mb-4" size={64} />
                    <h3 className="font-manrope font-bold text-white text-2xl mb-2">Message Sent!</h3>
                    <p className="text-gray-400 font-inter">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="relative">
                        <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`${inputClasses} pl-12`}
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`${inputClasses} pl-12`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div className="relative">
                        <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${inputClasses} pl-12`}
                        />
                      </div>

                      {/* Service */}
                      <div className="relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled className="bg-dark-800">Select Service Required</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-dark-800">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <HiChat className="absolute left-4 top-4 text-gray-500" size={18} />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`${inputClasses} pl-12 resize-none`}
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm font-inter">{error}</p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary-500 text-white font-manrope font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                      whileHover={{ y: -2, scale: 1.01, boxShadow: '0 0 25px rgba(123, 57, 252, 0.5)' }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {loading ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : (
                        <>
                          <HiPaperAirplane className="rotate-90" size={20} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
