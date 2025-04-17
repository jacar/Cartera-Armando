"use client";
import { useEffect, useState } from "react";
import { SplashCursor } from "@/components/ui/splash-cursor";

export default function ClientSplashCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;
  return <SplashCursor colorMode="dark" />;
}
