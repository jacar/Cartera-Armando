"use client";

/**
 * Módulo que contiene optimizaciones avanzadas para el rendimiento de la aplicación
 * - Optimiza la carga de scripts y recursos
 * - Implementa técnicas de lazy loading de componentes
 * - Mejora el tiempo de primera carga
 * - Optimiza el rendimiento de renderizado
 */

// Optimiza la carga de recursos para que no bloqueen el renderizado
export function optimizeResourceLoading(): void {
  if (typeof window === "undefined") return;

  // Priorizar renderizado visible primero
  if ("requestIdleCallback" in window) {
    // Usar requestIdleCallback para cargar recursos no críticos durante tiempo inactivo
    const deferredScripts = Array.from(
      document.querySelectorAll('script[data-defer="true"]'),
    );
    if (deferredScripts.length > 0) {
      window.requestIdleCallback(
        () => {
          deferredScripts.forEach((script) => {
            if (script instanceof HTMLScriptElement) {
              const clone = document.createElement("script");
              Array.from(script.attributes).forEach((attr) => {
                if (attr.name !== "data-defer") {
                  clone.setAttribute(attr.name, attr.value);
                }
              });
              clone.textContent = script.textContent;
              script.parentNode?.replaceChild(clone, script);
            }
          });
        },
        { timeout: 2000 },
      );
    }
  }

  // Precargar recursos visibles en el viewport
  if ("IntersectionObserver" in window) {
    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element instanceof HTMLImageElement && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute("data-src");
          } else if (
            element instanceof HTMLElement &&
            element.dataset.backgroundSrc
          ) {
            element.style.backgroundImage = `url(${element.dataset.backgroundSrc})`;
            element.removeAttribute("data-background-src");
          }
          observer.unobserve(element);
        }
      });
    };

    const lazyLoadObserver = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px",
      threshold: 0.01,
    });

    document
      .querySelectorAll("[data-src], [data-background-src]")
      .forEach((el) => {
        lazyLoadObserver.observe(el);
      });
  }
}

// Optimiza el renderizado inicial para el SEO y primera visualización
export function optimizeInitialRender(): void {
  if (typeof window === "undefined") return;

  // Establecer atributos rel=preconnect para orígenes externos importantes
  const importantDomains = [
    "https://www.webcincodev.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  importantDomains.forEach((domain) => {
    const linkExists = document.querySelector(
      `link[rel="preconnect"][href="${domain}"]`,
    );
    if (!linkExists) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  });

  // Optimizar imágenes para carga rápida
  document.querySelectorAll("img:not([loading])").forEach((img) => {
    if (img instanceof HTMLImageElement) {
      // Añadir loading="lazy" a imágenes que no estén en el viewport inicial
      if (!isElementInViewport(img)) {
        img.loading = "lazy";

        // Para imágenes que deben cargarse después, utilizar data-src
        if (!img.dataset.src && !img.hasAttribute("loading")) {
          img.dataset.src = img.src;
          img.removeAttribute("src");
        }
      } else {
        // Imágenes en el viewport inicial deben cargarse inmediatamente
        img.loading = "eager";
        img.fetchPriority = "high";
      }
    }
  });
}

// Evalúa si un elemento está en el viewport
function isElementInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Optimiza la renderización de componentes React
export function optimizeReactRendering(): void {
  if (typeof window === "undefined") return;

  // Crear estilos para optimizar la renderización
  const style = document.createElement("style");
  style.textContent = `
    /* Optimizaciones para mejorar el rendimiento de renderizado */
    img, video {
      content-visibility: auto;
    }
    
    /* Prevenir reflow y repaint durante animaciones */
    .animate-item, .motion-element {
      transform: translateZ(0);
      will-change: transform, opacity;
      backface-visibility: hidden;
    }
    
    /* Aplicar solo en componentes que tienen animaciones */
    @media (max-width: 1024px) {
      .motion-container {
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }
    }
    
    /* Optimizar para rendimiento de componentes estáticos */
    .static-component {
      content-visibility: auto;
      contain: layout style paint;
    }
  `;
  document.head.appendChild(style);

  // Aplicar optimizaciones para reducir repintados
  document
    .querySelectorAll(".scroll-container, .scroll-view")
    .forEach((container) => {
      if (container instanceof HTMLElement) {
        container.style.transform = "translateZ(0)";
        container.style.backfaceVisibility = "hidden";
      }
    });
}

