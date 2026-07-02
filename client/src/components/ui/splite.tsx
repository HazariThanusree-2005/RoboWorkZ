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
          {/* Solid overlay to hide the Spline logo without cutting the 3D model */}
          <div 
            className="absolute bottom-4 right-4 w-[160px] h-[50px] z-[99999] pointer-events-none rounded-lg" 
            style={{ 
              background: '#050312',
              boxShadow: '0 0 20px 10px #050312',
            }} 
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
