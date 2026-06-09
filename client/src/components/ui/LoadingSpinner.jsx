import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-900 z-[9999] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Logo Animation */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-primary-500 border-r-primary-300" />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary-400 border-l-primary-200"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Brand Text */}
          <motion.div
            className="text-2xl font-manrope font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white">Robo</span>
            <span className="text-primary-500">Workz</span>
          </motion.div>

          {/* Loading Bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '50%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-10 h-10 rounded-full border-2 border-transparent border-t-primary-500 border-r-primary-300"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;
