import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Rentals', path: '/rentals' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Inline SVG gear symbol for the OZ logo mark — matches loading screen gear
const GearSymbol = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Gear teeth ring */}
    <path
      d="M50 8 L55 2 L60 2 L63 12 L72 6 L76 10 L70 20 L80 18 L82 24 L73 30 L82 37 L80 43 L70 39 L75 49 L70 53 L62 46 L63 57 L57 58 L53 48 L50 59 L45 59 L43 48 L38 57 L32 53 L38 44 L27 49 L24 43 L33 36 L22 34 L22 28 L33 27 L24 19 L28 14 L38 20 L35 10 L40 7 L46 16 L48 5 L53 5 Z"
      fill="url(#navGearGrad)"
      stroke="rgba(174, 130, 255, 0.5)"
      strokeWidth="0.8"
    />
    {/* Inner circle hole */}
    <circle cx="50" cy="32" r="11" fill="#0f0d1d" stroke="rgba(123, 57, 252, 0.5)" strokeWidth="1.5" />
    {/* Inner highlight ring */}
    <circle cx="50" cy="32" r="7" fill="none" stroke="rgba(174, 130, 255, 0.15)" strokeWidth="0.5" />
    <defs>
      <linearGradient id="navGearGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ccb3ff" />
        <stop offset="50%" stopColor="#ae82ff" />
        <stop offset="100%" stopColor="#7b39fc" />
      </linearGradient>
    </defs>
  </svg>
);

import MagneticButton from '../ui/MagneticButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-dark-950/75 backdrop-blur-3xl border-b border-primary-500/15 shadow-[0_4px_30px_rgba(123,57,252,0.1)]' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Link */}
            <Link to="/" className="flex items-center gap-1.5 group">
              {/* OZ Symbol Only - Animated Video */}
              <motion.div
                className="relative flex items-center"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <video 
                  src="/logo-rotate.mp4" 
                  className="h-[18px] md:h-[28px] lg:h-[35px] w-auto object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'drop-shadow(0 0 10px rgba(123, 57, 252, 0.5))',
                  }}
                />
              </motion.div>

              {/* RoboWorkZ Text — matching loading screen branding */}
              <motion.div
                className="relative flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span 
                  className="text-[17px] sm:text-xl md:text-2xl font-extrabold tracking-wider flex items-baseline"
                  style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.06em' }}
                >
                  <span 
                    className="text-white group-hover:text-gray-100 transition-colors duration-300"
                    style={{ textShadow: '0 0 15px rgba(123, 57, 252, 0.3)' }}
                  >R</span>
                  {/* Gear symbol for the 'O' — matches loading screen gear */}
                  <motion.span 
                    className="inline-flex items-center justify-center mx-[-1px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(123, 57, 252, 0.7))',
                    }}
                  >
                    <GearSymbol size={18} />
                  </motion.span>
                  <span 
                    className="text-white group-hover:text-gray-100 transition-colors duration-300"
                    style={{ textShadow: '0 0 15px rgba(123, 57, 252, 0.3)' }}
                  >boWork</span>
                  <span 
                    className="transition-colors duration-300" 
                    style={{ 
                      background: 'linear-gradient(135deg, #7b39fc, #ae82ff, #ccb3ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 8px rgba(123, 57, 252, 0.6))',
                    }}
                  >
                    Z
                  </span>
                </span>
                {/* Neon underline — matches loading screen glow bar */}
                <motion.div
                  className="absolute -bottom-1.5 left-0 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #7b39fc, rgba(174, 130, 255, 0.6), rgba(123, 57, 252, 0.2), transparent)',
                    boxShadow: '0 0 10px rgba(123, 57, 252, 0.6), 0 0 20px rgba(123, 57, 252, 0.2)',
                  }}
                  initial={{ width: '30%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Nav Links with enhanced hover */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group"
                >
                  <motion.span
                    className={`relative z-10 block px-4 py-2 text-sm font-manrope font-medium transition-all duration-300 rounded-lg
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

                  {/* Hover glow background */}
                  <div className="absolute inset-0 rounded-lg bg-primary-500/0 group-hover:bg-primary-500/[0.06] transition-all duration-300" />

                  {/* Active indicator with gradient underline and glow */}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                      layoutId="activeUnderline"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      style={{
                        boxShadow: '0 0 10px rgba(123, 57, 252, 0.8), 0 0 20px rgba(123, 57, 252, 0.4)',
                      }}
                    />
                  )}

                  {/* Hover glow underline */}
                  {location.pathname !== link.path && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/70 to-transparent w-0 group-hover:w-full mx-auto transition-all duration-300 ease-out" 
                      style={{ boxShadow: '0 0 8px rgba(123, 57, 252, 0.4)' }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Buttons with neon style */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    className="px-5 py-2 text-sm font-manrope font-semibold text-gray-300 hover:text-primary-300 transition-colors duration-300"
                  >
                    {isAdmin ? 'Dashboard' : 'My Account'}
                  </Link>
                  <motion.button
                    onClick={() => { logout(); navigate('/'); }}
                    className="px-5 py-2.5 text-sm font-manrope font-semibold text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-primary-500/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-5 py-2 text-sm font-manrope font-semibold text-gray-300 hover:text-primary-300 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <MagneticButton>
                    <Link
                      to="/signup"
                      className="relative block px-6 py-2.5 text-sm font-manrope font-semibold text-white bg-primary-500 rounded-xl transition-all duration-300 overflow-hidden group"
                      style={{
                        boxShadow: '0 0 15px rgba(123, 57, 252, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </MagneticButton>
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
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu 
            links={navLinks} 
            onClose={() => setMobileOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
