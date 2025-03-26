"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircleDashed } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-zinc-100 dark:bg-black text-zinc-900 dark:text-white z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/dark.png" 
            alt="Logo" 
            className="h-12 w-auto dark:invert"
          />
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
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} className="text-zinc-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black border-t border-gray-800"
        >
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
                  className="py-2 text-sm hover:text-[#c5fb00] transition-colors"
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
              className="mt-4 bg-[#c5fb00] text-black px-6 py-2 rounded-md hover:bg-[#b2e200] transition-colors"
            >
              Hablemos →
            </motion.a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
