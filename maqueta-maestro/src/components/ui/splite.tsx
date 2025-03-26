//@ts-nocheck
'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={"https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"}
        className={className}
      />
    </Suspense>
  )
}
