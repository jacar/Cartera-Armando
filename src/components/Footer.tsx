"use client";

import { motion } from "framer-motion";
import { GithubLogo, Coffee } from "@phosphor-icons/react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 bg-zinc-100 py-8 dark:bg-[#18181b]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-center justify-between gap-8">
          <nav className="flex flex-wrap justify-center gap-4 px-4 sm:gap-8 sm:px-0">
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
                <motion.a
                  key={item}
                  href={sectionId}
                  className="text-xs text-gray-400 transition-colors hover:text-[#c5fb00] sm:text-sm"
                  whileHover={{ scale: 1.05 }}
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
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/jacar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#c5fb00]"
            >
              <GithubLogo
                size={24}
                weight="fill"
                className="text-black dark:text-[#c5fb00]"
              />
            </Link>
            <Link
              href="https://wa.me/573052891719"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#c5fb00]"
            >
              <MessageSquare
                size={24}
                className="text-black dark:text-[#c5fb00]"
              />
            </Link>
            <Link
              href="https://www.webcincodev.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#c5fb00]"
            >
              Blog
            </Link>
            <Link
              href="https://buymeacoffee.com/webcincodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#c5fb00]"
            >
              <Coffee
                size={24}
                weight="fill"
                className="text-black dark:text-[#c5fb00]"
              />
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              {new Date().getFullYear()} Armando Ovalle Jácome. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
