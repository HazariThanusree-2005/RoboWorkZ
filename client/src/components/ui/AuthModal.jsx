import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { Component as SignInCard2 } from '@/components/ui/sign-in-card-2';

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="relative w-full max-w-md my-8" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-50"
            aria-label="Close modal"
          >
            <HiX className="w-6 h-6" />
          </button>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <SignInCard2 defaultMode={defaultMode} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
