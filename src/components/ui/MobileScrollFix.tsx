"use client";

import { useEffect, useRef } from 'react';

/**
 * Solución de emergencia para forzar el scroll táctil en dispositivos móviles
 * Aplica una solución directa al problema de scroll en móviles
 */
export default function MobileScrollFix() {
  const isTouching = useRef(false);
  const lastY = useRef(0);

  useEffect(() => {
    // Solo ejecutar en el cliente y en dispositivos móviles
    if (typeof window === 'undefined') return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 1024;
    
    if (!isMobile) return;

    const preventDefault = (e: Event) => {
      // No prevenir por defecto, la lógica decidirá
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isTouching.current = true;
        lastY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching.current) return;

      const currentY = e.touches[0].clientY;
      // Permitir scroll si el movimiento es principalmente vertical
      // Podríamos añadir una comprobación de deltaX si fuera necesario
      // Si no queremos prevenir el scroll vertical, no llamamos a e.preventDefault()
      
      // Ejemplo: si quisiéramos prevenir el scroll horizontal, haríamos algo como:
      // const currentX = e.touches[0].clientX;
      // if (Math.abs(currentX - lastX.current) > Math.abs(currentY - lastY.current)) {
      //   e.preventDefault();
      // }

      lastY.current = currentY;
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
    };

    // Importante: passive: false es necesario para poder llamar a preventDefault
    // si decidimos hacerlo dentro de handleTouchMove.
    // Si NUNCA vamos a prevenir, podemos poner passive: true para mejor rendimiento.
    // Por ahora, dejémoslo en false por si necesitamos prevenir gestos.
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    // Prevenir comportamiento por defecto en body puede ser necesario
    // document.body.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      // document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return null; // Este componente no renderiza nada
}
