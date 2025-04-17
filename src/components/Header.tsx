"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircleDashed } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="fixed w-full bg-zinc-100 dark:bg-black text-zinc-900 dark:text-white z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {theme === "dark" ? (
            <img
              src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2.svg"
              alt="Logo Dark"
              className="h-8 sm:h-12 w-auto"
            />
          ) : (
            <img
              src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1e.png"
              alt="Logo Color"
              className="h-8 sm:h-12 w-auto"
            />
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {["INICIO", "SOBRE MÍ", "PROYECTOS", "SERVICIOS", "TESTIMONIOS"].map((item) => {
            const sectionId = {
              "INICIO": "/",
              "SOBRE MÍ": "#about",
              "PROYECTOS": "#work",
              "SERVICIOS": "#services",
              "TESTIMONIOS": "#testimonial"
            }[item];
            
            return (
              <a
                key={item}
                href={sectionId}
                className="text-sm hover:text-[#c5fb00] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (sectionId === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <CircleDashed size={24} weight="bold" className="text-black dark:text-[#c5fb00]" />
            </motion.div>
            <ThemeToggle />
            <motion.a
              href="https://wa.me/573052891719"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block bg-white dark:bg-black text-black dark:text-[#c5fb00] border border-black dark:border-[#c5fb00] px-6 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Hablemos →
            </motion.a>
          </div>
          
          <button 
            className="lg:hidden p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 left-0 h-full w-[280px] lg:hidden bg-zinc-100 dark:bg-black border-r border-zinc-200 dark:border-zinc-800 z-50 overflow-y-auto"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Cerrar menú"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4">
              {["INICIO", "SOBRE MÍ", "PROYECTOS", "SERVICIOS", "TESTIMONIOS"].map((item) => {
                const sectionId = {
                  "INICIO": "/",
                  "SOBRE MÍ": "#about",
                  "PROYECTOS": "#work",
                  "SERVICIOS": "#services",
                  "TESTIMONIOS": "#testimonial"
                }[item];
                
                return (
                  <a
                    key={item}
                    href={sectionId}
                    className="py-3 px-4 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      if (sectionId === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item}
                  </a>
                );
              })}
              <motion.a
                href="https://wa.me/573052891719"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="mt-6 mx-4 bg-[#c5fb00] text-black px-6 py-3 rounded-md hover:bg-[#b2e200] transition-colors text-center"
              >
                Hablemos →
              </motion.a>
            </nav>
          </motion.div>
        </>
      )}
    </header>
  );
}
