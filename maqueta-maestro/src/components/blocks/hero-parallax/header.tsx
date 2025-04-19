"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 py-20 md:py-40">
      <h1 className="text-2xl font-bold text-zinc-900 md:text-7xl">
        Desarrollo Profesional de Sitios Web en WordPress a Medida
      </h1>
      <p className="mt-8 max-w-2xl text-base text-zinc-600 md:text-xl">
        Creo tu sitio web en WordPress de manera personalizada, optimizado para
        rendimiento, seguridad y SEO. Ya sea un blog, una tienda online o una
        web corporativa, adapto cada detalle a tus necesidades. ¡Convierte tu
        idea en una realidad digital con un diseño atractivo y funcional!
      </p>
    </div>
  );
}
