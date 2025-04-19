"use client";

import { useEffect, useState, useRef } from "react";
import { isMobile } from "@/lib/utils";

interface WindowWithCustomProps extends Window {
  frameMotionAnimations?: boolean;
  _originalAddEventListener?: typeof EventTarget.prototype.addEventListener;
  _optimizationsApplied?: boolean;
}

declare const window: WindowWithCustomProps;

/**
 * Componente unificado que aplica todas las optimizaciones necesarias para dispositivos móviles
 * - Optimiza la carga de recursos
 * - Mejora el rendimiento del scroll táctil
 * - Desactiva animaciones innecesarias en dispositivos móviles
 * - Aplica prácticas recomendadas para eventos táctiles
 */
export default function MobileOptimizer(): null {
  // Referencias para mantener estado entre renderizados
  const optimizationsApplied = useRef(false);
  const originalAddEventListener = useRef<typeof EventTarget.prototype.addEventListener | null>(null);
  const originalPreventDefault = useRef<typeof Event.prototype.preventDefault | null>(null);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Evitar aplicar optimizaciones múltiples veces
    if (window._optimizationsApplied) return;

    // Verificar si es un dispositivo móvil
    const isMobileDevice = isMobile();

    // Solo aplicar optimizaciones en dispositivos móviles
    if (!isMobileDevice) return;

    // Marcar que las optimizaciones ya se aplicaron
    window._optimizationsApplied = true;

    // Aplicar optimizaciones inmediatamente, pero en un contexto asíncrono para no bloquear
    setTimeout(() => {
      try {
        // 1. Optimizar la carga de recursos
        optimizeResourceLoading();

        // 2. Desactivar animaciones en dispositivos móviles
        disableAnimationsOnMobile();

        // 3. Optimizar scroll táctil
        optimizeTouchScroll();

        // 4. Configurar eventos táctiles como pasivos
        setupPassiveEventListeners();

        // 5. Precarga inteligente de recursos críticos
        prefetchCriticalResources();

        // 6. Aplicar fixes específicos para dispositivos móviles
        applyMobileSpecificFixes();

        optimizationsApplied.current = true;
        console.log('✅ Optimizaciones móviles aplicadas correctamente');
      } catch (e) {
        console.error('❌ Error al aplicar optimizaciones móviles:', e);
        // Intentar aplicar optimizaciones básicas de emergencia
        applyEmergencyOptimizations();
      }
    }, 0);

    // Optimizar la carga de recursos para evitar bloqueos
    function optimizeResourceLoading() {
      // Agregar un atributo para identificar dispositivos móviles
      document.documentElement.classList.add('mobile-device');

      // Configurar el comportamiento de carga de imágenes
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            if (entry.target.dataset.src) {
              entry.target.src = entry.target.dataset.src;
              entry.target.removeAttribute('data-src');
            }
            imgObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px' }); // Precargar imágenes antes de que sean visibles

      // Observar todas las imágenes con data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });

      // Evitar el uso excesivo de will-change
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 1024px) {
          /* Optimizar la carga de recursos */
          img:not([loading]), video:not([loading]) {
            content-visibility: auto;
          }

          /* Reemplazar will-change con transform hints más específicos */
          .animate-item {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
            will-change: auto !important;
          }

          /* Optimizar rendimiento de imágenes */
          img, video {
            will-change: auto !important;
            content-visibility: auto;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Deshabilita animaciones en móviles para mejorar rendimiento
    function disableAnimationsOnMobile() {
      // Crear estilos para deshabilitar animaciones en móviles
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 1024px) {
          /* Deshabilitar todas las animaciones y transiciones en móviles */
          .mobile-device * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          /* Optimizaciones específicas para componentes con animaciones */
          .mobile-device [data-framer-name],
          .mobile-device [data-motion],
          .mobile-device .parallax-effect,
          .mobile-device .animate-in,
          .mobile-device .animate-out,
          .mobile-device .heavy-animation {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `;
      document.head.appendChild(style);

      // Configurar Framer Motion para que no anime en móviles
      try {
        // @ts-ignore
        window.frameMotionAnimations = false;
        // Intentar establecer una variable global para que otros componentes sepan
        // que las animaciones están deshabilitadas
        window.DISABLE_ANIMATIONS = true;
      } catch (e) {
        // Ignorar errores si la propiedad no es accesible
      }
    }

    // Optimizar comportamiento de scroll táctil
    function optimizeTouchScroll() {
      // Configurar propiedades CSS para scroll táctil fluido
      document.documentElement.style.cssText += `
        overflow-x: hidden !important;
        overflow-y: auto !important;
        overscroll-behavior-y: contain !important;
        -webkit-overflow-scrolling: touch !important;
        touch-action: pan-y !important;
        height: 100% !important;
        position: static !important;
      `;

      document.body.style.cssText += `
        overflow-x: hidden !important;
        overflow-y: auto !important;
        overscroll-behavior-y: contain !important;
        -webkit-overflow-scrolling: touch !important;
        touch-action: pan-y !important;
        height: auto !important;
        position: static !important;
      `;

      // Quitar cualquier clase que pueda bloquear el scroll
      const scrollBlockingClasses = [
        'overflow-hidden', 'fixed', 'no-scroll', 'scroll-locked',
        'scroll-disabled', 'scroll-blocked', 'no-overflow'
      ];

      scrollBlockingClasses.forEach(className => {
        document.body.classList.remove(className);
        document.documentElement.classList.remove(className);
      });

      // Aplicar configuraciones a todos los contenedores principales
      const mainContainers = [
        document.querySelector('main'),
        document.querySelector('#__next'),
        document.querySelector('#root'),
        document.querySelector('[data-main-content]'),
        document.querySelector('.main-content'),
        ...Array.from(document.querySelectorAll('.scroll-container'))
      ];

      mainContainers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.style.cssText += `
            overflow: visible !important;
            height: auto !important;
            position: relative !important;
            overscroll-behavior: auto !important;
            -webkit-overflow-scrolling: touch !important;
          `;
        }
      });

      // Corregir comportamiento de preventDefault en eventos táctiles
      if (Event.prototype.preventDefault) {
        originalPreventDefault.current = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function(this: Event) {
          if (this.type !== 'touchmove' && this.type !== 'touchstart' && this.type !== 'wheel') {
            originalPreventDefault.current?.call(this);
          }
        };
      }
    }

    // Aplicar optimizaciones mínimas de emergencia si algo falla
    function applyEmergencyOptimizations() {
      console.warn('⚠️ Aplicando optimizaciones de emergencia');

      // Marcar el modo de emergencia
      document.documentElement.classList.add('emergency-mode');
      
      // Configuraciones CSS críticas mínimas
      const emergencyStyles = document.createElement('style');
      emergencyStyles.textContent = `
        /* Optimizaciones críticas de emergencia */
        * { 
          animation: none !important; 
          transition: none !important;
          transform: none !important;
          will-change: auto !important;
        }
        
        html, body {
          overflow: auto !important;
          height: auto !important;
          position: static !important;
          touch-action: auto !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: auto !important;
        }
        
        img, video, iframe {
          content-visibility: auto;
        }
      `;
      document.head.appendChild(emergencyStyles);
      
      // Asegurar propiedades esenciales de scroll
      document.documentElement.style.cssText += `
        overflow: auto !important;
        height: auto !important;
        touch-action: auto !important;
        -webkit-overflow-scrolling: touch !important;
      `;
      
      document.body.style.cssText += `
        overflow: auto !important;
        height: auto !important;
        touch-action: auto !important;
        -webkit-overflow-scrolling: touch !important;
      `;
      
      // Eliminar clases que puedan bloquear scroll
      ['overflow-hidden', 'fixed', 'no-scroll', 'scroll-locked'].forEach(cls => {
        document.body.classList.remove(cls);
        document.documentElement.classList.remove(cls);
      });
      
      // Asegurar que los eventos touch sean pasivos
      ['touchstart', 'touchmove', 'wheel'].forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
      });
    }
    
    // Configurar un observador para reactivar optimizaciones si el DOM cambia
    const observer = new MutationObserver((mutations) => {
      if (optimizationsApplied.current) {
        // Comprobar si alguna mutación afecta a clases que podrían bloquear el scroll
        const needsReoptimization = mutations.some(mutation => {
          if (mutation.type === 'attributes' && 
              (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            const target = mutation.target as HTMLElement;
            const hasBlockingClass = ['fixed', 'overflow-hidden', 'no-scroll'].some(cls => 
              target.classList?.contains(cls)
            );
            const hasBlockingStyle = target.style?.overflow === 'hidden' || 
                                  target.style?.position === 'fixed';
                                  
            return hasBlockingClass || hasBlockingStyle;
          }
          return false;
        });
        
        if (needsReoptimization) {
          // Solo volver a aplicar las optimizaciones de scroll si es necesario
          optimizeTouchScroll();
        }
      }
    });
    
    // Observar cambios en atributos relevantes
    observer.observe(document.body, { 
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Limpieza al desmontar
    return () => {
      observer.disconnect();
      
      // Restaurar comportamientos originales
      if (typeof EventTarget !== 'undefined' && originalAddEventListener.current) {
        EventTarget.prototype.addEventListener = originalAddEventListener.current;
      }
      
      if (typeof Event !== 'undefined' && originalPreventDefault.current) {
        Event.prototype.preventDefault = originalPreventDefault.current;
      }
    };
  }, []);
  
  // Este componente no renderiza nada visible
  return null;
}

// Exportar una utilidad para verificar si es un entorno móvil
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 1024;
}
