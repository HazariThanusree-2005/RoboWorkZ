import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'events', label: 'Events' },
  { id: 'business', label: 'Business Solutions' },
];

const SERVICES_DATA = [
  {
    category: 'workshops',
    categoryTitle: 'Workshops & Education',
    categoryBadge: 'WORKSHOPS',
    id: 'interactive-workshops',
    titleMain: 'Interactive',
    titleHighlight: 'Workshops',
    description:
      'Empower students and teams with hands-on robotics training, engaging demonstrations, and future-ready tech workshops.',
    videoSrc: 'workshop-new.mp4',
    reverseLayout: false,
  },
  {
    category: 'events',
    categoryTitle: 'Event Entertainment & Robotics',
    categoryBadge: 'EVENTS',
    id: 'flower-shower-robot',
    titleMain: 'Flower Shower',
    titleHighlight: 'Robot',
    description:
      'Elevate your events with our beautiful and innovative flower shower robots, perfect for weddings, parties, and grand openings.',
    videoSrc: 'flower_new.mp4',
    reverseLayout: true,
  },
  {
    category: 'events',
    categoryTitle: 'Event Entertainment & Robotics',
    categoryBadge: 'EVENTS',
    id: 'interactive-robot-dog',
    titleMain: 'Interactive',
    titleHighlight: 'Robot Dog',
    description:
      'Engage audiences with our quadruped robot dog featuring autonomous navigation, dynamic stunts, and intelligent field interaction for events and showcases.',
    videoSrc: 'dog_vedio1.mp4',
    reverseLayout: false,
  },
  {
    category: 'business',
    categoryTitle: 'Commercial & Enterprise Automation',
    categoryBadge: 'BUSINESS SOLUTIONS',
    id: 'smart-business-solutions',
    titleMain: 'Smart Business',
    titleHighlight: 'Solutions',
    description:
      'Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.',
    videoSrc: 'services-business.mp4',
    reverseLayout: true,
  },
];

const ServicesSection = ({ hideHeader = false }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES_DATA.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  // Group items by category when showing all or selected section
  const groupedCategories = ['workshops', 'events', 'business'].filter((cat) =>
    activeCategory === 'all' ? true : activeCategory === cat
  );

  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#050312] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Heading */}
        {!hideHeader && (
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-400 font-inter max-w-xl mx-auto text-sm md:text-base">
              Explore our innovative robotic services structured across education, event showcases, and intelligent enterprise automation.
            </p>
          </div>
        )}

        {/* Futuristic Category Navigation Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 w-full max-w-[360px] sm:max-w-none mx-auto px-1 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative w-full sm:w-auto px-2 sm:px-6 py-2.5 rounded-full text-[10.5px] sm:text-xs md:text-sm font-orbitron tracking-wide sm:tracking-wider text-center whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-[0_0_25px_rgba(192,132,252,0.6)]'
                    : 'text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-purple-500/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="serviceTabActiveBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {cat.label.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Categorized Sections Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-24 md:space-y-32"
          >
            {groupedCategories.map((catKey) => {
              const categoryItems = filteredServices.filter((item) => item.category === catKey);
              if (categoryItems.length === 0) return null;

              const sectionSubtitle =
                catKey === 'workshops'
                  ? 'Hands-on training, technical education & live lab experiences'
                  : catKey === 'events'
                  ? 'Stunning robotics entertainment featuring Flower Shower & Robot Dog'
                  : 'Intelligent automation & customer engagement for enterprise';

              return (
                <div key={catKey} className="relative">
                  {/* Category Section Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-6 mb-12">
                    <div>
                      <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white">
                        {catKey === 'workshops' && 'Robotics Workshops'}
                        {catKey === 'events' && 'Event Robotics Showcase'}
                        {catKey === 'business' && 'Smart Business Solutions'}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm font-inter max-w-md">
                      {sectionSubtitle}
                    </p>
                  </div>

                  {/* Items inside this section */}
                  <div className="space-y-20 md:space-y-28">
                    {categoryItems.map((service, idx) => {
                      const isReverse = idx % 2 === 1;

                      return (
                        <div
                          key={service.id}
                          className={`flex flex-col ${
                            isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                          } gap-8 lg:gap-12 items-center`}
                        >
                          {/* Text Column */}
                          <div className="flex flex-col justify-center lg:w-[36%] w-full">
                            <motion.div
                              initial={{ opacity: 0, x: isReverse ? 30 : -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-80px' }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <span className="text-purple-400 text-xs font-orbitron tracking-widest uppercase mb-2 block">
                                #{idx + 1} — {service.categoryBadge}
                              </span>
                              <h4
                                className="font-bold leading-tight mb-4"
                                style={{
                                  fontFamily: '"Orbitron", sans-serif',
                                  fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
                                }}
                              >
                                <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
                                  {service.titleMain}
                                </span>
                                <br />
                                <span
                                  style={{
                                    color: '#C084FC',
                                    textShadow:
                                      '0 0 18px rgba(192,132,252,0.8), 0 0 40px rgba(139,92,246,0.5)',
                                  }}
                                >
                                  {service.titleHighlight}
                                </span>
                              </h4>

                              <p className="text-gray-300 text-sm md:text-base font-inter leading-relaxed max-w-sm mb-6">
                                {service.description}
                              </p>

                              {/* Neon accent bar */}
                              <div
                                className="h-[2px] w-16 rounded-full"
                                style={{
                                  background: 'linear-gradient(90deg, #C084FC, #7C3AED)',
                                  boxShadow: '0 0 10px rgba(139,92,246,0.7)',
                                }}
                              />
                            </motion.div>
                          </div>

                          {/* Video Column */}
                          <motion.div
                            className="lg:w-[64%] w-full"
                            initial={{ opacity: 0, x: isReverse ? -40 : 40, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div
                              className="relative w-full rounded-2xl sm:rounded-[36px] overflow-hidden isolate shadow-[0_0_35px_rgba(139,92,246,0.25)] hover:shadow-[0_0_55px_rgba(139,92,246,0.55)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer border border-purple-500/20"
                              style={{
                                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                transform: 'translateZ(0)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                              <video
                                src={`${import.meta.env.BASE_URL}${service.videoSrc}`}
                                className="w-full h-full object-cover rounded-2xl sm:rounded-[36px] max-h-[520px]"
                                style={{ display: 'block', width: '100%', height: 'auto' }}
                                autoPlay
                                loop
                                muted
                                playsInline
                              />
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default ServicesSection;
