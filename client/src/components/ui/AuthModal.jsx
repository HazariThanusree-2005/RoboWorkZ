import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiX, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Reset form when mode changes
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        const data = await login(email, password);
        onClose();
        navigate(data.user.role === 'admin' ? '/admin' : '/');
      } else {
        await signup(username, email, password);
        onClose();
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || (mode === 'signin' ? 'Invalid credentials' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  // Glassmorphic input style matching the reference
  const inputClasses = "w-full px-5 py-3.5 bg-[#e5e5e5] border border-transparent rounded-xl text-dark-900 placeholder-gray-500 font-manrope font-bold text-sm focus:outline-none focus:border-primary-500/50 transition-all duration-300";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-[#050312]/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal Content - Wide 2 Column Layout */}
        <motion.div 
          className="relative z-10 w-full max-w-[1000px] h-full max-h-[700px] flex rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-dark-900/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <HiX size={20} />
          </button>

          {/* Left Column: Image */}
          <div className="hidden lg:block w-1/2 relative bg-[#050312]">
            <AnimatePresence mode="wait">
              <motion.img 
                key={mode}
                src={mode === 'signin' ? '/login-removebg-preview.png' : '/reigister-removebg-preview.png'} 
                alt={mode === 'signin' ? 'Login' : 'Register'} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover object-center scale-x-[-1]"
              />
            </AnimatePresence>
            {/* Gradient Overlay to blend with the form side */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050312]/20 to-[#050312]" />
            <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay" />
          </div>

          {/* Right Column: Glassmorphic Form */}
          <div className="w-full lg:w-1/2 relative bg-[#050312] p-8 md:p-14 flex flex-col justify-center">
            
            {/* Background Glow inside form */}
            <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/10 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm mx-auto">
              
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-4xl font-space font-bold text-white leading-tight">
                  {mode === 'signin' ? (
                    <>Hello!<br />Welcome Back</>
                  ) : (
                    <>Hello!<br />Create Account</>
                  )}
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {mode === 'signup' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength={3}
                      className={inputClasses}
                    />
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClasses}
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'signup' ? "Password (min 6 chars)" : "********"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={mode === 'signup' ? 6 : undefined}
                    className={`${inputClasses} pr-12 text-2xl tracking-widest`}
                    style={{ fontSize: password ? '1.5rem' : '0.875rem', letterSpacing: password ? '0.2em' : 'normal', paddingTop: '10px', paddingBottom: '10px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark-900"
                  >
                    {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                  </button>
                </div>

                {mode === 'signin' && (
                  <div className="text-right">
                    <button type="button" className="text-sm font-manrope font-semibold text-gray-400 hover:text-white transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                )}

                {error && (
                  <motion.p 
                    className="text-red-400 text-sm font-inter text-center" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 bg-white text-dark-900 font-manrope font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {loading ? (mode === 'signin' ? 'Signing In...' : 'Creating Account...') : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative px-4 bg-[#050312] text-sm text-gray-400 font-inter">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <button type="button" className="flex items-center justify-center py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <FaFacebook size={24} color="#1877F2" />
                  </button>
                  <button type="button" className="flex items-center justify-center py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <FaApple size={24} color="#000000" />
                  </button>
                  <button type="button" className="flex items-center justify-center py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <FcGoogle size={24} />
                  </button>
                </div>
              </div>

              {/* Toggle Mode */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-inter">
                  {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => handleModeSwitch(mode === 'signin' ? 'signup' : 'signin')}
                    className="text-white font-bold hover:text-primary-300 transition-colors"
                  >
                    {mode === 'signin' ? 'Create Account!' : 'Sign In!'}
                  </button>
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
