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
    <header className="fixed z-50 w-full bg-zinc-100 text-zinc-900 dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/dark.png"
            alt="Logo"
            className="h-12 w-auto dark:invert"
          />
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <CircleDashed
                size={24}
                weight="bold"
                className="text-black dark:text-[#c5fb00]"
              />
            </motion.div>
            <ThemeToggle />
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
          </div>

          <button
            className="text-white lg:hidden"
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
          className="border-t border-gray-800 bg-black lg:hidden"
        >
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
                  className="py-2 text-sm transition-colors hover:text-[#c5fb00]"
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
            <motion.a
              href="https://wa.me/573052891719"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="mt-4 rounded-md bg-[#c5fb00] px-6 py-2 text-black transition-colors hover:bg-[#b2e200]"
            >
              Hablemos →
            </motion.a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
