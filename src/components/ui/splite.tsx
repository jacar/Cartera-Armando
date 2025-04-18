//@ts-nocheck
"use client";

import { Suspense, lazy, useEffect, useState } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  className?: string;
}

export function SplineScene({ className }: SplineSceneProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      {isMobile ? (
        <Spline
          scene={"https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"}
          className={className}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center relative z-10" style={{ transform: 'translateY(120px)', margin: '0', padding: '0' }}>
          <Spline
            scene={"https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"}
            className={className + ' !w-full !h-full'}
          />
        </div>
      )}
    </Suspense>
  );
}
