import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';
import BrandText from '../ui/BrandText';
import MagneticButton from '../ui/MagneticButton';
import AuthModal from '../ui/AuthModal';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Rentals', path: '/rentals' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 flex justify-center top-0 px-0 ${
          scrolled ? 'bg-[#050312]/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between w-full max-w-[1400px] px-6 lg:px-12 h-20">
            {/* Logo Link — Large, Premium */}
            <Link to="/" className="flex flex-col items-start group">
              <motion.div
                className="relative flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <BrandText size="nav" className="text-2xl sm:text-3xl md:text-4xl" />

                {/* Neon underline — matches loading screen glow bar */}
                <motion.div
                  className="absolute -bottom-1.5 left-0 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #8B5CF6, rgba(192, 132, 252, 0.6), rgba(139, 92, 246, 0.2), transparent)',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.2)',
                  }}
                  initial={{ width: '30%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
              {/* Subtitle */}
              <span
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '0.55rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  marginTop: '4px',
                  display: 'block',
                }}
              >
                Powered by Vijay InFc
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group"
                >
                  <motion.span
                    className={`relative z-10 block px-3 py-2 text-[15px] whitespace-nowrap font-manrope font-medium transition-all duration-300 rounded-lg
                      ${location.pathname === link.path 
                        ? 'text-primary-300' 
                        : 'text-gray-400 group-hover:text-white'
                      }
                    `}
                    whileHover={{ y: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {link.name}
                  </motion.span>

                  {/* Active indicator with gradient underline and glow */}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                      layoutId="activeUnderline"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      style={{
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.4)',
                      }}
                    />
                  )}

                  {/* Hover glow underline */}
                  {location.pathname !== link.path && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/70 to-transparent w-0 group-hover:w-full mx-auto transition-all duration-300 ease-out" 
                      style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)' }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated && (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    className="px-5 py-2 text-sm font-manrope font-semibold text-gray-300 hover:text-primary-300 transition-colors duration-300"
                  >
                    {isAdmin ? 'Dashboard' : 'My Account'}
                  </Link>
                  <motion.button
                    onClick={() => { logout(); navigate('/'); }}
                    className="px-5 py-2.5 text-sm font-manrope font-semibold text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-primary-500/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden relative z-50 p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </motion.button>
        </div>
      </motion.nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode={authModalMode} 
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu 
            key="mobile-menu"
            links={navLinks} 
            onClose={() => setMobileOpen(false)} 
            openAuthModal={openAuthModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
