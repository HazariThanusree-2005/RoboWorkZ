import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import GlowButton from '../../components/ui/GlowButton';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { HiCheckCircle, HiCurrencyRupee, HiHeart, HiOutlineHeart, HiArrowLeft } from 'react-icons/hi';
import armRoboImg from '../../assets/arm-robo.png';
import roboDogImg from '../../assets/robo-dog.png';
import tableRoboImg from '../../assets/table-robo.png';
import roboCamImg from '../../assets/robocam.png';

const fallbackProducts = {
  'robocam': { 
    _id: 'robocam', 
    name: 'RoboCam', 
    description: 'RoboCam is a state-of-the-art smart camera assistant focused mainly on influencers, vlogger teams, and event filmmakers. By tracking movement natively and automating gimbal orientation, it provides seamless hands-free recording.', 
    features: ['AI Smart Tracking', 'Automated Camera Motion', 'Cinematic Video Capture', 'Smart Motion Recording', 'Creator-Friendly Setup', 'Smooth Content Creation'], 
    price: 89999, 
    rentalAvailable: true, 
    rentalPrice: 2500, 
    images: [{ url: roboCamImg }], 
    category: 'creative' 
  },
  'arm-robo': {
    _id: 'arm-robo',
    name: 'RoboArm',
    description: 'Advanced robotic arm solution designed for automation, training, demonstrations, industrial applications, and robotics education.',
    features: ['Precision movement', 'Industrial automation support', 'Educational demonstrations', 'Customizable applications'],
    price: 150000,
    rentalAvailable: true,
    rentalPrice: 5000,
    images: [{ url: armRoboImg }],
    category: 'industrial',
    status: 'active'
  },
  'robo-dog': {
    _id: 'robo-dog',
    name: 'DogRobo',
    description: 'Interactive robotic companion built for events, exhibitions, educational demonstrations, research projects, and customer engagement.',
    features: ['Interactive movement', 'Smart navigation', 'Event attraction', 'Educational robotics'],
    price: 250000,
    rentalAvailable: true,
    rentalPrice: 8000,
    images: [{ url: roboDogImg }],
    category: 'research',
    status: 'active'
  },
  'table-robo': {
    _id: 'table-robo',
    name: 'TableRobo',
    description: 'Smart service robot developed for hospitality, exhibitions, customer interaction, delivery assistance, and business automation.',
    features: ['Autonomous serving', 'Customer interaction', 'Event assistance', 'Smart business applications'],
    price: 180000,
    rentalAvailable: true,
    rentalPrice: 6000,
    images: [{ url: tableRoboImg }],
    category: 'industrial',
    status: 'active'
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated, toggleFavorite } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = user?.favorites?.includes(id);

  useEffect(() => {
    setProduct(fallbackProducts[id] || null);
    setLoading(false);
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-white pt-20">Product not found</div>;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-inter text-sm">
          <HiArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/30 to-dark-800 flex items-center justify-center p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {product.images?.length > 0 ? (
              <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(123,57,252,0.3)]" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div className="text-9xl opacity-20" animate={{ rotateY: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>🤖</motion.div>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-manrope font-semibold bg-primary-500/20 text-primary-400 rounded-full capitalize">{product.category}</span>
              {product.rentalAvailable && (
                <span className="px-3 py-1 text-xs font-manrope font-semibold bg-emerald-500/20 text-emerald-400 rounded-full">Rental Available</span>
              )}
            </div>

            <h1 className="font-space text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 font-inter text-lg leading-relaxed mb-8">{product.description}</p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-manrope font-semibold text-white text-lg mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features?.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300 font-inter">
                    <HiCheckCircle className="text-primary-400 flex-shrink-0" size={16} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="glass rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-1">Purchase Price</p>
                  <div className="flex items-center gap-1 text-white font-manrope font-bold text-2xl">
                    <HiCurrencyRupee size={24} />
                    {product.price?.toLocaleString('en-IN')}
                  </div>
                </div>
                {product.rentalAvailable && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-inter mb-1">Rental Price</p>
                    <div className="text-primary-400 font-manrope font-bold text-lg">
                      ₹{product.rentalPrice?.toLocaleString('en-IN')}/day
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="flex-1">
                <GlowButton variant="primary" className="w-full">Book a Demo</GlowButton>
              </Link>
              {product.rentalAvailable && (
                <Link to="/contact" className="flex-1">
                  <GlowButton variant="outline" className="w-full">Rent Now</GlowButton>
                </Link>
              )}
              {isAuthenticated && (
                <motion.button
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 ${isFavorite ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400'}`}
                  onClick={() => toggleFavorite(id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFavorite ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
