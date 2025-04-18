"use client";

import { useEffect } from 'react';

/**
 * Solución de emergencia para forzar el scroll táctil en dispositivos móviles
 * Aplica una solución directa al problema de scroll en móviles
 */
export default function MobileScrollFix() {
  useEffect(() => {
    // Solo ejecutar en el cliente y en dispositivos móviles
    if (typeof window === 'undefined') return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 1024;
    
    if (!isMobile) return;
    
    // Solución radical: eliminar cualquier listener que pueda estar interfiriendo
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    
    // Restringir eventos que podrían bloquear el scroll
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'touchstart' || type === 'touchmove' || type === 'wheel') {
        // Asegurar que todos los eventos táctiles sean pasivos
        const newOptions = options || {};
        if (typeof newOptions === 'object') {
          newOptions.passive = true;
        } else {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Forzar el comportamiento de scroll nativo
    document.documentElement.style.cssText = `
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      touch-action: pan-y !important;
      position: static !important;
      height: auto !important;
      overscroll-behavior-y: auto !important;
    `;
    
    document.body.style.cssText = `
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      touch-action: pan-y !important;
      position: static !important;
      height: auto !important;
      overscroll-behavior-y: auto !important;
    `;
    
    // Eliminar cualquier overflow: hidden que pueda estar bloqueando el scroll
    const elements = document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' && el.id !== 'headerFixed') {
        el.style.pointerEvents = 'none';
      }
      if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
        el.style.overflow = 'visible';
        el.style.overflowY = 'auto';
      }
    }
    
    // Aplicar una solución CSS directa a través de un estilo global
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      html, body {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        touch-action: pan-y !important;
        overscroll-behavior-y: auto !important;
        height: auto !important;
      }
      
      * {
        -webkit-tap-highlight-color: transparent;
      }
      
      .pointer-events-none {
        pointer-events: none !important;
      }
      
      [style*="position: fixed"] {
        pointer-events: none !important;
      }
      
      /* Excepción para elementos interactivos específicos */
      button, a, input, select, textarea, [role="button"] {
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(styleEl);
  }, []);
  
  return null;
}
