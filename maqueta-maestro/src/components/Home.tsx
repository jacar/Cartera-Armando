"use client";

import { motion } from "framer-motion";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Squares } from "@/components/ui/squares-background";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import {
  GithubLogo,
  Article,
  Coffee,
  BehanceLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const mobileImage =
    "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-2025-03-11T111412.287.png";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  const scrollToWork = () => {
    if (typeof window !== "undefined") {
      const workSection = document.getElementById("work");
      workSection?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center px-6">
      <div
        className="absolute inset-0 z-0 w-screen"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <Squares
          direction="diagonal"
          speed={1.5}
          borderColor="#333"
          squareSize={40}
          hoverFillColor="#222"
          className="opacity-30"
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 transition-all duration-300" />
        </motion.div>

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
          >
            <div className="mb-6 inline-block rounded-full bg-zinc-100 px-6 py-2 dark:bg-[#18181b]">
              <span className="text-zinc-900 dark:text-[#c5fb00]">
                Tu web no tiene
              </span>
              <span className="ml-2 text-zinc-900 dark:text-white">
                por qué ser aburrida
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-7xl">
              Diseño y
              <br />
              Desarrollo
              <br />
              <span className="relative">
                Web
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.span
                        className="absolute -right-4 -top-4"
                        initial={{
                          scale: 0,
                          y: 0,
                        }}
                        animate={{
                          scale: 1,
                          y: [-5, 5, -5],
                        }}
                        transition={{
                          scale: {
                            delay: 0.5,
                            duration: 0.3,
                          },
                          y: {
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <span className="group/tooltip cursor-help text-4xl">
                          👋
                          <div className="fixed left-[calc(50%+100px)] top-1/2 z-50 hidden w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-zinc-100/95 p-6 shadow-2xl backdrop-blur-sm group-hover/tooltip:block dark:border-zinc-800 dark:bg-[#18181b]/95">
                            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                              <img
                                src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/ovalle_.png"
                                alt="Armando Ovalle"
                                className="h-24 w-24 rounded-full border-4 border-[#c5fb00] object-cover shadow-lg shadow-[#c5fb00]/20 md:h-16 md:w-16 md:border-2"
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                  Armando Ovalle
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-gray-400">
                                  Desarrollador Web Senior
                                </p>
                                <div className="mt-4 flex justify-center gap-4 md:justify-start">
                                  <a
                                    href="https://github.com/jacar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-[#c5fb00] dark:hover:text-white"
                                  >
                                    <GithubLogo size={20} weight="fill" />
                                  </a>
                                  <a
                                    href="https://www.webcincodev.com/blog/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-[#c5fb00] dark:hover:text-white"
                                  >
                                    <Article size={20} weight="fill" />
                                  </a>
                                  <a
                                    href="https://www.behance.net/webcincovalle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-[#c5fb00] dark:hover:text-white"
                                  >
                                    <BehanceLogo size={20} weight="fill" />
                                  </a>
                                  <a
                                    href="https://wa.me/573052891719"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-[#c5fb00] dark:hover:text-white"
                                  >
                                    <MessageSquare size={20} />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p className="mt-4 text-sm text-zinc-600 dark:text-gray-300">
                              Apasionado por crear experiencias digitales
                              excepcionales. Especializado en WordPress, React y
                              diseño UI/UX.
                            </p>
                            <div className="mt-4 flex justify-between text-xs text-zinc-600 dark:text-gray-400">
                              <div>
                                <p className="font-medium">Ubicación</p>
                                <p>Colombia</p>
                              </div>
                              <div>
                                <p className="font-medium">Experiencia</p>
                                <p>+5 años</p>
                              </div>
                              <div>
                                <p className="font-medium">Proyectos</p>
                                <p>50+</p>
                              </div>
                            </div>
                          </div>
                        </span>
                      </motion.span>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </h1>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 lg:mt-12">
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex w-fit items-center gap-2 rounded-md border border-black bg-white px-6 py-3 text-sm text-black transition-colors hover:bg-zinc-100 dark:border-[#c5fb00] dark:bg-black dark:text-[#c5fb00] dark:hover:bg-zinc-900"
                >
                  Contáctame <ArrowRight size={20} />
                </motion.button>

                <div className="space-y-4">
                  <p className="max-w-md text-sm text-gray-400">
                    Mi objetivo es asegurarme de que su sitio web esté
                    actualizado, seguro y brinde una experiencia de usuario
                    excepcional.
                  </p>
                  <div className="flex items-center gap-4">
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
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToWork}
                className="flex items-center gap-2 text-white transition-colors hover:text-[#c5fb00]"
              >
                Ver Proyectos <ChevronDown size={20} />
              </button>
            </div>
          </motion.div>

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
            className="relative mt-[345px] h-[600px]"
          >
            <div className="h-full w-full overflow-hidden rounded-2xl">
              <SplineScene className="h-full w-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
