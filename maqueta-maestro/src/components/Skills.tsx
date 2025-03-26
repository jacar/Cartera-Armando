"use client";

import { motion } from "framer-motion";
import { 
  Palette, 
  Code, 
  Cpu, 
  FileCode2, 
  Layout, 
  Server, 
  Video
} from "lucide-react";
import { 
  GlobeSimple, 
  FigmaLogo,
  ChatCenteredText
} from "@phosphor-icons/react";

const skills = [
  {
    category: "Desarrollo Web",
    icon: <Code size={32} />,
    tools: [
      { name: "WordPress", icon: <GlobeSimple size={24} weight="fill" /> },
      { name: "Next.js", icon: <FileCode2 size={24} /> },
      { name: "React", icon: <Code size={24} /> },
      { name: "Astro", icon: <Layout size={24} /> },
      { name: "HTML/CSS", icon: <FileCode2 size={24} /> },
      { name: "JavaScript", icon: <FileCode2 size={24} /> },
      { name: "Vercel", icon: <FileCode2 size={24} /> },
      { name: "Netlify", icon: <GlobeSimple size={24} weight="fill" /> },
      { name: "Git", icon: <Code size={24} /> },
      { name: "VS Code", icon: <FileCode2 size={24} /> },
    ]
  },
  {
    category: "Diseño",
    icon: <Palette size={32} />,
    tools: [
      { name: "Illustrator", icon: <Layout size={24} /> },
      { name: "Photoshop", icon: <Layout size={24} /> },
      { name: "Figma", icon: <FigmaLogo size={24} weight="fill" /> },
    ]
  },
  {
    category: "Contenidos",
    icon: <Video size={32} />,
    tools: [
      { name: "Premier Pro", icon: <Video size={24} /> },
      { name: "ChatGPT", icon: <ChatCenteredText size={24} weight="fill" /> },
    ]
  },
  {
    category: "Hosting & Servidores",
    icon: <Server size={32} />,
    tools: [
      { name: "cPanel", icon: <Cpu size={24} /> },
      { name: "Plesk", icon: <Server size={24} /> },
    ]
  }
];

export default function Skills() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-zinc-900">
            Tecnologías y Herramientas
          </h2>
          <p className="dark:text-gray-300 text-zinc-600 max-w-2xl mx-auto">
            Dominio de las últimas tecnologías y herramientas para crear experiencias digitales excepcionales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-100 dark:bg-[#18181b] p-8 rounded-xl hover:bg-zinc-200 dark:hover:bg-[#27272A] transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-zinc-900 dark:text-[#c5fb00]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-[#c5fb00]">
                  {category.category}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {category.tools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-zinc-200 dark:bg-[#27272A] p-4 rounded-lg hover:bg-zinc-300 dark:hover:bg-[#323232] transition-colors"
                  >
                    <div className="text-zinc-900 dark:text-[#c5fb00]">{tool.icon}</div>
                    <span className="text-zinc-900 dark:text-white">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
