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
        <div className="relative w-full h-full">
          <Spline
            scene={scene}
            className={className}
          />
          {/* Full-width bottom cover to hide the watermark smoothly without disturbing the robot */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[100px] z-[99999] pointer-events-none" 
            style={{ 
              background: 'linear-gradient(to top, #050312 0%, #050312 50%, transparent 100%)',
            }} 
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
