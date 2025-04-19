"use client";
import { useEffect, useState } from "react";
import { SplashCursor } from "@/components/ui/splash-cursor";

export default function ClientSplashCursor() {
  const [isMobile, setIsMobile] = useState(true); // Por defecto asumimos móvil hasta que se compruebe

  useEffect(() => {
    // Desactivamos completamente en móviles y tablets para mejorar rendimiento y evitar problemas de scroll
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // No renderizamos nada en dispositivos móviles o tablets
  if (isMobile) return null;
  return <SplashCursor colorMode="dark" />;
}