// Detecta y corrige problemas de memoria y fugas en React
export function detectMemoryLeaks(): void {
  if (
    typeof window === "undefined" ||
    typeof window.performance === "undefined"
  )
    return;

  // Monitorear el uso de memoria si está disponible
  if ("memory" in window.performance) {
    const memoryInfo = (window.performance as any).memory;
    if (memoryInfo) {
      const memoryThreshold = memoryInfo.jsHeapSizeLimit * 0.8;

      // Comprobar si estamos cerca del límite de memoria
      if (memoryInfo.usedJSHeapSize > memoryThreshold) {
        console.warn(
          "⚠️ Alto uso de memoria detectado. Ejecutando limpieza de emergencia.",
        );

        // Intentar liberar memoria no utilizada
        if (typeof window.gc === "function") {
          try {
            (window as any).gc();
          } catch (e) {
            // No hacer nada si gc() no está disponible
          }
        }
      }
    }
  }

  // Establecer un monitoreo periódico del rendimiento
  let frameDrops = 0;
  let lastFrameTime = performance.now();

  const checkFrameRate = () => {
    const now = performance.now();
    const frameDuration = now - lastFrameTime;

    // Si un frame toma más de 33ms (menos de 30fps), lo consideramos una caída
    if (frameDuration > 33) {
      frameDrops++;

      // Si detectamos muchas caídas de frames consecutivas, aplicar optimizaciones
      if (frameDrops > 5) {
        console.warn(
          "⚠️ Rendimiento bajo detectado. Aplicando optimizaciones de emergencia.",
        );

        // Reducir complejidad visual
        document.documentElement.classList.add("performance-mode");

        // Aplicar estilos de emergencia
        const emergencyStyle = document.createElement("style");
        emergencyStyle.textContent = `
          .performance-mode * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
          
          .performance-mode video,
          .performance-mode canvas,
          .performance-mode iframe {
            display: none !important;
          }
        `;
        document.head.appendChild(emergencyStyle);

        // Reiniciar contador
        frameDrops = 0;
      }
    } else {
      // Resetear contador si el rendimiento es bueno
      frameDrops = Math.max(0, frameDrops - 1);
    }

    lastFrameTime = now;

    // Continuar monitoreando
    requestAnimationFrame(checkFrameRate);
  };

  // Iniciar monitoreo
  requestAnimationFrame(checkFrameRate);
}

// Inicializar todas las optimizaciones
export function initializeAllOptimizations(): void {
  if (typeof window === "undefined") return;

  // Esperar a que la página termine de cargar para aplicar optimizaciones no críticas
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyOptimizations);
  } else {
    applyOptimizations();
  }

  // Aplicar optimizaciones de forma secuencial
  function applyOptimizations() {
    // 1. Optimizar el renderizado inicial inmediatamente
    optimizeInitialRender();

    // 2. Optimizar la carga de recursos después del contenido principal
    setTimeout(() => {
      optimizeResourceLoading();
    }, 0);

    // 3. Optimizar el renderizado de React después de la primera interacción
    setTimeout(() => {
      optimizeReactRendering();
    }, 100);

    // 4. Iniciar detección de problemas de memoria después de la carga completa
    setTimeout(() => {
      detectMemoryLeaks();
    }, 2000);
  }
}

// Exportar la API pública
export default {
  optimizeResourceLoading,
  optimizeInitialRender,
  optimizeReactRendering,
  detectMemoryLeaks,
  initializeAllOptimizations,
};
