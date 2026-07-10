import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export default function RobotAssistant() {
  const mountRef = useRef(null);
  const containerRef = useRef(null);

  // Three.js refs
  const rendererRef = useRef(null);
  const robotGroupRef = useRef(null);
  const torsoGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftForearmRef = useRef(null);
  const rightForearmRef = useRef(null);
  const coreGlowRef = useRef(null);
  const thrusterRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  // Position state for the container (absolute position on page)
  const posRef = useRef({ x: window.innerWidth - 220, y: window.innerHeight - 320 });
  const targetPosRef = useRef({ x: window.innerWidth - 220, y: window.innerHeight - 320 });
  const [pos, setPos] = useState({ x: window.innerWidth - 220, y: window.innerHeight - 320 });

  // Mouse tracking for head movement
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Scroll velocity
  const scrollRef = useRef({ lastY: 0, velocity: 0, isScrolling: false, timer: null });

  // Animation state
  const animStateRef = useRef({
    pose: 'wave',
    blinkTimer: 0,
    isBlinking: false,
    zigzagPhase: 0,
    isMoving: false,
    moveProgress: 0,
    moveFrom: { x: window.innerWidth - 220, y: window.innerHeight - 320 },
    moveTo: { x: window.innerWidth - 220, y: window.innerHeight - 320 },
  });

  // ── Section-based pose detection ──
  const scrollPoseRef = useRef('wave');
  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? cur / docH : 0;
      scrollRef.current.velocity = cur - scrollRef.current.lastY;
      scrollRef.current.lastY = cur;
      scrollRef.current.isScrolling = true;
      if (scrollRef.current.timer) clearTimeout(scrollRef.current.timer);
      scrollRef.current.timer = setTimeout(() => {
        scrollRef.current.isScrolling = false;
        scrollRef.current.velocity = 0;
      }, 200);

      if (pct < 0.15) scrollPoseRef.current = 'wave';
      else if (pct < 0.35) scrollPoseRef.current = 'point';
      else if (pct < 0.55) scrollPoseRef.current = 'excited';
      else if (pct < 0.75) scrollPoseRef.current = 'present';
      else if (pct < 0.90) scrollPoseRef.current = 'thumbsup';
      else scrollPoseRef.current = 'invite';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Mouse tracking for head look ──
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = THREE.MathUtils.clamp((e.clientX - cx) / window.innerWidth, -1, 1) * 0.8;
      mouseRef.current.targetY = THREE.MathUtils.clamp(-(e.clientY - cy) / window.innerHeight, -1, 1) * 0.6;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Double-click → send robot to that position ──
  useEffect(() => {
    const handleDblClick = (e) => {
      // Don't trigger if clicking ON the robot itself
      if (containerRef.current && containerRef.current.contains(e.target)) return;

      const W = 180; // robot container width
      const H = 260; // robot container height
      const tx = THREE.MathUtils.clamp(e.clientX - W / 2, 8, window.innerWidth - W - 8);
      const ty = THREE.MathUtils.clamp(e.clientY - H / 2, 8, window.innerHeight - H - 8);

      const state = animStateRef.current;
      state.isMoving = true;
      state.moveProgress = 0;
      state.moveFrom = { ...posRef.current };
      state.moveTo = { x: tx, y: ty };
      targetPosRef.current = { x: tx, y: ty };
    };
    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  // ── Three.js scene ──
  useEffect(() => {
    if (!mountRef.current) return;
    const W = mountRef.current.clientWidth || 180;
    const H = mountRef.current.clientHeight || 260;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.4, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const dir = new THREE.DirectionalLight(0xffffff, 1.8);
    dir.position.set(4, 6, 5);
    scene.add(dir);
    const cyanPt = new THREE.PointLight(0x00f0ff, 3.0, 7);
    cyanPt.position.set(0, 1, 2.5);
    scene.add(cyanPt);
    const purplePt = new THREE.PointLight(0x8b5cf6, 2.5, 7);
    purplePt.position.set(-2, -1, 1.5);
    scene.add(purplePt);

    // ── Materials ──
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.85, roughness: 0.14 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.18 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.28 });
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const blueMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.05 });

    // ── Root groups ──
    const robotGroup = new THREE.Group();
    robotGroupRef.current = robotGroup;
    scene.add(robotGroup);

    const torsoGroup = new THREE.Group();
    torsoGroupRef.current = torsoGroup;
    robotGroup.add(torsoGroup);

    // ── TORSO ──
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.42, 0.78, 20), whiteMat);
    chest.position.y = 0.38;
    torsoGroup.add(chest);

    // Arc reactor core
    const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.035, 12, 24), cyanMat);
    coreRing.position.set(0, 0.42, 0.44);
    torsoGroup.add(coreRing);
    const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), cyanMat);
    coreSphere.position.set(0, 0.42, 0.44);
    torsoGroup.add(coreSphere);
    coreGlowRef.current = coreSphere;

    // Waist
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.33, 0.32, 16), darkMat);
    waist.position.y = 0.04;
    torsoGroup.add(waist);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.22, 14), jointMat);
    neck.position.y = 0.86;
    torsoGroup.add(neck);

    // ── HEAD ──
    const headGroup = new THREE.Group();
    headGroupRef.current = headGroup;
    headGroup.position.set(0, 1.02, 0);
    torsoGroup.add(headGroup);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.46, 22, 22), whiteMat);
    skull.scale.set(1.0, 1.06, 1.04);
    headGroup.add(skull);

    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 22, 0, Math.PI * 2, 0, Math.PI * 0.58), visorMat);
    visor.position.set(0, 0.02, 0.05);
    visor.scale.set(0.97, 0.78, 0.94);
    headGroup.add(visor);

    // Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.055, 0.095, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, cyanMat);
    leftEye.position.set(-0.15, 0.08, 0.43);
    leftEye.rotation.z = Math.PI / 2;
    headGroup.add(leftEye);
    leftEyeRef.current = leftEye;

    const rightEye = new THREE.Mesh(eyeGeo, cyanMat);
    rightEye.position.set(0.15, 0.08, 0.43);
    rightEye.rotation.z = Math.PI / 2;
    headGroup.add(rightEye);
    rightEyeRef.current = rightEye;

    // Ear fins
    const earGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.11, 14);
    [-1, 1].forEach(side => {
      const ear = new THREE.Mesh(earGeo, darkMat);
      ear.position.set(side * 0.46, 0.05, 0);
      ear.rotation.z = Math.PI / 2;
      headGroup.add(ear);
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.045, 14), blueMat);
      tip.position.set(side * 0.52, 0.05, 0);
      tip.rotation.z = Math.PI / 2;
      headGroup.add(tip);
    });

    // Antenna on top
    const antBase = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 10), jointMat);
    antBase.position.set(0, 0.52, 0);
    headGroup.add(antBase);
    const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), cyanMat);
    antBall.position.set(0, 0.65, 0);
    headGroup.add(antBall);

    // ── ARMS ──
    const makeArm = (side) => {
      const armGroup = new THREE.Group();
      armGroup.position.set(side * 0.63, 0.62, 0);
      torsoGroup.add(armGroup);

      armGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 14), jointMat));

      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.095, 0.44, 14), whiteMat);
      upper.position.y = -0.24;
      armGroup.add(upper);

      const foreGroup = new THREE.Group();
      foreGroup.position.y = -0.48;
      armGroup.add(foreGroup);

      foreGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), jointMat));
      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.085, 0.38, 14), whiteMat);
      fore.position.y = -0.21;
      foreGroup.add(fore);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 14), darkMat);
      hand.position.y = -0.42;
      foreGroup.add(hand);

      return { armGroup, foreGroup };
    };

    const leftParts = makeArm(-1);
    leftArmRef.current = leftParts.armGroup;
    leftForearmRef.current = leftParts.foreGroup;

    const rightParts = makeArm(1);
    rightArmRef.current = rightParts.armGroup;
    rightForearmRef.current = rightParts.foreGroup;

    // ── LOWER / HOVER BASE ──
    const lower = new THREE.Group();
    lower.position.y = -0.15;
    robotGroup.add(lower);

    lower.add(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.22, 0.32, 16), whiteMat));

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.27, 0.22, 16), darkMat);
    nozzle.position.y = -0.26;
    lower.add(nozzle);

    const thrusterRing = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.038, 12, 24), cyanMat);
    thrusterRing.position.y = -0.40;
    thrusterRing.rotation.x = Math.PI / 2;
    lower.add(thrusterRing);
    thrusterRef.current = thrusterRing;

    const thrustCore = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 14), blueMat);
    thrustCore.position.y = -0.52;
    thrustCore.rotation.x = Math.PI;
    lower.add(thrustCore);

    robotGroup.position.y = -0.2;

    // ── ANIMATION LOOP ──
    const startTime = performance.now();
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothStep = (t) => t * t * (3 - 2 * t);

    const animate = () => {
      if (document.hidden) { raf = requestAnimationFrame(animate); return; }

      const t = (performance.now() - startTime) * 0.001;
      const state = animStateRef.current;

      // ── Mouse head look ──
      mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, 0.07);
      mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, 0.07);
      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = mouseRef.current.x * 0.75;
        headGroupRef.current.rotation.x = mouseRef.current.y * 0.5;
      }

      // ── Idle float & breathing ──
      if (robotGroupRef.current) {
        robotGroupRef.current.position.y = -0.2 + Math.sin(t * 2.3) * 0.085;
        robotGroupRef.current.rotation.z = Math.sin(t * 1.6) * 0.032;
      }
      if (torsoGroupRef.current) {
        torsoGroupRef.current.position.y = Math.sin(t * 3.6) * 0.018;
      }

      // ── Thruster + core pulse ──
      if (thrusterRef.current && coreGlowRef.current) {
        const p = 1 + Math.sin(t * 9) * 0.18;
        thrusterRef.current.scale.set(p, p, p);
        coreGlowRef.current.scale.set(p, p, p);
      }

      // ── Blink ──
      state.blinkTimer += 0.016;
      if (state.blinkTimer > 3.2 && !state.isBlinking) {
        state.isBlinking = true;
        state.blinkTimer = 0;
      }
      if (state.isBlinking && leftEyeRef.current && rightEyeRef.current) {
        const bp = state.blinkTimer / 0.13;
        let sy = bp <= 0.5 ? lerp(1, 0.04, bp * 2) : lerp(0.04, 1, (bp - 0.5) * 2);
        if (bp > 1.0) { sy = 1; state.isBlinking = false; }
        leftEyeRef.current.scale.y = sy;
        rightEyeRef.current.scale.y = sy;
      }

      // ── Moving animation: cute zigzag path ──
      if (state.isMoving) {
        state.moveProgress = Math.min(1, state.moveProgress + 0.022); // speed
        const sp = smoothStep(state.moveProgress);

        // Zigzag offset perpendicular to movement
        const zigzagAmp = 28;
        const dx = state.moveTo.x - state.moveFrom.x;
        const dy = state.moveTo.y - state.moveFrom.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpX = dist > 0 ? -dy / dist : 0;
        const perpY = dist > 0 ? dx / dist : 0;
        const zigzag = Math.sin(state.moveProgress * Math.PI * 5) * zigzagAmp * (1 - sp);

        const nx = lerp(state.moveFrom.x, state.moveTo.x, sp) + perpX * zigzag;
        const ny = lerp(state.moveFrom.y, state.moveTo.y, sp) + perpY * zigzag;

        posRef.current = { x: nx, y: ny };
        setPos({ x: nx, y: ny });

        // Lean robot body in direction of travel
        if (robotGroupRef.current) {
          const speed = dist * 0.001;
          robotGroupRef.current.rotation.y = lerp(robotGroupRef.current.rotation.y, dx > 0 ? 0.35 : -0.35, 0.12);
          robotGroupRef.current.rotation.x = lerp(robotGroupRef.current.rotation.x, -speed * 0.5, 0.1);
        }

        // Pump arms while moving
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(t * 14) * 0.4;
          rightArmRef.current.rotation.x = -Math.sin(t * 14) * 0.4;
        }

        if (state.moveProgress >= 1) {
          state.isMoving = false;
          state.moveProgress = 0;
          // Snap to destination
          posRef.current = { ...state.moveTo };
          setPos({ ...state.moveTo });
        }
      } else {
        // Idle gentle left-right sway
        if (robotGroupRef.current) {
          robotGroupRef.current.rotation.y = lerp(robotGroupRef.current.rotation.y, Math.sin(t * 0.8) * 0.15, 0.05);
          robotGroupRef.current.rotation.x = lerp(robotGroupRef.current.rotation.x, 0, 0.08);
        }

        // Section pose arms
        const pose = scrollPoseRef.current;
        if (leftArmRef.current && rightArmRef.current && leftForearmRef.current && rightForearmRef.current) {
          if (pose === 'wave') {
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, Math.PI / 2.3, 0.1);
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, 0, 0.1);
            rightForearmRef.current.rotation.z = Math.sin(t * 8) * 0.45 + 0.3;
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -0.22, 0.1);
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, 0, 0.1);
          } else if (pose === 'point') {
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, -Math.PI / 3.2, 0.1);
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, Math.PI / 9, 0.1);
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -0.28, 0.1);
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, 0, 0.1);
          } else if (pose === 'excited') {
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -Math.PI / 3 + Math.sin(t * 5) * 0.12, 0.1);
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, Math.PI / 3 - Math.sin(t * 5) * 0.12, 0.1);
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, 0, 0.1);
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, 0, 0.1);
          } else if (pose === 'thumbsup') {
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, -Math.PI / 4, 0.1);
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, Math.PI / 7, 0.1);
            rightForearmRef.current.rotation.x = lerp(rightForearmRef.current.rotation.x, -Math.PI / 2.3, 0.1);
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -0.22, 0.1);
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, 0, 0.1);
          } else if (pose === 'present') {
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -Math.PI / 3.8, 0.1);
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, Math.PI / 3.8, 0.1);
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, -Math.PI / 7, 0.1);
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, -Math.PI / 7, 0.1);
          } else if (pose === 'invite') {
            leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, -Math.PI / 3.5, 0.1);
            leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, -Math.PI / 5, 0.1);
            rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, 0.22, 0.1);
            rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, 0, 0.1);
          }
        }
      }

      // Scroll tilt
      if (scrollRef.current.isScrolling && robotGroupRef.current && !state.isMoving) {
        const tilt = THREE.MathUtils.clamp(scrollRef.current.velocity * 0.005, -0.22, 0.22);
        robotGroupRef.current.rotation.x = lerp(robotGroupRef.current.rotation.x, tilt, 0.12);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const nW = mountRef.current.clientWidth || 180;
      const nH = mountRef.current.clientHeight || 260;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 180,
        height: 260,
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'left, top',
        transition: 'none',
        cursor: 'default',
      }}
    >
      {/* 3D canvas */}
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        title="Double-click anywhere to send me there!"
      />

      {/* Subtle hint on first load */}
      <div
        style={{
          position: 'absolute',
          bottom: -22,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          color: 'rgba(139,92,246,0.55)',
          whiteSpace: 'nowrap',
          fontFamily: 'monospace',
          letterSpacing: 1,
          pointerEvents: 'none',
          animation: 'fadeHint 4s ease-in-out 2s both',
        }}
      >
        double-click to move me ✦
      </div>

      <style>{`
        @keyframes fadeHint {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
