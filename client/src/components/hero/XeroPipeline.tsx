import { useEffect, useRef } from 'react';
import './XeroPipeline.css';

/* ── RoboWorkZ "R" logo SVG as the center node icon ── */
const RoboLogo = () => (
  <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
    {/* Circuit-style R mark */}
    <rect x="10" y="8" width="4" height="24" rx="1"/>
    <rect x="10" y="8" width="16" height="4" rx="1"/>
    <rect x="10" y="18" width="13" height="4" rx="1"/>
    <rect x="20" y="8" width="4" height="14" rx="1"/>
    <line x1="23" y1="22" x2="30" y2="32" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    {/* Corner dots */}
    <circle cx="10" cy="8" r="1.5" fill="rgba(167,139,250,1)"/>
    <circle cx="26" cy="8" r="1.5" fill="rgba(167,139,250,1)"/>
    <circle cx="10" cy="32" r="1.5" fill="rgba(167,139,250,1)"/>
  </svg>
);

/* Layers icon for left node */
const LayersIcon = () => (
  <svg viewBox="0 0 24 24">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

/* Shield-check icon for right node */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

export default function XeroPipeline() {
  const pipelineRef  = useRef<HTMLDivElement>(null);
  const nodeStackRef = useRef<HTMLDivElement>(null);
  const nodeXRef     = useRef<HTMLDivElement>(null);
  const nodeShRef    = useRef<HTMLDivElement>(null);
  const beamPath1Ref = useRef<SVGPathElement>(null);
  const beamPath2Ref = useRef<SVGPathElement>(null);
  const gradientRef  = useRef<SVGLinearGradientElement>(null);
  const splashRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    /* ── Build the beam SVG path from current node positions ── */
    function buildPath() {
      const pipeline = pipelineRef.current;
      const nodeStack = nodeStackRef.current;
      const nodeX = nodeXRef.current;
      const nodeSh = nodeShRef.current;
      if (!pipeline || !nodeStack || !nodeX || !nodeSh) return '';

      const pRect  = pipeline.getBoundingClientRect();
      const sRect  = nodeStack.getBoundingClientRect();
      const xRect  = nodeX.getBoundingClientRect();
      const shRect = nodeSh.getBoundingClientRect();

      const startX = sRect.left  + sRect.width  / 2 - pRect.left;
      const startY = sRect.top   + sRect.height / 2 - pRect.top;
      const midX   = xRect.left  + xRect.width  / 2 - pRect.left;
      const midY   = xRect.top   + xRect.height / 2 - pRect.top;
      const endX   = shRect.left + shRect.width  / 2 - pRect.left;
      const endY   = shRect.top  + shRect.height / 2 - pRect.top;

      return `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
    }

    function updatePaths() {
      const d = buildPath();
      if (beamPath1Ref.current) beamPath1Ref.current.setAttribute('d', d);
      if (beamPath2Ref.current) beamPath2Ref.current.setAttribute('d', d);
    }

    /* ── State machine ── */
    type State = 'p1' | 'splash' | 'p2' | 'idle';
    let state: State = 'p1';
    let lastChange = performance.now();

    const DURATIONS: Record<State, number> = {
      p1:     800,
      splash: 800,
      p2:     800,
      idle:  1000,
    };

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function setBeamVisible(visible: boolean) {
      const opacity = visible ? '1' : '0';
      if (beamPath1Ref.current) beamPath1Ref.current.style.opacity = opacity;
      if (beamPath2Ref.current) beamPath2Ref.current.style.opacity = opacity;
    }

    function setGradient(percentage: number) {
      const g = gradientRef.current;
      if (!g) return;
      const center = percentage * 100;
      const hw = 12;
      g.setAttribute('x1', `${center - hw}%`);
      g.setAttribute('x2', `${center + hw}%`);
      g.setAttribute('y1', '0%');
      g.setAttribute('y2', '0%');
    }

    function loop(now: number) {
      const elapsed = now - lastChange;
      const dur = DURATIONS[state];
      const t = Math.min(elapsed / dur, 1);

      if (state === 'p1') {
        const p = easeInOut(t) * 0.5; // 0 → 0.5
        setBeamVisible(true);
        setGradient(p);
        if (p < 0.4) {
          nodeStackRef.current?.classList.add('active');
        } else {
          nodeStackRef.current?.classList.remove('active');
        }
        if (t >= 1) {
          setBeamVisible(false);
          splashRef.current?.classList.remove('animate');
          // force reflow
          void splashRef.current?.offsetWidth;
          splashRef.current?.classList.add('animate');
          state = 'splash';
          lastChange = now;
        }
      } else if (state === 'splash') {
        if (t >= 1) {
          setBeamVisible(true);
          splashRef.current?.classList.remove('animate');
          state = 'p2';
          lastChange = now;
        }
      } else if (state === 'p2') {
        const p = 0.5 + easeInOut(t) * 0.5; // 0.5 → 1.0
        setGradient(p);
        if (p > 0.6) {
          nodeShRef.current?.classList.add('active');
        } else {
          nodeShRef.current?.classList.remove('active');
        }
        if (t >= 1) {
          nodeShRef.current?.classList.remove('active');
          state = 'idle';
          lastChange = now;
        }
      } else if (state === 'idle') {
        if (t >= 1) {
          state = 'p1';
          lastChange = now;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    updatePaths();
    const onResize = () => updatePaths();
    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="icon-pipeline" ref={pipelineRef}>

      {/* ── Beam SVG ── */}
      <svg className="beam-svg" aria-hidden="true">
        <defs>
          <filter id="xero-glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <linearGradient
            id="xero-beam-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0%" x2="20%" y1="0%" y2="0%"
            ref={gradientRef as React.RefObject<SVGLinearGradientElement>}
          >
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0"/>
            <stop offset="20%"  stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="80%"  stopColor="#a78bfa" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Glow path */}
        <path
          ref={beamPath1Ref}
          stroke="url(#xero-beam-gradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#xero-glow)"
          opacity="0.6"
          style={{ opacity: 0, transition: 'opacity 0.15s' }}
        />
        {/* Core path */}
        <path
          ref={beamPath2Ref}
          stroke="url(#xero-beam-gradient)"
          strokeWidth="0.8"
          fill="none"
          style={{ opacity: 0, transition: 'opacity 0.15s' }}
        />
      </svg>

      {/* ── Left Node: Layers ── */}
      <div
        className="icon-node node-light-right"
        id="node-stack"
        ref={nodeStackRef}
        title="Data Layers"
      >
        <LayersIcon />
      </div>

      {/* ── Connector line left ── */}
      <div className="pipeline-line" />

      {/* ── Center Node: RoboWorkZ logo ── */}
      <div className="icon-node-center-wrap">
        <div className="splash" ref={splashRef} />
        <div className="icon-node-center" id="node-x" ref={nodeXRef} title="RoboWorkZ">
          <RoboLogo />
        </div>
      </div>

      {/* ── Connector line right ── */}
      <div className="pipeline-line right" />

      {/* ── Right Node: Shield ── */}
      <div
        className="icon-node node-light-left"
        id="node-shield"
        ref={nodeShRef}
        title="Secure Shield"
      >
        <ShieldIcon />
      </div>
    </div>
  );
}
