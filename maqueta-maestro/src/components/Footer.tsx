"use client";

import { motion } from "framer-motion";
import { GithubLogo, Coffee } from "@phosphor-icons/react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-[#18181b] py-8 mt-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8">
          <nav className="flex items-center gap-8">
            {["INICIO", "SOBRE MÍ", "PROYECTOS", "SERVICIOS", "TESTIMONIOS"].map((item) => {
              const sectionId = {
                "INICIO": "/",
                "SOBRE MÍ": "#about",
                "PROYECTOS": "#work",
                "SERVICIOS": "#services",
                "TESTIMONIOS": "#testimonial"
              }[item];
              
              return (
                <motion.a
                  key={item}
                  href={sectionId}
                  className="text-sm text-gray-400 hover:text-[#c5fb00] transition-colors"
                  whileHover={{ scale: 1.05 }}
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
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com/jacar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c5fb00] transition-colors"
            >
              <GithubLogo size={24} weight="fill" className="text-black dark:text-[#c5fb00]" />
            </Link>
            <Link 
              href="https://wa.me/573052891719" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c5fb00] transition-colors"
            >
              <MessageSquare size={24} className="text-black dark:text-[#c5fb00]" />
            </Link>
            <Link 
              href="https://www.webcincodev.com/blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c5fb00] transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="https://buymeacoffee.com/webcincodev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c5fb00] transition-colors"
            >
              <Coffee size={24} weight="fill" className="text-black dark:text-[#c5fb00]" />
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Armando Ovalle Jácome. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
