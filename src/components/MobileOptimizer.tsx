"use client";

import { useEffect } from "react";
import { initMobileOptimizations } from "@/lib/mobile-optimization";

/**
 * Componente que aplica optimizaciones específicas para dispositivos móviles.
 * No renderiza ningún elemento visual, solo ejecuta código en el cliente.
 */
export default function MobileOptimizer() {
  useEffect(() => {
    // Inicializar optimizaciones para móviles
    initMobileOptimizations();
    
    // Desactivar cualquier comportamiento que bloquee el scroll táctil
    const enableMobileScroll = () => {
      // Asegurar que el cuerpo del documento permita scroll táctil
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.touchAction = 'pan-y';
      
      // Asegurar que eventos táctiles pasen correctamente
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
      document.addEventListener('wheel', () => {}, { passive: true });
    };
    
    enableMobileScroll();
    
    // Re-aplicar después de cambios potenciales en el DOM
    const observer = new MutationObserver(() => {
      setTimeout(enableMobileScroll, 100);
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Este componente no renderiza nada visible
  return null;
}
