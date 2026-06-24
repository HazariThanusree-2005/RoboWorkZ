import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiChip, HiX } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticButton from '../ui/MagneticButton';
import { ImageAutoSlider } from '../ui/image-auto-slider';

import armRobo from '../../assets/arm-robo.png';
import roboDog from '../../assets/robo-dog.png';
import tableRobo from '../../assets/table-robo.png';

export const products = [
  {
    id: 'arm-robo',
    title: 'Industrial Automation Arm',
    image: armRobo,
    tag: 'Automation',
    tagline: 'High-precision robotic arm designed for automation, manufacturing support, engineering demonstrations, research projects, and robotics training.',
  },
  {
    id: 'robo-dog',
    title: 'Portable Quadruped Robot',
    image: roboDog,
    tag: 'Mobility',
    tagline: 'Advanced robotic dog platform built for research, educational demonstrations, autonomous navigation, smart mobility, and interactive robotics applications.',
  },
  {
    id: 'table-robo',
    title: 'Smart Service Assistant',
    image: tableRobo,
    tag: 'AI Service',
    tagline: 'Intelligent service robot developed for customer interaction, exhibitions, hospitality support, smart delivery assistance, and business automation.',
  },
];

/* ─── Expanded Modal (rendered via Portal to escape section stacking) ─── */
const ProductModal = ({ product, onClose }) => createPortal(
  <AnimatePresence>
    {product && (
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div
          className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,8,35,0.98) 0%, rgba(10,5,25,0.99) 100%)',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 0 1px rgba(139,92,246,0.12), 0 30px 80px rgba(0,0,0,0.7), 0 0 120px rgba(139,92,246,0.12)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <HiX size={16} />
            </button>

            {/* Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-manrope font-semibold tracking-wider"
                style={{
                  background: 'rgba(139,92,246,0.2)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#C084FC',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <HiChip size={11} />
                {product.tag}
              </span>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: '320px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.25) 0%, transparent 65%)',
                }}
              />
              <motion.img
                src={product.image}
                alt={product.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '24px',
                }}
              />
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }} />

            {/* Content */}
            <div className="p-6">
              <h3 className="font-space text-2xl font-bold text-white mb-3">{product.title}</h3>
              <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6">{product.tagline}</p>
              <div className="flex items-center gap-3">
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="btn-primary px-6 py-2.5 text-sm"
                >
                  <span>View Details</span>
                  <HiArrowRight size={14} />
                </Link>
                <Link
                  to="/rentals"
                  onClick={onClose}
                  className="btn-outline px-6 py-2.5 text-sm"
                >
                  <span>Rent It</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>,
  document.body
);

/* ─── Card inner content (compact for stack) ─── */
const ProductCardContent = ({ product, onClick }) => (
  <div className="flex flex-col h-full cursor-pointer" onClick={onClick}>
    {/* Image area */}
    <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '230px' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />
      {/* Tag badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-manrope font-semibold tracking-wider"
          style={{
            background: 'rgba(139,92,246,0.18)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#C084FC',
            backdropFilter: 'blur(8px)',
          }}
        >
          <HiChip size={10} />
          {product.tag}
        </span>
      </div>
      {/* Tap hint */}
      <div className="absolute bottom-3 right-3 z-10 opacity-60">
        <span className="text-[9px] text-primary-300 font-manrope tracking-wider">TAP TO EXPAND</span>
      </div>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block' }}
      />
    </div>

    {/* Divider */}
    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

    {/* Text */}
    <div className="flex flex-col flex-1 p-5">
      <h3 className="font-space font-bold text-white mb-2" style={{ fontSize: '1rem', lineHeight: '1.3' }}>
        {product.title}
      </h3>
      <p className="text-gray-400 font-inter leading-relaxed flex-1 mb-4" style={{ fontSize: '0.78rem' }}>
        {product.tagline}
      </p>
      <span className="inline-flex items-center gap-1.5 font-manrope font-semibold text-primary-400" style={{ fontSize: '0.8rem' }}>
        Learn More <HiArrowRight size={13} />
      </span>
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const CARD_W = 320;
  const CARD_H = 410;

  return (
    <section id="featured-products" className="section-padding relative overflow-visible">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* LEFT: Heading + bullets + CTA */}
          <motion.div
            className="flex flex-col items-start text-left w-full lg:w-[45%]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollReveal direction="up">
              <SectionHeading
                title="Featured Products"
                subtitle="Real robots we've built — designed for research, automation, and innovation."
                align="left"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <ul className="mt-6 space-y-3">
                {[
                  'Precision engineering for real-world use',
                  'Available for purchase & rental',
                  'Custom builds & research partnerships',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 font-inter text-sm">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <MagneticButton>
                  <Link
                    to="/products"
                    className="btn-primary"
                  >
                    <span>View All Products</span>
                    <HiArrowRight size={15} />
                  </Link>
                </MagneticButton>
                <Link
                  to="/rentals"
                  className="btn-outline"
                >
                  <span>Rent a Robot</span>
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* RIGHT: Slider stack */}
          <motion.div
            className="w-full lg:w-[55%] flex items-center justify-center overflow-hidden py-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <ImageAutoSlider duration="25s">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 w-[280px] sm:w-[320px] h-[410px] bg-[#0e0e11] border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <ProductCardContent
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </ImageAutoSlider>
          </motion.div>

        </div>
      </div>

      {/* Expanded modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};

export default FeaturedProducts;
