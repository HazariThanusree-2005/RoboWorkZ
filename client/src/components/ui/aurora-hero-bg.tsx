import React from "react";
import { motion } from "framer-motion";

/**
 * Utility to conditionally join classNames
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AuroraHero({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
}) {
  const titleWords = title?.split(" ") || [];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050312]",
        className
      )}
      role="banner"
      aria-label="Hero section"
    >
      {/* Aurora Gradient Background - Neon Black Theme - Subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-20" aria-hidden="true">
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            background: `
              repeating-linear-gradient(100deg, 
                #8b5cf6 10%, 
                #050312 15%, 
                #a855f7 20%, 
                #050312 25%, 
                #8b5cf6 30%)
            `,
            backgroundSize: "300% 100%",
            filter: "blur(80px)",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-[-10px]"
          style={{
            background: `
              repeating-linear-gradient(100deg, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(139, 92, 246, 0.15) 7%, 
                transparent 10%, 
                transparent 12%, 
                rgba(139, 92, 246, 0.15) 16%),
              repeating-linear-gradient(100deg, 
                #8b5cf6 10%, 
                #050312 15%, 
                #a855f7 20%, 
                #050312 25%, 
                #8b5cf6 30%)
            `,
            backgroundSize: "200%, 100%",
            backgroundPosition: "50% 50%, 50% 50%",
            mixBlendMode: "screen",
          }}
          animate={{
            backgroundPosition: [
              "50% 50%, 50% 50%",
              "100% 50%, 150% 50%",
              "50% 50%, 50% 50%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Vignette Overlay - heavy black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(5, 3, 18, 0.5) 0%, rgba(5, 3, 18, 0.97) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Extra dark base overlay */}
      <div className="absolute inset-0 bg-[#050312]/60 pointer-events-none" aria-hidden="true" />

      {/* Content Layer */}
      {children ? (
        <div className="relative z-10 w-full h-full">{children}</div>
      ) : (
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Animated Title */}
            {title && (
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight">
                {titleWords.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4 last:mr-0 mb-2">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={wordIndex + "-" + letterIndex}
                        initial={{
                          y: 100,
                          opacity: 0,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/70 cursor-default"
                        style={{
                          textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {/* Action Buttons */}
            {(primaryAction || secondaryAction) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {primaryAction && (
                  <button
                    onClick={primaryAction.onClick}
                    className="px-8 py-4 text-base sm:text-lg font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-500 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-[#050312]"
                    aria-label={primaryAction.label}
                  >
                    {primaryAction.label}
                  </button>
                )}

                {secondaryAction && (
                  <button
                    onClick={secondaryAction.onClick}
                    className="px-8 py-4 text-base sm:text-lg font-semibold rounded-full bg-white/10 text-white hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#050312]"
                    aria-label={secondaryAction.label}
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
