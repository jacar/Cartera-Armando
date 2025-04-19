"use client";

import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { isMobile } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  // Detectar cliente y dispositivo móvil después del montaje
  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isMobile());
  }, []);
  
  // Renderizar sin animaciones en dispositivos móviles para mejorar rendimiento
  if (isClient && isMobileDevice) {
    return <div className="mobile-transition">{children}</div>;
  }
  
  // Usar animaciones solo en dispositivos de escritorio
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
            // Reducir trabajo de CPU para mejor rendimiento
            type: "tween"
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
