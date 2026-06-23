import React from 'react';

export const ImageAutoSlider = ({ children, duration = "20s" }) => {
  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right ${duration} linear infinite;
          width: max-content;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>
      
      <div className="w-full relative overflow-hidden flex items-center justify-center">
        {/* Scrolling items container */}
        <div className="relative z-10 w-full flex items-center justify-center py-4">
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6">
              {children}
              {/* Duplicate children for seamless infinite loop */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
