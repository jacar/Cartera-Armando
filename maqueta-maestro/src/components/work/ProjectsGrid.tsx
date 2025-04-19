"use client";

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectCard } from "./ProjectCard";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { x: mouseX, y: mouseY } = useMousePosition();

  return (
    <motion.div
      ref={(node) => {
        ref(node);
        containerRef.current = node as HTMLDivElement;
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {projects.map((project, index) => {
        const currentMouseX = mouseX ?? 0;
        const currentMouseY = mouseY ?? 0;
        const rect = containerRef.current?.getBoundingClientRect();
        const centerX = rect ? rect.left + rect.width / 2 : 0;
        const centerY = rect ? rect.top + rect.height / 2 : 0;
        const rotateX = (currentMouseY - centerY) * 0.01;
        const rotateY = (currentMouseX - centerX) * 0.01;

        return (
          <motion.div
            key={project.title}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <ProjectCard project={project} index={index} inView={inView} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
