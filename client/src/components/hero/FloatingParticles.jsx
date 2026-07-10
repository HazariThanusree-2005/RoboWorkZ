import { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 30 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Connection distance threshold
    const connectionDistance = 120;

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${currentOpacity})`;
        ctx.fill();

        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${currentOpacity * 0.12})`;
        ctx.fill();
      });

      // Draw connections between nearby particles (neural network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineOpacity = (1 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FloatingParticles;
