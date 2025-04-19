"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    category: string;
    link: string;
  };
  index: number;
  inView: boolean;
}

export function ProjectCard({ project, index, inView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group cursor-pointer overflow-hidden rounded-xl bg-zinc-900 transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="p-6">
          <span className="text-sm text-black dark:text-[#c5fb00]">
            {project.category}
          </span>
          <h3 className="mb-3 mt-2 text-xl font-semibold text-black dark:text-white">
            {project.title}
          </h3>
          <p className="text-black dark:text-gray-300">{project.description}</p>
        </div>
      </a>
    </motion.div>
  );
}
