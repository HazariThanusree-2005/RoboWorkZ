import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import LogoLoadingScreen from './components/ui/LogoLoadingScreen';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import RentalsPage from './pages/RentalsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import ProductDetail from './pages/user/ProductDetail';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Logo Loading Animation */}
      {loading && <LogoLoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main App */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/products" element={<PageTransition><ProductsPage /></PageTransition>} />
              <Route path="/products/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
              <Route path="/rentals" element={<PageTransition><RentalsPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute><PageTransition><UserDashboard /></PageTransition></ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute><AdminLayout /></AdminRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Layout>
      </motion.div>
    </>
  );
}

export default App;
