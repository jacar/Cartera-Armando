/**
 * Optimizaciones específicas para dispositivos móviles
 * Este módulo contiene funciones que mejoran el rendimiento y la experiencia de usuario en dispositivos móviles
 */

/**
 * Inicializa todas las optimizaciones necesarias para dispositivos móviles
 * Se encarga de mejorar el rendimiento y eliminar problemas comunes en navegadores móviles
 */
export function initMobileOptimizations(): void {
  if (typeof window === 'undefined') return;

  // Detección de dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 1024;

  if (!isMobile) return;

  // 1. Optimizar eventos táctiles para evitar retrasos
  optimizeTouchEvents();
  
  // 2. Reducir uso de memoria y mejorar rendimiento
  optimizeMemoryUsage();
  
  // 3. Corregir problemas comunes de visualización
  fixCommonMobileIssues();
  
  // 4. Mejorar carga de imágenes
  optimizeImageLoading();

  console.log('✅ Optimizaciones móviles inicializadas correctamente');
}

/**
 * Optimiza eventos táctiles para eliminar retardos
 */
function optimizeTouchEvents(): void {
  // Forzar todos los eventos táctiles a ser pasivos para mejorar rendimiento de scroll
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
  document.addEventListener('wheel', () => {}, { passive: true });
  
  // Configurar propiedades de CSS para mejorar experiencia táctil
  document.documentElement.style.cssText += `
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: none;
  `;
}

/**
 * Optimiza el uso de memoria en dispositivos móviles
 */
function optimizeMemoryUsage(): void {
  // Reducir animaciones y efectos visuales en móviles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      
      .heavy-animation, .parallax-effect {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Limitar el número de eventos en cola
  const originalRAF = window.requestAnimationFrame;
  let rafQueue: number[] = [];
  
  window.requestAnimationFrame = (callback) => {
    // Limitar cola de animaciones a 10 para evitar sobrecarga
    if (rafQueue.length > 10) {
      const oldestRequest = rafQueue.shift();
      if (oldestRequest) cancelAnimationFrame(oldestRequest);
    }
    
    const request = originalRAF(callback);
    rafQueue.push(request);
    return request;
  };
}

/**
 * Corrige problemas comunes en navegadores móviles
 */
function fixCommonMobileIssues(): void {
  // Corregir el problema del 100vh en navegadores móviles
  const setMobileHeight = () => {
    document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight * 0.01}px`);
  };
  
  setMobileHeight();
  window.addEventListener('resize', setMobileHeight);
  
  // Corregir problemas con elementos fixed y el teclado en dispositivos móviles
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      document.body.classList.add('input-focused');
    });
    
    input.addEventListener('blur', () => {
      document.body.classList.remove('input-focused');
    });
  });
  
  // Asegurar que los scrollable containers funcionan correctamente
  document.querySelectorAll('.scrollable').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.webkitOverflowScrolling = 'touch';
      el.style.overflowY = 'scroll';
    }
  });
}

/**
 * Optimiza la carga de imágenes para mejorar rendimiento
 */
function optimizeImageLoading(): void {
  // Implementar lazy loading para imágenes
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('data-no-lazy')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  // Reducir calidad de imágenes en dispositivos de baja potencia
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    document.querySelectorAll('img:not([data-high-quality])').forEach(img => {
      if (img.src.includes('?')) {
        img.src = `${img.src}&quality=70`;
      } else {
        img.src = `${img.src}?quality=70`;
      }
    });
  }
}
