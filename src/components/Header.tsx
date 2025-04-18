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
    <header className="fixed z-50 w-full bg-zinc-100 text-zinc-900 dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          {theme === "dark" ? (
            <img
              src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2.svg"
              alt="Logo Dark"
              className="h-8 w-auto min-w-[100px] sm:h-12"
              loading="eager"
              width="140"
              height="48"
            />
          ) : (
            <img
              src="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1e.png"
              alt="Logo Color"
              className="h-8 w-auto min-w-[100px] sm:h-12"
              loading="eager"
              width="140"
              height="48"
            />
          )}
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
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 z-50 h-full w-[280px] overflow-y-auto border-r border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-black lg:hidden"
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
              <motion.a
                href="https://wa.me/573052891719"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="mx-4 mt-6 rounded-md bg-[#c5fb00] px-6 py-3 text-center text-black transition-colors hover:bg-[#b2e200]"
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
