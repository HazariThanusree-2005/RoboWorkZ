import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* =================================================================
   GEAR POSITION CONSTANTS
   ----------------------------------------------------------------
   Adjust these if the gear rotation is misaligned.
   Values are percentages of the logo image dimensions.
   ================================================================= */
const GEAR_CX = 0.24609375;   // Gear center — 24.609375% from left
const GEAR_CY = 0.501953125;  // Gear center — 50.1953125% from top
const GEAR_R  = 0.05859375;   // Gear radius — 5.859375% of image width
const MASK_X_MIN = 0.1875;     // Left limit to exclude letter 'R' — 18.75%
const MASK_X_MAX = 0.3046875;  // Right limit to exclude letter 'b' — 30.46875%


/* =================================================================
   LOADING SCREEN COMPONENT
   ================================================================= */
const LogoLoadingScreen = ({ onComplete }) => {
  const [phase, setPhase]   = useState('loading'); // loading → exit → done
  const [ready, setReady]   = useState(false);
  const [aspectRatio, setAspectRatio] = useState(2); // default 2:1
  const baseRef  = useRef(null);  // canvas: full logo, gear area blanked
  const gearRef  = useRef(null);  // canvas: just the gear circle
  const dimRef   = useRef({ gearLeft: 0, gearTop: 0, gearW: 0, gearH: 0 });
  const particleCanvasRef = useRef(null);

  /* ---- Load image & split into base + gear canvases ------------ */
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const W  = img.naturalWidth;
      const H  = img.naturalHeight;
      const cx = GEAR_CX * W;
      const cy = GEAR_CY * H;
      const r  = GEAR_R  * W;

      setAspectRatio(W / H);

      /* Base canvas: draw full logo, then punch out the gear circle */
      const bc  = baseRef.current;
      bc.width  = W;
      bc.height = H;
      const bx  = bc.getContext('2d');
      bx.drawImage(img, 0, 0, W, H);
      bx.save();
      bx.globalCompositeOperation = 'destination-out';
      bx.beginPath();
      bx.arc(cx, cy, r, 0, Math.PI * 2);
      bx.fill();
      bx.restore();

      /* Gear canvas: extract only the circular gear region */
      const d   = r * 2;
      const gc  = gearRef.current;
      gc.width  = d;
      gc.height = d;
      const gx  = gc.getContext('2d');
      gx.save();
      gx.beginPath();
      gx.arc(r, r, r, 0, Math.PI * 2);
      gx.clip();
      gx.drawImage(img, cx - r, cy - r, d, d, 0, 0, d, d);
      gx.restore();

      /* Store percentages for responsive positioning */
      dimRef.current = {
        gearLeft:   ((cx - r) / W) * 100,
        gearTop:    ((cy - r) / H) * 100,
        gearW:      (d / W) * 100,
        gearH:      (d / H) * 100,
      };

      setReady(true);
    };
    img.src = '/roboworkz-logo.png?v=' + Date.now();
  }, []);

  /* ---- Background particles (subtle canvas) -------------------- */
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const particles = Array.from({ length: 35 }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      r:  Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.0003,
      dy: -(Math.random() * 0.0004 + 0.0001),
      a:  Math.random() * 0.35 + 0.05,
    }));

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < 0 || p.x > 1) p.dx *= -1;

        const sx = p.x * canvas.width;
        const sy = p.y * canvas.height;
        ctx.beginPath();
        ctx.arc(sx, sy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,57,252,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ---- Phase timers -------------------------------------------- */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 2100);
    const t2 = setTimeout(() => { setPhase('done'); onComplete?.(); }, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  /* ---- Gear rotation (CSS animation for smoothness) ------------ */
  const gearStyle = ready
    ? {
        position:  'absolute',
        left:      `${dimRef.current.gearLeft}%`,
        top:       `${dimRef.current.gearTop}%`,
        width:     `${dimRef.current.gearW}%`,
        height:    `${dimRef.current.gearH}%`,
        animation: 'gearSpin 10s linear infinite',
      }
    : { display: 'none' };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#010005' }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* ---- background particles ---- */}
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-0 opacity-50 pointer-events-none"
          />

          {/* ---- ambient purple glow ---- */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width:  '500px',
              height: '500px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(123,57,252,0.09) 0%, rgba(123,57,252,0.02) 50%, transparent 70%)',
            }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* =================== LOGO ASSEMBLY =================== */}
          <motion.div
            className="relative z-10 w-full max-w-[600px] px-6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full overflow-visible flex items-center justify-center"
              style={{ aspectRatio: aspectRatio }}
            >
              {/* ---- soft bloom behind logo ---- */}
              <motion.div
                className="absolute -inset-12 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(123,57,252,0.12) 0%, transparent 60%)',
                }}
                animate={{ opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* ---- BASE CANVAS (logo without gear) ---- */}
              <canvas
                ref={baseRef}
                className="absolute inset-0 w-full h-full z-10"
                style={{
                  display: ready ? 'block' : 'none',
                  filter: 'drop-shadow(0 0 20px rgba(123,57,252,0.15))',
                }}
              />

              {/* ---- GEAR CANVAS (only the gear, rotating) ---- */}
              <canvas
                ref={gearRef}
                style={{
                  ...gearStyle,
                  zIndex: 20,
                  filter: 'drop-shadow(0 0 8px rgba(123,57,252,0.3))',
                }}
              />

              {/* ---- neon shimmer sweep ---- */}
              {ready && (
                <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 h-full"
                    style={{
                      width: '50%',
                      background:
                        'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.04) 45%, rgba(123,57,252,0.06) 50%, rgba(255,255,255,0.04) 55%, transparent 65%)',
                    }}
                    initial={{ left: '-60%' }}
                    animate={{ left: '130%' }}
                    transition={{
                      duration: 2.8,
                      delay: 0.6,
                      repeat: Infinity,
                      repeatDelay: 3.5,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              )}

              {/* ---- placeholder while loading image ---- */}
              {!ready && (
                <div
                  className="w-full"
                  style={{ aspectRatio: aspectRatio }}
                />
              )}
            </div>
          </motion.div>

          {/* ---- loading bar ---- */}
          <motion.div
            className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-20 h-[2px] bg-white/[0.04] rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #7b39fc, #a78bfa, #7b39fc)',
                boxShadow: '0 0 6px rgba(123,57,252,0.5)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoLoadingScreen;
