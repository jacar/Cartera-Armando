"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <div className="max-w-[1400px] relative mx-auto py-20 md:py-40 px-6 w-full">
      <h1 className="text-2xl md:text-7xl font-bold text-zinc-900">
        Desarrollo Profesional de Sitios Web en WordPress a Medida
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-zinc-600">
        Creo tu sitio web en WordPress de manera personalizada, optimizado para rendimiento, 
        seguridad y SEO. Ya sea un blog, una tienda online o una web corporativa, adapto 
        cada detalle a tus necesidades. ¡Convierte tu idea en una realidad digital con un 
        diseño atractivo y funcional!
      </p>
    </div>
  );
}
