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
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[calc(100%+50px)]">
            <Spline
              scene={scene}
              className={className}
            />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
