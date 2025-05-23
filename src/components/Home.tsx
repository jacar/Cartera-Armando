"use client";

import { motion } from "framer-motion";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Squares } from "@/components/ui/squares-background";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import {
  GithubLogo,
  Article,
  Coffee,
  BehanceLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import MobileHeroSlider from "@/components/ui/MobileHeroSlider";
import { isMobile } from "@/lib/utils";

// Lazy load SplineScene con mayor prioridad de carga y mejor UX
const LazySplineScene = dynamic(
  () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-zinc-100/20 backdrop-blur-sm dark:bg-zinc-900/30">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-24 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      </div>
    ),
  },
);

// Pre-cargar componentes que se mostrarán inmediatamente
const prefetchComponents = () => {
  if (typeof window !== "undefined") {
    // Prefetch en tiempo inactivo para no bloquear renderizado inicial
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => {
          import("@/components/ui/splite");
          import("@/components/ui/MobileHeroSlider");
        },
        { timeout: 2000 },
      );
    } else {
      setTimeout(() => {
        import("@/components/ui/splite");
        import("@/components/ui/MobileHeroSlider");
      }, 1000);
    }
  }
};

function HomeComponent() {
  const { theme } = useTheme();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoizar URLs de recursos para evitar rerenderings
  const resources = useMemo(
    () => ({
      mobileImage:
        "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-2025-03-11T111412.287.png",
      darkBackground:
        "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Scene-12.png",
      lightBackground:
        "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-2025-03-20T212621.296-1.png",
    }),
    [],
  );

  // Optimización con debounced resize y detección móvil mejorada
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Usar función isMobile optimizada
      const checkMobile = () => {
        setIsMobileDevice(isMobile());
      };
      checkMobile();

      // Pre-cargar componentes de forma óptima
      prefetchComponents();

      // Inicializar estado de carga
      setIsLoaded(true);

      // Usar debounce para mejor rendimiento
      let timeoutId: NodeJS.Timeout;
      const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkMobile, 100);
      };

      window.addEventListener("resize", debouncedResize, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", debouncedResize);
      };
    }
  }, []);

  // Optimizar scrollToWork con useCallback para memorizar función
  const scrollToWork = useCallback(() => {
    if (typeof window !== "undefined") {
      const workSection = document.getElementById("work");
      if (workSection) {
        // Usar scrollIntoView con opciones optimizadas
        workSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  // Usar renderizado estándar para evitar problemas
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pb-[120px] sm:px-6">
      {/* Fondo optimizado */}
      <div
        className="absolute inset-0 z-0 w-screen"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-300"
          style={{
            backgroundImage:
              theme === "dark"
                ? `url('${resources.darkBackground}')`
                : `url('${resources.lightBackground}')`,
            opacity: 0.4,
          }}
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 transition-all duration-300"
            style={{
              opacity: theme === "dark" ? 1 : 0,
            }}
          />
        </motion.div>
      </div>

      <div className="z-10 mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Título a la izquierda, robot a la derecha en escritorio */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="order-1 text-center lg:text-left"
          >
            <div className="mx-auto mb-4 inline-block rounded-full bg-zinc-100 px-4 py-2 dark:bg-[#18181b] sm:mb-6 sm:px-6 lg:mx-0">
              <span className="text-sm text-zinc-900 dark:text-[#c5fb00] sm:text-base">
                Tu web no tiene
              </span>
              <span className="ml-2 text-sm text-zinc-900 dark:text-white sm:text-base">
                por qué ser aburrida
              </span>
            </div>
            {/* Slider hero solo para móvil - Carga condicional */}
            {isMobileDevice ? (
              isLoaded && <MobileHeroSlider />
            ) : (
              <h1 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-7xl">
                Diseño y<br />
                Desarrollo
                <br />
                <span>Web</span>
              </h1>
            )}
            {/* Título llamativo solo para móvil - Con renderizado condicional */}
            {isMobileDevice && isLoaded && (
              <h1 className="mb-4 animate-pulse px-2 text-center text-[2.2rem] font-extrabold leading-tight text-white drop-shadow-lg">
                ¡Transforma tu idea
                <br />
                en una web impactante!
              </h1>
            )}
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start sm:gap-8 lg:mt-12 lg:justify-start">
              <div className="flex w-full flex-col gap-4 sm:w-auto">
                <motion.a
                  href="https://wa.me/573052891719"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="mx-auto flex w-full items-center justify-center gap-2 rounded-md border border-black bg-white px-6 py-3 text-sm text-black transition-colors hover:bg-zinc-100 dark:border-[#c5fb00] dark:bg-black dark:text-[#c5fb00] dark:hover:bg-zinc-900 sm:w-fit sm:justify-start lg:mx-0"
                >
                  Contáctame <ArrowRight size={20} />
                </motion.a>
                <div className="space-y-4">
                  <p className="mx-auto max-w-md text-center text-sm text-gray-400 lg:mx-0 lg:text-left">
                    Mi objetivo es asegurarme de que su sitio web esté
                    actualizado, seguro y brinde una experiencia de usuario
                    excepcional.
                  </p>
                  <div className="flex items-center justify-center gap-6 sm:justify-start sm:gap-4">
                    <Link
                      href="https://github.com/jacar"
                      target="_blank"
                      className="text-black transition-colors hover:text-zinc-600 dark:text-[#c5fb00] dark:hover:text-white"
                    >
                      <GithubLogo size={24} weight="fill" />
                    </Link>
                    <Link
                      href="https://www.webcincodev.com/blog/"
                      target="_blank"
                      className="text-black transition-colors hover:text-zinc-600 dark:text-[#c5fb00] dark:hover:text-white"
                    >
                      <Article size={24} weight="fill" />
                    </Link>
                    <Link
                      href="https://buymeacoffee.com/webcincodev"
                      target="_blank"
                      className="text-black transition-colors hover:text-zinc-600 dark:text-[#c5fb00] dark:hover:text-white"
                    >
                      <Coffee size={24} weight="fill" />
                    </Link>
                    <Link
                      href="https://www.behance.net/webcincovalle"
                      target="_blank"
                      className="text-black transition-colors hover:text-zinc-600 dark:text-[#c5fb00] dark:hover:text-white"
                    >
                      <BehanceLogo size={24} weight="fill" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/webcincodev/"
                      target="_blank"
                      className="text-black transition-colors hover:text-blue-600 dark:text-[#c5fb00] dark:hover:text-blue-500"
                    >
                      <LinkedinLogo size={24} weight="fill" />
                    </Link>
                  </div>
                </div>
              </div>
              <button
                onClick={scrollToWork}
                className="flex w-full items-center justify-center gap-2 text-white transition-colors hover:text-[#c5fb00] sm:w-auto sm:justify-start"
              >
                Ver Proyectos <ChevronDown size={20} />
              </button>
            </div>
          </motion.div>
          {/* Imagen animada robot */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative z-10 order-2 mt-0 flex h-[500px] items-center justify-center overflow-visible sm:mt-0 sm:h-[700px] lg:mt-0"
          >
            <div className="flex h-full w-full items-center justify-center overflow-visible rounded-2xl">
              {isMobileDevice ? (
                <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl">
                  {/* Usar Image de Next.js para optimización automática */}
                  <Image
                    src={resources.darkBackground}
                    alt="Web Development Illustration"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 py-2">
                    <h3 className="px-2 text-center text-base font-semibold text-white sm:text-lg">
                      Tu sitio no tiene por qué ser aburrido
                    </h3>
                  </div>
                </div>
              ) : (
                isLoaded && <LazySplineScene className="h-full w-full" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Exportar el componente directamente para evitar problemas
export default HomeComponent;
