import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, align = 'center', light = false }) => {
  return (
    <motion.div
<<<<<<< HEAD
      className={`mb-10 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
=======
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-block mb-4"
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full" style={{ width: '60px' }} />
      </motion.div>

      <h2 className={`font-space text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-inter leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
