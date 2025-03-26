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
      "Colaboré con equipos multidisciplinarios para entregar proyectos de alta calidad"
    ],
    stats: {
      projects: 25,
      clients: 15,
      satisfaction: 98
    }
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
      "Innovación en soluciones web personalizadas"
    ],
    stats: {
      projects: 35,
      clients: 20,
      satisfaction: 99
    }
  }
];

export default function ProfessionalExperience() {
  return (
    <section className="min-h-screen pt-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 dark:text-[#c5fb00]">
            Experiencia Profesional
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Trayectoria profesional en desarrollo web y gestión de proyectos digitales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-xl hover:bg-zinc-200 dark:hover:bg-[#27272A] transition-colors group"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{experience.company}</h3>
                  <p className="text-black dark:text-[#c5fb00]">{experience.role}</p>
                  <p className="text-zinc-600 dark:text-gray-400 text-sm">{experience.period}</p>
                </div>
                <motion.div 
                  className="flex gap-8"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">{experience.stats.projects}</p>
                    <p className="text-sm text-zinc-600 dark:text-gray-400">Proyectos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">{experience.stats.clients}</p>
                    <p className="text-sm text-zinc-600 dark:text-gray-400">Clientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-[#c5fb00]">{experience.stats.satisfaction}%</p>
                    <p className="text-sm text-zinc-600 dark:text-gray-400">Satisfacción</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                {experience.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1.5">
                      <div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-[#c5fb00] group-hover:scale-150 transition-transform" />
                    </div>
                    <p className="text-zinc-600 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
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
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-xl hover:bg-zinc-200 dark:hover:bg-[#27272A] transition-colors">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Especialización</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Desarrollo WordPress Avanzado",
                "Optimización de Rendimiento Web",
                "Gestión de Proyectos Digitales",
                "Diseño UI/UX Centrado en Usuario"
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-zinc-200 dark:bg-[#27272A] p-4 rounded-lg hover:bg-zinc-300 dark:hover:bg-[#323232] transition-colors"
                >
                  <p className="text-zinc-600 dark:text-gray-300">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-xl hover:bg-zinc-200 dark:hover:bg-[#27272A] transition-colors">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Logros Destacados</h3>
            <div className="space-y-4">
              {[
                { stat: "40%", text: "Incremento en conversiones para clientes e-commerce" },
                { stat: "60%", text: "Reducción en tiempos de carga de sitios web" },
                { stat: "50+", text: "Proyectos WordPress implementados exitosamente" },
                { stat: "100%", text: "Satisfacción en soluciones personalizadas" }
              ].map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-zinc-200 dark:bg-[#27272A] p-3 rounded-lg group-hover:bg-zinc-300 dark:group-hover:bg-[#323232] transition-colors">
                    <p className="text-zinc-900 dark:text-[#c5fb00] font-bold">{achievement.stat}</p>
                  </div>
                  <p className="text-zinc-600 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {achievement.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative mt-32 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesfull"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#c5fb00"
              speed={1}
            />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 flex flex-col items-center gap-8">
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
              className="max-w-2xl mx-auto text-center mt-12"
            >
              <p className="text-gray-300 mb-8">
                Objetivo: Aportar mis conocimientos para crear soluciones web innovadoras, 
                eficientes y alineadas con las necesidades del usuario. Siempre en constante 
                aprendizaje y actualización en nuevas tecnologías.
              </p>
              <motion.a
                href="https://wa.me/573052891719"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-black text-black dark:text-[#c5fb00] border border-black dark:border-[#c5fb00] px-8 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¿Trabajamos? <MessageSquare className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
