"use client";

import { motion } from "framer-motion";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Squares } from "@/components/ui/squares-background";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import { GithubLogo, Article, Coffee, BehanceLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const mobileImage = "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-2025-03-11T111412.287.png";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const scrollToWork = () => {
    if (typeof window !== 'undefined') {
      const workSection = document.getElementById('work');
      workSection?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pb-[120px] sm:px-6">
      <div className="absolute inset-0 z-0 w-screen" style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
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
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 transition-all duration-300"
          />
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
              opacity: theme === 'dark' ? 1 : 0
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="text-center lg:text-left">
            <div className="inline-block px-4 sm:px-6 py-2 bg-zinc-100 dark:bg-[#18181b] rounded-full mb-4 sm:mb-6 mx-auto lg:mx-0">
              <span className="text-sm sm:text-base text-zinc-900 dark:text-[#c5fb00]">Tu web no tiene</span>
              <span className="ml-2 text-sm sm:text-base text-zinc-900 dark:text-white">por qué ser aburrida</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              Diseño y
              <br />
              Desarrollo
              <br />
              <span className="relative">
                Web
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.span className="absolute -right-4 -top-4" initial={{
                        scale: 0,
                        y: 0
                      }} animate={{
                        scale: 1,
                        y: [-5, 5, -5]
                      }} transition={{
                        scale: {
                          delay: 0.5,
                          duration: 0.3
                        },
                        y: {
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }
                      }}>
                        <span className="text-4xl cursor-help group/tooltip group-hover:tooltip-visible">
                          👋
                          <div className="fixed z-50 tooltip-transition inset-0 flex items-center justify-center px-4">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-[300px]">
                              <div className="p-5">
                                <img 
                                  src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/ovalle_.png" 
                                  alt="Armando Ovalle" 
                                  className="w-16 h-16 rounded-full object-cover border-2 border-[#c5fb00] mx-auto" 
                                />
                                <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-white text-center">
                                  Armando Ovalle
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-gray-400 text-center">
                                  Desarrollador Web Senior
                                </p>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                  <div className="text-center">
                                    <p className="text-[10px] font-medium text-zinc-900 dark:text-white">Ubicación</p>
                                    <p className="text-[10px] text-zinc-500">Colombia</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-[10px] font-medium text-zinc-900 dark:text-white">Experiencia</p>
                                    <p className="text-[10px] text-zinc-500">+5 años</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-[10px] font-medium text-zinc-900 dark:text-white">Proyectos</p>
                                    <p className="text-[10px] text-zinc-500">50+</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.span>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mt-6 lg:mt-12 justify-center lg:justify-start">
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                  <motion.a 
                    href="https://wa.me/573052891719"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.05
                    }} 
                    whileTap={{
                      scale: 0.95
                    }} 
                    className="bg-white dark:bg-black text-black dark:text-[#c5fb00] border border-black dark:border-[#c5fb00] px-6 py-3 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit mx-auto lg:mx-0"
                  >
                    Contáctame <ArrowRight size={20} />
                  </motion.a>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400 max-w-md text-center lg:text-left mx-auto lg:mx-0">
                      Mi objetivo es asegurarme de que su sitio web esté actualizado, seguro y brinde una experiencia de usuario excepcional.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-4">
                      <Link href="https://github.com/jacar" target="_blank" className="text-black dark:text-[#c5fb00] hover:text-zinc-600 dark:hover:text-white transition-colors">
                        <GithubLogo size={24} weight="fill" />
                      </Link>
                      <Link href="https://www.webcincodev.com/blog/" target="_blank" className="text-black dark:text-[#c5fb00] hover:text-zinc-600 dark:hover:text-white transition-colors">
                        <Article size={24} weight="fill" />
                      </Link>
                      <Link href="https://buymeacoffee.com/webcincodev" target="_blank" className="text-black dark:text-[#c5fb00] hover:text-zinc-600 dark:hover:text-white transition-colors">
                        <Coffee size={24} weight="fill" />
                      </Link>
                      <Link href="https://www.behance.net/webcincovalle" target="_blank" className="text-black dark:text-[#c5fb00] hover:text-zinc-600 dark:hover:text-white transition-colors">
                        <BehanceLogo size={24} weight="fill" />
                      </Link>
                    </div>
                  </div>
                </div>

                <button onClick={scrollToWork} className="text-white flex items-center justify-center sm:justify-start gap-2 hover:text-[#c5fb00] transition-colors w-full sm:w-auto">
                  Ver Proyectos <ChevronDown size={20} />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{
                opacity: 0,
                scale: 0.8
              }} 
              animate={{
                opacity: 1,
                scale: 1
              }} 
              transition={{
                duration: 0.8
              }} 
              className="relative h-[400px] sm:h-[600px] mt-8 sm:mt-12 lg:mt-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                {isMobile ? (
                  <img
                    src={mobileImage}
                    alt="Mobile Hero"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <SplineScene className="w-full h-full" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
