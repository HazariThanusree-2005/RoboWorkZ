import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width) {
  let idealPx;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards, slot) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  // Calculate true center, even if totalCards is even
  const center = (totalCards - 1) / 2;
  const maxDistance = Math.max(center, 1);
  const distance = (slot - center) / maxDistance;
  const absDistance = Math.abs(distance);
  
  // Cap the maximum spread based on how many cards we have so they don't stretch too far
  const spreadFactor = totalCards <= 4 ? 0.7 : 1;

  return {
    rot: distance * 15 * spreadFactor,
    scale: 1.0 - 0.15 * absDistance * absDistance,
    x: distance * 45 * spreadFactor, // Decreased to 45 to tighten the gap slightly
    y: absDistance * absDistance * 4.0 * spreadFactor,
    zIndex: 10 - Math.ceil(absDistance * 10),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/40 dark:text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black/70 dark:hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none";

export default function SocialCards({ cards }) {
  const containerRef = useRef(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef(null);
  const prevVisible = useRef(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);
  const [expandedCard, setExpandedCard] = useState(null);

  const getVisibleMap = useCallback((center) => {
    const map = new Map();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, cards]);

  const cycle = useCallback((direction) => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      // --- EXPANDED CARD LOGIC ---
      if (expandedCard !== null) {
        if (expandedCard === cardIndex) {
          gsap.to(card, { x: 0, y: `-2rem`, rotation: 0, scale: 1.1, opacity: 1, zIndex: 50, duration: 0.5, ease: "power2.out", overwrite: "auto", onComplete: onCardDone });
        } else {
          const distance = cardIndex - expandedCard;
          // Push to the sides and dim
          gsap.to(card, { x: `${distance > 0 ? 25 : -25}rem`, y: `6rem`, rotation: distance * 8, scale: 0.8, opacity: 0.2, zIndex: 0, duration: 0.5, ease: "power2.out", overwrite: "auto", onComplete: onCardDone });
        }
        return;
      }
      // ---------------------------

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -30 : 30, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover interactions
    const visibleEntries = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot = null;
    let leaveTimer = null;
    const centerSlot = (visibleEntries.length - 1) / 2;

    const updateHoverLayout = (hoveredSlot) => {
      if (expandedCard !== null) return; // Disable hover effects while a card is expanded

      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`, y: `${targetY}rem`, rotation: targetRot, scale: targetScale,
          duration: 0.5, delay, ease: "elastic.out(1,.75)", overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => { if (!isAnimating.current) updateHoverLayout(activeSlot); };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination, expandedCard]);

  if (!totalCards) return null;

  const chevron = (direction) => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full py-4 lg:py-16 px-4 md:px-8 relative z-20">
      <div className="flex items-center justify-center w-full max-w-[90rem] h-[360px] md:h-[420px]">
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem]">
          {cards.map((card, index) => {
            const content = (
              <div className="relative w-[240px] h-[280px] md:w-[320px] md:h-[340px] rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/[0.1] flex flex-col p-8 group bg-white/[0.03] backdrop-blur-3xl transition-colors duration-500 hover:bg-white/[0.05]">
                {/* Gradient background on hover */}
                {card.gradient && <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />}
                
                {/* Neon glow corner */}
                {card.borderGlow && (
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl pointer-events-none"
                    style={{ background: card.borderGlow }}
                  />
                )}

                <div className="relative z-10 flex-1 flex flex-col">
                  {card.icon && (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 md:mb-5 group-hover:border-primary-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300">
                      <card.icon
                        size={24}
                        className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}

                  <h3 className="font-manrope font-bold text-white text-base md:text-lg mb-2 md:mb-3 group-hover:text-primary-100 transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 text-xs md:text-sm font-inter leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} onClick={(e) => {
                if (expandedCard === index) {
                  setExpandedCard(null); // collapse if already expanded
                } else {
                  e.preventDefault(); // prevent navigation to expand instead
                  setExpandedCard(index);
                }
              }} target={card.linkUrl.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="fan-card absolute cursor-pointer block">{content}</a>
            ) : (
              <div key={index} onClick={() => setExpandedCard(expandedCard === index ? null : index)} className="fan-card absolute cursor-pointer">{content}</div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-primary-500 scale-[1.3]" : "bg-white/20"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
