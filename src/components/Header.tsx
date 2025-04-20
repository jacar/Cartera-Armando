"use client";

import { useState, useEffect, memo } from "react";
import { Menu, Linkedin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircleDashed, LinkedinLogo } from "@phosphor-icons/react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Evitar problemas de hidratación SSR y mejorar comportamiento táctil en móviles
  useEffect(() => {
    setMounted(true);

    // Optimizar desplazamiento táctil en móviles
    const optimizeTouchScroll = () => {
      if (typeof window !== "undefined") {
        // Configurar CSS para mejorar scroll táctil
        document.documentElement.style.cssText += `
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
        `;
        document.body.style.cssText += `
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
        `;

        // Configurar eventos táctiles como pasivos para mejor desempeño
        const addPassiveListener = () => {
          document.addEventListener("touchstart", () => {}, { passive: true });
          document.addEventListener("touchmove", () => {}, { passive: true });
          document.addEventListener("wheel", () => {}, { passive: true });
        };

        // Agregar event listeners pasivos
        addPassiveListener();

        // Prevenir bloqueo de scroll en dispositivos iOS
        const mobileNav = document.querySelector(".mobile-nav");
        if (mobileNav) {
          mobileNav.addEventListener(
            "touchmove",
            (e) => {
              e.stopPropagation();
            },
            { passive: true },
          );
        }
      }
    };

    // Aplicar optimizaciones
    optimizeTouchScroll();
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-zinc-100 text-zinc-900 dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          {!mounted ? (
            <div className="h-8 w-[100px] animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          ) : (
            <div className="relative h-12 w-[140px]">
              {theme === "dark" && (
                <Image
                  src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1s.png"
                  alt="Logo Dark"
                  width={140}
                  height={48}
                  priority
                  className="absolute left-0 top-0 h-full w-auto object-contain"
                  onError={(e) => {
                    // Fallback si la imagen falla
                    e.currentTarget.src = "/favicon.ico";
                  }}
                />
              )}
              {theme !== "dark" && (
                <Image
                  src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1e.png"
                  alt="Logo Color"
                  width={140}
                  height={48}
                  priority
                  className="absolute left-0 top-0 h-full w-auto object-contain"
                  onError={(e) => {
                    // Fallback si la imagen falla
                    e.currentTarget.src = "/favicon.ico";
                  }}
                />
              )}
            </div>
          )}
          {/* Fin de la lógica del logo */}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {["INICIO", "SOBRE MÍ", "PROYECTOS", "SERVICIOS", "TESTIMONIOS"].map(
            (item) => {
              const sectionId = {
                INICIO: "/",
                "SOBRE MÍ": "#about",
                PROYECTOS: "#work",
                SERVICIOS: "#services",
                TESTIMONIOS: "#testimonial",
              }[item];

              return (
                <a
                  key={item}
                  href={sectionId}
                  className="text-sm transition-colors hover:text-[#c5fb00]"
                  onClick={(e) => {
                    e.preventDefault();
                    if (sectionId === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      document
                        .querySelector(sectionId)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item}
                </a>
              );
            },
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <LazyMotion features={domAnimation}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="hidden sm:block"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    className="text-[#c5fb00]"
                    fill="currentColor"
                    data-component-name="HeaderComponent"
                  >
                    {/* Icono Luna para modo oscuro */}
                    <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    className="text-black"
                    fill="currentColor"
                    data-component-name="HeaderComponent"
                  >
                    {/* Icono Sol para modo claro */}
                    <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                  </svg>
                )}
              </motion.div>
            </LazyMotion>
            <ThemeToggle />

            <LazyMotion features={domAnimation}>
              <motion.a
                href="https://wa.me/573052891719"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden rounded-md border border-black bg-white px-6 py-2 text-black transition-colors hover:bg-zinc-100 dark:border-[#c5fb00] dark:bg-black dark:text-[#c5fb00] dark:hover:bg-zinc-900 lg:block"
              >
                Hablemos →
              </motion.a>
            </LazyMotion>
          </div>

          <button
            className="rounded-md p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu size={24} className="text-zinc-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              className="mobile-nav fixed left-0 top-0 z-50 h-full w-[280px] overflow-y-auto border-r border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-black lg:hidden"
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  aria-label="Cerrar menú"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-4">
                {[
                  "INICIO",
                  "SOBRE MÍ",
                  "PROYECTOS",
                  "SERVICIOS",
                  "TESTIMONIOS",
                ].map((item) => {
                  const sectionId = {
                    INICIO: "/",
                    "SOBRE MÍ": "#about",
                    PROYECTOS: "#work",
                    SERVICIOS: "#services",
                    TESTIMONIOS: "#testimonial",
                  }[item];

                  return (
                    <a
                      key={item}
                      href={sectionId}
                      className="rounded-md px-4 py-3 text-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        if (sectionId === "/") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          document
                            .querySelector(sectionId)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {item}
                    </a>
                  );
                })}
                <LazyMotion features={domAnimation}>
                  {/* Contenedor de enlaces de redes sociales - Móvil */}
                  <div className="mx-4 mt-4 flex flex-wrap items-center justify-center gap-6">
                    {/* Icono sol/luna para móvil */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="flex items-center justify-center rounded-full p-1"
                    >
                      {theme === "dark" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 256 256"
                          className="text-[#c5fb00]"
                          fill="currentColor"
                          data-component-name="HeaderComponent"
                        >
                          {/* Icono Luna para modo oscuro */}
                          <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 256 256"
                          className="text-black"
                          fill="currentColor"
                          data-component-name="HeaderComponent"
                        >
                          {/* Icono Sol para modo claro */}
                          <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                        </svg>
                      )}
                    </motion.div>

                    <motion.a
                      href="https://wa.me/573052891719"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 rounded-md bg-[#c5fb00] px-6 py-3 text-center text-black transition-colors hover:bg-[#b2e200]"
                    >
                      Hablemos →
                    </motion.a>
                  </div>
                </LazyMotion>
              </nav>
            </motion.div>
          </LazyMotion>
        </>
      )}
    </header>
  );
}

// Memoizar el componente para evitar re-renderizados innecesarios
const Header = memo(HeaderComponent);
export default Header;
