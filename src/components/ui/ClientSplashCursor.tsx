"use client";
import { useEffect, useState } from "react";
import { isMobile } from "@/lib/utils";
import dynamic from "next/dynamic";

// Usar importación dinámica estándar de Next.js para evitar errores
const SplashCursor = dynamic(() => import("@/components/ui/splash-cursor").then(mod => mod.SplashCursor), {
  ssr: false,
  loading: () => null
});

export default function ClientSplashCursor() {
  const [isMobileDevice, setIsMobileDevice] = useState(true); // Por defecto asumimos móvil hasta comprobarlo
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;
    
    // Utilizar la función isMobile mejorada que considera user agent y viewport
    const checkMobile = () => {
      const mobileState = isMobile();
      setIsMobileDevice(mobileState);
      setShouldRender(!mobileState);
    };
    
    // Comprobar al montar
    checkMobile();
    
    // Actualizar en cambios de tamaño
    const debouncedResize = debounce(checkMobile, 200);
    window.addEventListener("resize", debouncedResize);
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // No renderizar nada en dispositivos móviles
  if (isMobileDevice || !shouldRender) return null;
  
  // Usar el componente dinámico directamente (ya incluye manejo de carga)
  return <SplashCursor colorMode="dark" />;
  
}

// Función de debounce para evitar ejecuciones frecuentes en resize
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
