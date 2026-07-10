import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/signin', '/signup'].includes(location.pathname);
  const hideNavAndFooter = isAdminRoute || isAuthRoute;

  return (
    <div className="min-h-screen bg-[#050312] relative">
      {!hideNavAndFooter && <Navbar />}
      
      <main>
        {children}
      </main>

      {!hideNavAndFooter && <Footer />}

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="hidden md:flex fixed bottom-8 right-8 z-40 w-12 h-12 rounded-xl bg-primary-500/90 backdrop-blur-sm text-white items-center justify-center shadow-glow hover:bg-primary-500 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <HiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
