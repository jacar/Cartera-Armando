"use client";

import { useEffect } from 'react';

/**
 * Solución para habilitar scroll táctil en dispositivos móviles
 * Asegura que los eventos táctiles no sean bloqueados por otras capas o componentes
 */
export default function MobileScrollFix() {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;
    
    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 1024;
    
    if (!isMobile) return; // Solo aplicar en dispositivos móviles

    // Permitir scroll nativo eliminando cualquier bloqueo
    const enableNativeScroll = () => {
      // 1. Aplicar configuraciones globales para permitir scroll táctil nativo
      document.documentElement.style.cssText += '; overflow: auto !important; height: auto !important;';
      document.body.style.cssText += '; overflow: auto !important; height: auto !important; overscroll-behavior: auto !important;';
      document.body.style.touchAction = 'auto';
      document.documentElement.style.touchAction = 'auto';
      
      // 2. Remover cualquier estilo fixed de cuerpo que pueda bloquear scroll
      document.body.classList.remove('fixed', 'overflow-hidden', 'no-scroll');
      
      // 3. Eliminar cualquier manejador de eventos que prevenga el comportamiento predeterminado
      const originalPreventDefault = Event.prototype.preventDefault;
      Event.prototype.preventDefault = function() {
        if (this.type !== 'touchmove' && this.type !== 'touchstart' && this.type !== 'wheel') {
          originalPreventDefault.call(this);
        }
      };
      
      // 4. Asegurar que todos los contenedores principales permitan scroll
      const mainElements = document.querySelectorAll('main, [role="main"], #__next, #root');
      mainElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.cssText += '; overflow: visible !important; height: auto !important;';
          el.style.touchAction = 'auto';
        }
      });
    };

    // Ejecutar la corrección inmediatamente
    enableNativeScroll();
    
    // También ejecutar después de cada cambio en el DOM que podría afectar el scroll
    const observer = new MutationObserver(() => {
      enableNativeScroll();
    });
    
    observer.observe(document.body, { 
      subtree: true, 
      childList: true,
      attributes: true, 
      attributeFilter: ['style', 'class']
    });

    // Agregar event listeners con passive: true para mejorar rendimiento
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    document.addEventListener('wheel', () => {}, { passive: true });
    
    return () => {
      // Restaurar comportamientos por defecto al desmontar
      observer.disconnect();
      
      // Restaurar el método original preventDefault
      if (Event.prototype.preventDefault.__proto__) {
        Event.prototype.preventDefault = Event.prototype.preventDefault.__proto__;
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
