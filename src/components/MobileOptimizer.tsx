"use client";

import { useEffect } from "react";
import { initMobileOptimizations } from "@/lib/mobile-optimization";

interface Window {
  frameMotionAnimations?: boolean;
}

/**
 * Componente que aplica optimizaciones específicas para dispositivos móviles.
 * Desactiva animaciones pesadas y asegura navegación táctil fluida.
 */
export default function MobileOptimizer(): null {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;
    
    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 1024;
    
    // Solo aplicar en dispositivos móviles
    if (!isMobile) return;
    
    // Inicializar optimizaciones para móviles
    try {
      initMobileOptimizations();
    } catch (e) {
      console.warn('Error al inicializar optimizaciones móviles:', e);
    }
    
    // 1. Desactivar completamente las animaciones de Framer Motion en móviles
    const disableFramerMotionAnimations = () => {
      // Aplicar clase global para identificar dispositivos móviles
      document.documentElement.classList.add('mobile-device');
      
      // Crear estilos que deshabiliten todas las animaciones en dispositivos móviles
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 1024px) {
          /* Deshabilitar todas las animaciones y transiciones */
          .mobile-device * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
          
          /* Quitar efectos de parallax y animaciones pesadas */
          .mobile-device [data-framer-name], 
          .mobile-device [data-motion], 
          .mobile-device .parallax-effect,
          .mobile-device .heavy-animation {
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
          
          /* Configuraciones específicas para scroll suave */
          body, html {
            height: auto !important;
            overflow-y: auto !important;
            position: static !important;
            overscroll-behavior-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Opcional: Deshabilitar programáticamente las animaciones de Framer Motion
      try {
        // @ts-ignore - Intentar acceder a la propiedad global si existe
        if (window.frameMotionAnimations !== undefined) {
          // @ts-ignore
          window.frameMotionAnimations = false;
        }
      } catch (e) {
        // No hacer nada si la propiedad no existe
      }
    };
    
    // 2. Forzar configuraciones para garantizar scroll táctil
    const forceNativeTouchScroll = () => {
      // Asegurar configuración adecuada para scroll táctil
      document.documentElement.style.cssText += '; touch-action: auto !important;';
      document.body.style.cssText += '; touch-action: auto !important; -webkit-overflow-scrolling: touch !important;';
      
      // Quitar clases que puedan bloquear el scroll
      document.body.classList.remove(
        'overflow-hidden', 'fixed', 'no-scroll', 'scroll-locked'
      );
      
      // Asegurar que el contenedor principal permita scroll
      const mainContainer = document.querySelector('main') || 
                            document.querySelector('#__next') || 
                            document.querySelector('#root');
      if (mainContainer instanceof HTMLElement) {
        mainContainer.style.cssText += '; overflow: auto !important; height: auto !important;';
      }
    };
    
    // Aplicar todas las optimizaciones
    disableFramerMotionAnimations();
    forceNativeTouchScroll();
    
    // Re-aplicar después de cambios en el DOM
    const observer = new MutationObserver(() => {
      forceNativeTouchScroll();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // 3. Corregir comportamiento de preventDefault en eventos táctiles
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'touchstart' || type === 'touchmove' || type === 'wheel') {
        if (typeof options === 'object') {
          options.passive = true;
        } else {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    return () => {
      observer.disconnect();
      // Restaurar comportamiento original de addEventListener
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, []);
  
  // Este componente no renderiza nada visible
  return null;
}
