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
          {/* Universal overlay to hide "Built with Spline" logo */}
          <div className="absolute bottom-0 right-0 w-[160px] h-[50px] bg-[#050312] z-[99] pointer-events-none" />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
