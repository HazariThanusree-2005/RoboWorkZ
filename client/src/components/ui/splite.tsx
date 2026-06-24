'use client'

import { Suspense, lazy } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <>
          <Spline
            scene={scene}
            className={className}
          />
          {/* Soft, blurred overlay to elegantly hide the Spline logo without sharp edges */}
          <div 
            className="absolute bottom-2 right-2 w-[140px] h-[40px] z-[99] pointer-events-none rounded-xl" 
            style={{ 
              background: '#050312',
              filter: 'blur(10px)',
              opacity: 0.95
            }} 
          />
        </>
      </Suspense>
    </ErrorBoundary>
  )
}
