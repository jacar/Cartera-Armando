"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Laptop, Zap } from "lucide-react";

const services = [
  {
    icon: <Code2 size={32} />,
    title: "Desarrollo Web Profesional",
    description:
      "Creación de sitios web modernos y aplicaciones web utilizando las últimas tecnologías. Desarrollo soluciones digitales escalables con énfasis en rendimiento, diseño y experiencia de usuario. Implementación de interfaces intuitivas y funcionalidades avanzadas para una presencia web excepcional.",
  },
  {
    icon: <Palette size={32} />,
    title: "Diseño UI/UX",
    description:
      "Diseño de interfaces intuitivas y experiencias de usuario excepcionales.",
  },
  {
    icon: <Laptop size={32} />,
    title: "Desarrollo Frontend",
    description:
      "Implementación de interfaces de usuario responsivas y dinámicas.",
  },
  {
    icon: <Zap size={32} />,
    title: "Optimización",
    description:
      "Mejora del rendimiento y la velocidad de carga de sitios web existentes.",
  },
];

export default function About() {
  return (
    <section className="min-h-screen pt-16 sm:pt-32" id="about">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
            Sobre Mí
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-gray-300">
            Soy un desarrollador web y diseñador UI/UX apasionado por crear
            experiencias digitales excepcionales. Mi enfoque combina diseño
            intuitivo con desarrollo técnico sólido.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-[#18181b] md:p-8">
              <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                Mi Enfoque
              </h3>
              <p className="text-zinc-600 dark:text-gray-400">
                Me especializo en crear soluciones web que no solo se ven
                increíbles, sino que también funcionan perfectamente. Cada
                proyecto es una oportunidad para innovar y superar expectativas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-zinc-100 p-8 dark:bg-[#18181b]">
                <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                  Experiencia
                </h3>
                <p className="text-zinc-600 dark:text-gray-400">
                  Con años de experiencia en el desarrollo web, he trabajado en
                  diversos proyectos que van desde sitios corporativos hasta
                  aplicaciones web complejas. Mi objetivo es crear productos
                  digitales que destaquen.
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-100 p-8 dark:bg-[#18181b]">
                <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                  Experto E-commerce
                </h3>
                <p className="text-zinc-600 dark:text-gray-400">
                  Especializado en el desarrollo y optimización de tiendas
                  online usando las principales plataformas del mercado:
                  WooCommerce, BigCommerce, PrestaShop, Shopify y más.
                  Implementación completa, personalización y mantenimiento para
                  maximizar tus ventas online.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 px-4 sm:px-0 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group whitespace-normal break-words rounded-xl bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#27272a] sm:p-6"
              >
                <div className="mb-4 text-black transition-transform group-hover:scale-110 dark:text-[#c5fb00]">
                  {service.icon}
                </div>
                <h3 className="mb-2 break-words text-base font-semibold leading-snug text-zinc-900 dark:text-white sm:text-lg md:text-xl lg:text-2xl">
                  {service.title}
                </h3>
                <p className="break-words text-xs text-zinc-600 dark:text-gray-400 sm:text-sm md:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
