"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Code2,
  Palette,
  Globe,
  Smartphone,
  Search,
  ShoppingCart,
  Settings,
  Zap,
  MessageSquare,
  Users,
  Target,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={32} />,
    title: "Desarrollo WordPress",
    description:
      "Creación y mantenimiento de sitios WordPress personalizados y optimizados.",
  },
  {
    icon: <Globe size={32} />,
    title: "Desarrollo Web",
    description:
      "Desarrollo de aplicaciones web modernas con las últimas tecnologías.",
  },
  {
    icon: <Palette size={32} />,
    title: "Diseño UI/UX",
    description:
      "Diseño de interfaces intuitivas y experiencias de usuario excepcionales.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Diseño Responsive",
    description: "Sitios web adaptables a todos los dispositivos y pantallas.",
  },
  {
    icon: <Search size={32} />,
    title: "SEO",
    description:
      "Optimización para motores de búsqueda y mejora de visibilidad online.",
  },
  {
    icon: <ShoppingCart size={32} />,
    title: "E-commerce",
    description:
      "Desarrollo de tiendas online con WooCommerce y otras plataformas.",
  },
  {
    icon: <Settings size={32} />,
    title: "Mantenimiento",
    description:
      "Servicios de mantenimiento y actualización continua de sitios web.",
  },
  {
    icon: <Zap size={32} />,
    title: "Optimización",
    description: "Mejora del rendimiento y velocidad de carga de sitios web.",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Contenido Redes",
    description:
      "Creación y gestión de contenido estratégico para redes sociales.",
  },
  {
    icon: <Users size={32} />,
    title: "Asesoría Digital",
    description: "Consultoría estratégica para optimizar tu presencia online.",
  },
  {
    icon: <Target size={32} />,
    title: "Marketing Digital",
    description:
      "Estrategias efectivas para alcanzar y convertir tu audiencia objetivo.",
  },
  {
    icon: <Palette size={32} />,
    title: "Branding y Logos",
    description:
      "Diseño de identidad de marca y logotipos que destacan tu negocio.",
  },
];

export default function Services() {
  return (
    <section className="min-h-screen pt-20 sm:pt-32" id="services">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Servicios
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-zinc-600 dark:text-gray-300 sm:text-base">
            Ofrezco una gama completa de servicios de desarrollo y diseño web
            para ayudar a tu negocio a destacar en el mundo digital.
          </p>
        </motion.div>

        <div
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={index * 0.1}
              className="group cursor-pointer rounded-xl bg-zinc-100 p-4 transition-all hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#27272A] sm:p-6"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <div className="mb-3 text-black transition-transform group-hover:scale-105 dark:text-[#c5fb00] sm:mb-4">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-[#c5fb00] sm:text-xl">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
