"use client";

import * as React from "react";
import { Moon, Sun, MoonStars } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-full bg-[#18181b] p-2 transition-colors hover:bg-[#27272A] dark:bg-zinc-800 dark:hover:bg-zinc-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun-icon"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun 
              size={20} 
              weight="duotone" 
              className="text-yellow-300" 
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <MoonStars 
              size={20} 
              weight="duotone" 
              className="text-[#c5fb00]" 
            />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">
        {theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      </span>
    </motion.button>
  );
}
