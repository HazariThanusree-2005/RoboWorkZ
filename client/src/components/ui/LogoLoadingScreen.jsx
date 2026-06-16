import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoLoadingScreen = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  const handleComplete = () => {
    if (isFading || isDone) return;
    setIsFading(true);

    // Premium fade-out: 800ms, then unmount and signal parent
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 800);
  };

  // Safety fallback: skip loading screen if video hangs or fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 12000); // 12-second max duration

    return () => clearTimeout(fallbackTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lls-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: '#050312' }}
      >
        <video
          ref={videoRef}
          src="/logo-video.mp4"
          className="lls-video"
          muted
          autoPlay
          playsInline
          controls={false}
          loop={false}
          onEnded={() => {
            // Brief pause after video completes for cinematic feel, then fade out
            setTimeout(handleComplete, 400);
          }}
          onError={handleComplete}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoLoadingScreen;
