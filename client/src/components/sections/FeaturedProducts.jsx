import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';

import armRobo from '../../assets/arm-robo.png';
import roboDog from '../../assets/robo-dog.png';
import tableRobo from '../../assets/table-robo.png';

const products = [
  {
    id: 'arm-robo',
    title: 'Industrial Automation Arm',
    image: armRobo,
    tagline: 'High-precision robotic arm designed for automation, manufacturing support, engineering demonstrations, research projects, and robotics training.',
  },
  {
    id: 'robo-dog',
    title: 'Portable Quadruped Robot',
    image: roboDog,
    tagline: 'Advanced robotic dog platform built for research, educational demonstrations, autonomous navigation, smart mobility, and interactive robotics applications.',
  },
  {
    id: 'table-robo',
    title: 'Smart Service Assistant',
    image: tableRobo,
    tagline: 'Intelligent service robot developed for customer interaction, exhibitions, hospitality support, smart delivery assistance, and business automation.',
  },
];

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="section-padding relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative px-4 md:px-8">
        <SectionHeading
          title="Featured Products"
          subtitle="Real robots we've built — designed for research, automation, and innovation."
        />

        {/* Simple Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <GlassCard
              key={product.id}
              className="p-0 h-full flex flex-col overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(123,57,252,0.12)] transition-all duration-500"
              hover={true}
              glow={true}
              tilt={true}
            >
              {/* Product Image Container */}
              <div className="relative w-full bg-gradient-to-br from-primary-900/30 to-dark-800 overflow-hidden border-b border-white/[0.05]">
                {/* Purple glow on hover */}
                <div className="absolute inset-0 bg-primary-500/10 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '320px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  className="p-6 transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-space text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                  {product.title}
                </h3>

                <p className="text-gray-400 font-inter text-sm leading-relaxed flex-1 mb-5">
                  {product.tagline}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex items-center gap-2 text-sm font-manrope font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300 group/btn"
                >
                  Learn More
                  <HiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* View All Products CTA */}
        <ScrollReveal>
          <div className="text-center mt-12">
            <MagneticButton>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-manrope font-semibold text-white bg-primary-500 rounded-xl transition-all duration-300 hover:bg-primary-600 hover:shadow-[0_0_25px_rgba(123,57,252,0.4)]"
              >
                View All Products
                <HiArrowRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedProducts;
