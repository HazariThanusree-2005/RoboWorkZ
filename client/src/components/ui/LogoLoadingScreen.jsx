import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LogoLoadingScreen = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  const handleComplete = () => {
    if (isFading || isDone) return;
    setIsFading(true);
    
    // Smoothly fade out then complete
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 500); // 500ms fade transition
  };

  // Fallback: Skip loading screen if video fails or hangs
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 12000); // 12 second max duration fallback
    
    return () => clearTimeout(fallbackTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDone) return null;

  return (
    <motion.div
      className="lls-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
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
          // Wait 300–500ms after the video completes, then fade out
          setTimeout(handleComplete, 400);
        }}
        onError={handleComplete}
      />
    </motion.div>
  );
};

export default LogoLoadingScreen;
