"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Laptop, Zap } from "lucide-react";

const services = [
  {
    icon: <Code2 size={32} />,
    title: "Desarrollo Web",
    description: "Creación de sitios web modernos y aplicaciones web utilizando las últimas tecnologías.",
  },
  {
    icon: <Palette size={32} />,
    title: "Diseño UI/UX",
    description: "Diseño de interfaces intuitivas y experiencias de usuario excepcionales.",
  },
  {
    icon: <Laptop size={32} />,
    title: "Desarrollo Frontend",
    description: "Implementación de interfaces de usuario responsivas y dinámicas.",
  },
  {
    icon: <Zap size={32} />,
    title: "Optimización",
    description: "Mejora del rendimiento y la velocidad de carga de sitios web existentes.",
  },
];

export default function About() {
  return (
    <section className="min-h-screen pt-32" id="about">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-zinc-900">Sobre Mí</h2>
          <p className="dark:text-gray-300 text-zinc-600 max-w-2xl mx-auto">
            Soy un desarrollador web y diseñador UI/UX apasionado por crear experiencias digitales excepcionales.
            Mi enfoque combina diseño intuitivo con desarrollo técnico sólido.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-zinc-100 dark:bg-[#18181b] p-4 md:p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Mi Enfoque</h3>
              <p className="text-zinc-600 dark:text-gray-400">
                Me especializo en crear soluciones web que no solo se ven increíbles,
                sino que también funcionan perfectamente. Cada proyecto es una oportunidad
                para innovar y superar expectativas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Experiencia</h3>
                <p className="text-zinc-600 dark:text-gray-400">
                  Con años de experiencia en el desarrollo web, he trabajado en diversos
                  proyectos que van desde sitios corporativos hasta aplicaciones web complejas.
                  Mi objetivo es crear productos digitales que destaquen.
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Experto E-commerce</h3>
                <p className="text-zinc-600 dark:text-gray-400">
                  Especializado en el desarrollo y optimización de tiendas online usando las principales 
                  plataformas del mercado: WooCommerce, BigCommerce, PrestaShop, Shopify y más. 
                  Implementación completa, personalización y mantenimiento para maximizar tus ventas online.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-100 dark:bg-[#18181b] p-6 rounded-xl hover:bg-zinc-200 dark:hover:bg-[#27272a] transition-colors group"
              >
                <div className="text-black dark:text-[#c5fb00] mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-zinc-600 dark:text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
