/**
 * Script de optimización para dispositivos móviles
 * 
 * Este script mejora el rendimiento y la experiencia de usuario en dispositivos móviles:
 * 1. Optimiza el manejo de eventos táctiles
 * 2. Desactiva animaciones pesadas en dispositivos móviles
 * 3. Añade soporte explícito para scroll táctil
 */

export function initMobileOptimizations() {
  // Solo ejecutar en el cliente
  if (typeof window === 'undefined') return;
  
  // Verificar si es un dispositivo móvil
  const isMobile = window.innerWidth <= 1024 || 
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Añadir clases específicas para optimización móvil
    document.documentElement.classList.add('is-mobile-device');
    
    // Asegurar que el scroll funcione correctamente en iOS
    document.addEventListener('touchmove', function(e) {
      // Permitir el desplazamiento vertical predeterminado
    }, { passive: true });
    
    // Desactivar eventos que podrían interferir con el scroll
    const preventScrollInterference = () => {
      const allPotentialInterferenceElements = document.querySelectorAll('.pointer-events-auto, [style*="pointer-events"]');
      
      allPotentialInterferenceElements.forEach(element => {
        // Excepciones: elementos que necesitan mantener interacción
        const isInteractive = element.tagName === 'BUTTON' || 
                             element.tagName === 'A' || 
                             element.tagName === 'INPUT' ||
                             element.tagName === 'SELECT';
        
        if (!isInteractive && window.getComputedStyle(element).position === 'fixed') {
          element.style.pointerEvents = 'none';
        }
      });
    };
    
    // Aplicar optimizaciones después de cargar la página
    window.addEventListener('load', preventScrollInterference);
    
    // También aplicar después de cambios en el DOM
    const observer = new MutationObserver(preventScrollInterference);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Configurar un viewport con comportamiento táctil mejorado
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }
}
