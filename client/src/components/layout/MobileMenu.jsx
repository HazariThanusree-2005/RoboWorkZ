import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileMenu = ({ links, onClose, openAuthModal }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { x: 40, opacity: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl flex flex-col justify-center"
      initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
      animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
      exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      
      <motion.div 
        className="px-8 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {links.map((link) => (
          <motion.div key={link.name} variants={itemVariants}>
            <Link
              to={link.path}
              onClick={onClose}
              className={`block py-4 text-3xl font-space transition-colors duration-300 
                ${location.pathname === link.path 
                  ? 'text-primary-400' 
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="ml-3 inline-block w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </Link>
          </motion.div>
        ))}

        {/* Divider */}
        <motion.div variants={itemVariants} className="pt-6">
          <div className="h-px bg-white/10 w-full" />
        </motion.div>

        {/* Auth Buttons */}
        <motion.div variants={itemVariants} className="pt-4 flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                onClick={onClose}
                className="w-full py-3 text-center text-lg font-manrope font-semibold text-white bg-primary-500 rounded-xl"
              >
                {isAdmin ? 'Admin Dashboard' : 'My Account'}
              </Link>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full py-3 text-center text-lg font-manrope font-semibold text-gray-400 border border-white/10 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { onClose(); openAuthModal('signup'); }}
                className="w-full py-3 text-center text-lg font-manrope font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
