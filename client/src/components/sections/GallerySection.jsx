import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import { HiX } from 'react-icons/hi';

const galleryItems = [
  { id: 1, title: 'Business Robot Demo', category: 'business', span: 'col-span-2 row-span-2' },
  { id: 2, title: 'Event Interaction', category: 'events', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Student Workshop', category: 'students', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Exhibition Showcase', category: 'events', span: 'col-span-1 row-span-2' },
  { id: 5, title: 'Robot Assembly', category: 'business', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'College Demo', category: 'students', span: 'col-span-2 row-span-1' },
];

const gradients = [
  'from-violet-600/40 to-indigo-800/40',
  'from-cyan-600/40 to-blue-800/40',
  'from-emerald-600/40 to-teal-800/40',
  'from-amber-600/40 to-orange-800/40',
  'from-pink-600/40 to-rose-800/40',
  'from-fuchsia-600/40 to-purple-800/40',
];

const filters = ['All', 'Business', 'Events', 'Students'];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading 
          title="Gallery & Showcase" 
          subtitle="A glimpse into the world of RoboWorkz — from events to exhibitions, see our robots in action."
        />

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`px-5 py-2 text-sm font-cabin font-semibold rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4"
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${item.span} relative rounded-2xl overflow-hidden cursor-pointer group`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Gradient Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
                
                {/* Robot emoji as placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transform duration-500">
                    🤖
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h4 className="font-manrope font-semibold text-white text-sm">
                    {item.title}
                  </h4>
                  <span className="text-xs text-primary-300 font-cabin capitalize">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full glass rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                <HiX size={24} />
              </button>
              
              <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${gradients[selectedItem.id % gradients.length]} mb-6 flex items-center justify-center`}>
                <span className="text-8xl opacity-40">🤖</span>
              </div>
              
              <h3 className="font-manrope font-bold text-white text-2xl mb-2">{selectedItem.title}</h3>
              <span className="text-primary-400 font-cabin capitalize">{selectedItem.category}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
