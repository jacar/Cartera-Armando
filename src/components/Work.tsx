"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CorporateIdentity } from "./work/CorporateIdentity";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { HeroParallax } from "@/components/blocks/hero-parallax";
import { ProjectsGrid } from "./work/ProjectsGrid";
import { projects as projectsData } from "./work/projects-data";
import { Squares } from "@/components/ui/squares-background";

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({
  children,
  className,
  ...props
}: AccordionProps) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={`group flex flex-1 items-center justify-between ${className}`}
      {...props}
    >
      {children}
      <ChevronDown
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent = ({
  children,
  className,
  ...props
}: AccordionProps) => (
  <Accordion.Content
    className={`data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp ${className}`}
    {...props}
  >
    <div className="pt-4">{children}</div>
  </Accordion.Content>
);

const AccordionItem = Accordion.Item;

const projects = [
  {
    title: "Marvel Movies Explorer",
    description:
      "Plataforma de películas desarrollada con React y Next.js que integra la API oficial de Marvel para explorar el universo cinematográfico, incluyendo información detallada de personajes y películas.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/peli.png",
    category: "API Integration",
    link: "https://webcinpeli.netlify.app",
  },
  {
    title: "Inlingua Portal Educativo",
    description:
      "Diseño y desarrollo de un portal educativo interactivo para Inlingua, facilitando el aprendizaje en línea y la gestión de recursos educativos.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/inlingua.png",
    category: "Educación",
    link: "https://inlingua.vercel.app",
  },
  {
    title: "Sopa de Letras Interactiva",
    description:
      "Juego educativo desarrollado con React que combina entretenimiento y aprendizaje, permitiendo a los usuarios crear y resolver sopas de letras personalizadas.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/letra8.png",
    category: "Juegos Educativos",
    link: "https://misopadeletras-i73qab.vercel.app",
  },
  {
    title: "EdiCode IDE Online",
    description:
      "Editor de código en línea con soporte para múltiples lenguajes, resaltado de sintaxis y herramientas de desarrollo integradas.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup74.png",
    category: "Desarrollo",
    link: "https://www.webcincodev.com/edicode",
  },
  {
    title: "QR Code Generator",
    description:
      "Herramienta web para generar códigos QR personalizados con opciones avanzadas de personalización y diseño.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup2.png",
    category: "Utilidades",
    link: "https://www.webcincodev.com/qr",
  },
  {
    title: "SafeWeb Security Scanner",
    description:
      "Herramienta de análisis de seguridad web que detecta vulnerabilidades y proporciona recomendaciones detalladas para mejorar la protección de sitios web.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup25.png",
    category: "Seguridad",
    link: "https://safeweb5.vercel.app",
  },
  {
    title: "Traductor Inteligente",
    description:
      "Aplicación de traducción que utiliza IA para proporcionar traducciones precisas y naturales entre múltiples idiomas.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/tra2.png",
    category: "Herramientas",
    link: "https://traductorw5.netlify.app",
  },
  {
    title: "Prompt Generator AI",
    description:
      "Generador de prompts inteligente que ayuda a crear instrucciones efectivas para modelos de IA y chatbots.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup85.png",
    category: "Inteligencia Artificial",
    link: "https://www.webcincodev.com/prompt",
  },
  {
    title: "Blog Tecnológico",
    description:
      "Blog especializado en tecnología, desarrollo web y tendencias digitales con artículos técnicos y tutoriales detallados.",
    image:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockupblog.png",
    category: "Contenido",
    link: "https://www.webcincodev.com/blog",
  },
  {
    title: "QuitaFondo Pro",
    description:
      "Herramienta profesional para eliminar fondos de imágenes de forma automática. Utiliza tecnología de IA para detectar y remover fondos con precisión, manteniendo la calidad de la imagen original.",
    image: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/bf.png",
    category: "Herramientas",
    link: "https://www.aovalle.space",
  },
];
export default function Work() {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="min-h-screen pt-40 sm:pt-32 md:pt-48 lg:pt-56 scroll-mt-40" id="work">
      <div className="mx-auto max-w-[1400px] px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white md:mb-6 md:text-4xl lg:text-5xl">
            Proyectos Destacados
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-gray-300 md:text-base">
            Explora una colección de mis proyectos más impactantes, mostrando
            soluciones innovadoras de diseño y desarrollo web.
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:mb-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={index * 0.2}
              className="group cursor-pointer overflow-hidden rounded-xl bg-zinc-100 transition-transform duration-300 hover:scale-[1.02] dark:bg-[#18181b]"
            >
              <div className="relative h-48 overflow-hidden md:h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 dark:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/30" />
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-6">
                  <span className="text-sm text-zinc-900 dark:text-[#c5fb00]">
                    {project.category}
                  </span>
                  <h3 className="mb-3 mt-2 text-xl font-semibold text-zinc-900 dark:text-white md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-gray-300">
                    {project.description}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 mt-16 sm:mb-32 sm:mt-32"
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-[#c5fb00] md:mb-6 md:text-4xl lg:text-5xl">
              Diseño Web con WordPress: Profesional, Rápido y Optimizado
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-white md:text-base">
              Una colección de soluciones digitales innovadoras y experiencias
              web únicas.
            </p>
          </div>
        </motion.div>

        <div className="relative mb-16 min-h-[400px] md:mb-32 md:min-h-[600px]">
          <div className="absolute inset-0 z-0">
            <Squares
              direction="diagonal"
              speed={1.5}
              borderColor="#333"
              squareSize={40}
              hoverFillColor="#222"
              className="opacity-30"
            />
          </div>
          <div className="relative z-10">
            <HeroParallax
              products={[
                {
                  title: "Electricidad Puigcerdá",
                  link: "https://www.electricidadpuigcerdaceretanes.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/acacias-1-600x650-1.png",
                },
                {
                  title: "Constructivamente",
                  link: "https://constructivamente.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/er-1152x1248-1.png",
                },
                {
                  title: "Balder IP",
                  link: "https://balderip.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/859-1152x1248-1.png",
                },
                {
                  title: "Descubre",
                  link: "https://descubre.com.co/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/descubre2-600x600-1.png",
                },
                {
                  title: "GC Jobs y Ambiente",
                  link: "https://www.gcjobrasyambiente.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/cabas-jacome1-1256x1256-1.jpeg",
                },
                {
                  title: "JL Stately Bulldogs",
                  link: "https://jlstatelybulldogs.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/jl-1152x1248-1.png",
                },
                {
                  title: "Consultorio Odontológico La 78",
                  link: "https://www.consultorioodontologicola78.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/78-1152x1248-1.png",
                },
                {
                  title: "Arepas La Mejor",
                  link: "https://arepaslamejor.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/Generador-QR-8.png",
                },
                {
                  title: "Legal Aid DC",
                  link: "https://www.legalaiddc.org/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/legal-400x433-1.png",
                },
                {
                  title: "Strong Mero Power",
                  link: "http://strongmeropower.com/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/FireShot-Capture-010-Repuestos-para-altavoces-en-Colombia-Fabricamos-Bobinas_-www.strongmeropower.com_.png",
                },
                {
                  title: "La Lupa",
                  link: "https://lalupa.co/2024/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/lupa-600x650-1.png",
                },
                {
                  title: "Fresno Shop",
                  link: "https://fresnoshop.co/produccion/",
                  thumbnail:
                    "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/fres.png",
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-32">
          <ContainerScroll
            titleComponent={
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white md:mb-6 md:text-4xl lg:text-5xl">
                Reparo tu WordPress
              </h2>
            }
          >
            <div className="flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-zinc-100 p-4 md:flex-row md:gap-8 md:p-8">
              <div className="w-full md:w-1/2">
                <h3 className="mb-4 text-xl font-bold text-zinc-900 md:mb-6 md:text-3xl">
                  WordPress en Buenas Manos
                </h3>
                <p className="mb-6 text-sm text-zinc-600 md:mb-8 md:text-base">
                  ¿Por qué elegir elegirme?
                </p>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="space-y-4"
                >
                  <Accordion.Root
                    type="single"
                    collapsible
                    className="space-y-4"
                  >
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="rounded-xl bg-zinc-200 p-4 transition-colors hover:bg-zinc-300 dark:bg-[#27272A] dark:hover:bg-[#323232] md:p-6">
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-[#c5fb00] md:text-lg">
                          Relaciones a Largo Plazo
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 rounded-xl bg-zinc-200 px-4 pb-4 dark:bg-[#27272A] md:px-6 md:pb-6">
                        <p className="text-xs text-zinc-600 dark:text-gray-300 md:text-sm">
                          He cultivado relaciones duraderas con diversas
                          empresas, lo que demuestra mi compromiso con la
                          satisfacción del cliente y la construcción de
                          asociaciones sólidas.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-none">
                      <AccordionTrigger className="rounded-xl bg-zinc-200 p-4 transition-colors hover:bg-zinc-300 dark:bg-[#27272A] dark:hover:bg-[#323232] md:p-6">
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-[#c5fb00] md:text-lg">
                          Resultados Comprobados
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 rounded-xl bg-zinc-200 px-4 pb-4 dark:bg-[#27272A] md:px-6 md:pb-6">
                        <p className="text-xs text-zinc-600 dark:text-gray-300 md:text-sm">
                          Mi historial de éxito en la resolución de desafíos
                          técnicos y la mejora de sitios web respalda la
                          eficacia de mis servicios. Puedes confiar en que tu
                          sitio estará en buenas manos.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-none">
                      <AccordionTrigger className="rounded-xl bg-zinc-200 p-4 transition-colors hover:bg-zinc-300 dark:bg-[#27272A] dark:hover:bg-[#323232] md:p-6">
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-[#c5fb00] md:text-lg">
                          Servicios Destacados
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 rounded-xl bg-zinc-200 px-4 pb-4 dark:bg-[#27272A] md:px-6 md:pb-6">
                        <ul className="space-y-2 text-xs text-zinc-600 md:text-sm">
                          <li>
                            • Resolución de Problemas Técnicos: Abordo y
                            soluciono rápidamente problemas técnicos, desde
                            errores de código hasta problemas de compatibilidad.
                          </li>
                          <li>
                            • Optimización de Rendimiento: Mejoro la velocidad y
                            eficiencia de tu sitio web para una experiencia del
                            usuario excepcional.
                          </li>
                          <li>
                            • Seguridad Reforzada: Implemento medidas de
                            seguridad robustas para proteger tu sitio.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion.Root>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="relative"
                >
                  <img
                    src={
                      theme === "light"
                        ? "http://webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-99.png"
                        : "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/image_fx_-2025-03-20T222758.504.png"
                    }
                    alt="WordPress Services"
                    className="rounded-xl shadow-2xl transition-all duration-300"
                  />
                </motion.div>
              </div>
            </div>
          </ContainerScroll>
        </div>

        <CorporateIdentity />
      </div>
    </section>
  );
}
