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

  return <section className="relative min-h-screen flex items-center px-6">
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
        }}>
            <div className="inline-block px-6 py-2 bg-zinc-100 dark:bg-[#18181b] rounded-full mb-6">
              <span className="text-zinc-900 dark:text-[#c5fb00]">Tu web no tiene</span>
              <span className="ml-2 text-zinc-900 dark:text-white">por qué ser aburrida</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
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
                        <span className="text-4xl cursor-help group/tooltip">
                          👋
                          <div className="fixed z-50 hidden group-hover/tooltip:block left-[calc(50%+100px)] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] p-6 bg-zinc-100/95 dark:bg-[#18181b]/95 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                              <img 
                                src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/ovalle_.png" 
                                alt="Armando Ovalle" 
                                className="w-24 h-24 md:w-16 md:h-16 rounded-full object-cover border-4 md:border-2 border-[#c5fb00] shadow-lg shadow-[#c5fb00]/20" 
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                  Armando Ovalle
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-gray-400">
                                  Desarrollador Web Senior
                                </p>
                                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                                  <a href="https://github.com/jacar" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-[#c5fb00] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <GithubLogo size={20} weight="fill" />
                                  </a>
                                  <a href="https://www.webcincodev.com/blog/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-[#c5fb00] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <Article size={20} weight="fill" />
                                  </a>
                                  <a href="https://www.behance.net/webcincovalle" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-[#c5fb00] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <BehanceLogo size={20} weight="fill" />
                                  </a>
                                  <a href="https://wa.me/573052891719" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-[#c5fb00] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <MessageSquare size={20} />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p className="mt-4 text-sm text-zinc-600 dark:text-gray-300">
                              Apasionado por crear experiencias digitales excepcionales. 
                              Especializado en WordPress, React y diseño UI/UX.
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 lg:mt-12">
              <div className="flex flex-col gap-4">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="bg-white dark:bg-black text-black dark:text-[#c5fb00] border border-black dark:border-[#c5fb00] px-6 py-3 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2 w-fit">
                  Contáctame <ArrowRight size={20} />
                </motion.button>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 max-w-md">
                    Mi objetivo es asegurarme de que su sitio web esté actualizado, seguro y brinde una experiencia de usuario excepcional.
                  </p>
                  <div className="flex items-center gap-4">
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

              <button onClick={scrollToWork} className="text-white flex items-center gap-2 hover:text-[#c5fb00] transition-colors">
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
            className="relative h-[600px] mt-[345px]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <SplineScene className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
