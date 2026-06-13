import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScrollReveal from '../components/ui/ScrollReveal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { HiEye, HiCurrencyRupee, HiCheckCircle, HiSearch, HiFilter, HiExternalLink } from 'react-icons/hi';
import armRoboImg from '../assets/arm-robo.png';
import roboDogImg from '../assets/robo-dog.png';
import tableRoboImg from '../assets/table-robo.png';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'healthcare', label: 'Healthcare & Rehab' },
  { value: 'research', label: 'Research & Development' },
  { value: 'industrial', label: 'Industrial Automation' },
];

const fallbackProducts = [
  {
    _id: 'arm-robo',
    name: 'Industrial Automation Arm',
    description: 'High-precision robotic arm designed for automation, manufacturing support, engineering demonstrations, research projects, and robotics training.',
    features: ['Precision movement', 'Industrial automation support', 'Educational demonstrations', 'Customizable applications'],
    price: 150000,
    rentalAvailable: true,
    rentalPrice: 5000,
    images: [{ url: armRoboImg }],
    category: 'industrial',
    status: 'active'
  },
  {
    _id: 'robo-dog',
    name: 'Portable Quadruped Robot',
    description: 'Advanced robotic dog platform built for research, educational demonstrations, autonomous navigation, smart mobility, and interactive robotics applications.',
    features: ['Interactive movement', 'Smart navigation', 'Event attraction', 'Educational robotics'],
    price: 250000,
    rentalAvailable: true,
    rentalPrice: 8000,
    images: [{ url: roboDogImg }],
    category: 'research',
    status: 'active'
  },
  {
    _id: 'table-robo',
    name: 'Smart Service Assistant',
    description: 'Intelligent service robot developed for customer interaction, exhibitions, hospitality support, smart delivery assistance, and business automation.',
    features: ['Autonomous serving', 'Customer interaction', 'Event assistance', 'Smart business applications'],
    price: 180000,
    rentalAvailable: true,
    rentalPrice: 6000,
    images: [{ url: tableRoboImg }],
    category: 'industrial',
    status: 'active'
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {

    setProducts(fallbackProducts);
    setLoading(false);
  }, [search, category]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="pt-16 md:pt-24 pb-8 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <motion.h1
            className="font-space text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our <span className="text-gradient">Products</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 font-inter max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our full lineup of cutting-edge robots designed for every purpose.
          </motion.p>

          {/* Search & Filter */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search robots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 font-inter text-sm focus:outline-none focus:border-primary-500/50 transition-all"
              />
            </div>
            <div className="relative">
              <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-48 px-5 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value} className="bg-dark-800">{c.label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-inter text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const externalUrl = product._id === 'robocam' ? 'https://robocam.vercel.app/' : `/products/${product._id}`;
                const isExternal = product._id === 'robocam';

                return (
                <ScrollReveal key={product._id} delay={index * 0.08}>
                  <motion.div
                    className="glass rounded-2xl overflow-hidden group h-full flex flex-col cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => {
                      if (isExternal) {
                        window.open(externalUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <div className="relative h-52 bg-gradient-to-br from-primary-900/30 to-dark-800 overflow-hidden">
                      {product.images?.length > 0 ? (
                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div className="text-7xl opacity-20" animate={{ rotateY: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>🤖</motion.div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-manrope font-semibold bg-primary-500/80 backdrop-blur-sm text-white rounded-full capitalize">{product.category}</span>
                      </div>
                      {product.rentalAvailable && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 text-xs font-manrope font-semibold bg-emerald-500/80 backdrop-blur-sm text-white rounded-full">Rental</span>
                        </div>
                      )}
                      {/* External link indicator */}
                      {isExternal && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-500">
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500/90 backdrop-blur-sm text-white font-manrope font-semibold text-sm shadow-[0_0_20px_rgba(123,57,252,0.5)]"
                            initial={false}
                          >
                            <HiExternalLink size={16} /> Visit RoboCam
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-manrope font-bold text-white text-xl mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm font-inter leading-relaxed mb-4 flex-1">{product.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.features?.slice(0, 3).map(f => (
                          <span key={f} className="flex items-center gap-1 text-xs text-primary-300 bg-primary-500/10 px-2 py-1 rounded-md">
                            <HiCheckCircle size={12} />{f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-white font-manrope font-bold">
                          <HiCurrencyRupee size={18} />
                          <span className="text-lg">{product.price?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      {isExternal ? (
                        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block" onClick={(e) => e.stopPropagation()}>
                          <motion.button className="w-full py-2.5 text-sm font-manrope font-semibold text-primary-400 border border-primary-500/30 rounded-xl hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center gap-2" whileHover={{ borderColor: 'rgba(123, 57, 252, 0.6)' }}>
                            <HiExternalLink size={16} />Explore RoboCam
                          </motion.button>
                        </a>
                      ) : (
                        <Link to={`/products/${product._id}`} className="block">
                          <motion.button className="w-full py-2.5 text-sm font-manrope font-semibold text-primary-400 border border-primary-500/30 rounded-xl hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center gap-2" whileHover={{ borderColor: 'rgba(123, 57, 252, 0.6)' }}>
                            <HiEye size={16} />View Details
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
