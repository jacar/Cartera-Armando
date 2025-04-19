"use client";

import { motion } from "framer-motion";
import { TiltedScroll } from "@/components/ui/tilted-scroll";
import { TrueFocus } from "@/components/ui/true-focus";
import { SparklesCore } from "@/components/ui/sparkles";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    company: "Unidad Creativa",
    period: "2021 - 2022",
    role: "WEB MASTER SENIOR",
    achievements: [
      "Lideré proyectos de diseño web y desarrollo para diversos clientes",
      "Implementé soluciones personalizadas utilizando WordPress y otras tecnologías web",
      "Optimicé sitios web para mejorar el rendimiento y la experiencia del usuario",
      "Colaboré con equipos multidisciplinarios para entregar proyectos de alta calidad",
    ],
    stats: {
      projects: 25,
      clients: 15,
      satisfaction: 98,
    },
  },
  {
    company: "Alarona Studio",
    period: "2022 - 2023",
    role: "WEB MASTER SENIOR",
    achievements: [
      "Desarrollé y personalicé sitios web en WordPress",
      "Creación de temas únicos y atractivos",
      "Integración eficiente de plugins esenciales",
      "Optimización para una experiencia de usuario fluida",
      "Mejora continua de la funcionalidad web",
      "Diseño centrado en resultados del cliente",
      "Innovación en soluciones web personalizadas",
    ],
    stats: {
      projects: 35,
      clients: 20,
      satisfaction: 99,
    },
  },
];

export default function ProfessionalExperience() {
  return (
    <section className="relative min-h-screen pt-32 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-[#c5fb00]">
            Experiencia Profesional
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 text-sm sm:text-base md:text-lg">
            Trayectoria profesional en desarrollo web y gestión de proyectos
            digitales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group rounded-xl bg-zinc-100 p-8 text-center transition-colors hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#27272A]"
            >
              <div className="mb-6 flex flex-col items-center text-center">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
                    {experience.company}
                  </h3>
                  <p className="text-black dark:text-[#c5fb00]">
                    {experience.role}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    {experience.period}
                  </p>
                </div>
              </div>

              <motion.div
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">
                    {experience.stats.projects}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    Proyectos
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">
                    {experience.stats.clients}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    Clientes
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">
                    {experience.stats.satisfaction}%
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    Satisfacción
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4">
                {experience.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group flex flex-col items-center text-center gap-4"
                  >
                    <div className="mt-1.5">
                      <div className="h-2 w-2 rounded-full bg-zinc-900 transition-transform group-hover:scale-150 dark:bg-[#c5fb00]" />
                    </div>
                    <p className="break-words text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-gray-400 dark:group-hover:text-white">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <div className="rounded-xl bg-zinc-100 p-8 transition-colors hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#27272A]">
            <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Especialización
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Desarrollo WordPress Avanzado",
                "Optimización de Rendimiento Web",
                "Gestión de Proyectos Digitales",
                "Diseño UI/UX Centrado en Usuario",
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-lg bg-zinc-200 p-4 transition-colors hover:bg-zinc-300 dark:bg-[#27272A] dark:hover:bg-[#323232]"
                >
                  <p className="text-zinc-600 dark:text-gray-300">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-zinc-100 p-8 transition-colors hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#27272A]">
            <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Logros Destacados
            </h3>
            <div className="space-y-4">
              {[
                {
                  stat: "40%",
                  text: "Incremento en conversiones para clientes e-commerce",
                },
                {
                  stat: "60%",
                  text: "Reducción en tiempos de carga de sitios web",
                },
                {
                  stat: "50+",
                  text: "Proyectos WordPress implementados exitosamente",
                },
                {
                  stat: "100%",
                  text: "Satisfacción en soluciones personalizadas",
                },
              ].map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group flex items-center gap-4"
                >
                  <div className="rounded-lg bg-zinc-200 p-3 transition-colors group-hover:bg-zinc-300 dark:bg-[#27272A] dark:group-hover:bg-[#323232]">
                    <p className="font-bold text-zinc-900 dark:text-[#c5fb00]">
                      {achievement.stat}
                    </p>
                  </div>
                  <p className="text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-gray-400 dark:group-hover:text-white">
                    {achievement.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative mt-32 overflow-hidden py-20">
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesfull"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#c5fb00"
              speed={1}
            />
          </div>
          <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://www.webcincodev.com/blog/wp-content/uploads/2025/03/ovalle_.png"
                alt="Ovalle"
                width={200}
                height={200}
                className="rounded-full border-4 border-[#c5fb00] shadow-lg shadow-[#c5fb00]/20"
              />
            </motion.div>
            <TrueFocus
              sentence="Desarrollo Web Profesional"
              manualMode={true}
              blurAmount={3}
              borderColor="#c5fb00"
              glowColor="rgba(197, 251, 0, 0.6)"
              animationDuration={0.5}
              pauseBetweenAnimations={2}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-12 max-w-2xl text-center"
            >
              <p className="mb-8 text-gray-300">
                Objetivo: Aportar mis conocimientos para crear soluciones web
                innovadoras, eficientes y alineadas con las necesidades del
                usuario. Siempre en constante aprendizaje y actualización en
                nuevas tecnologías.
              </p>
              <motion.a
                href="https://wa.me/573052891719"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-black bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-zinc-100 dark:border-[#c5fb00] dark:bg-black dark:text-[#c5fb00] dark:hover:bg-zinc-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¿Trabajamos? <MessageSquare className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
