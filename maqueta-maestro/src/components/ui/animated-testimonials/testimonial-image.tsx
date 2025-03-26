"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TestimonialImageProps {
  testimonials: Array<{
    src: string;
    name: string;
  }>;
  active: number;
  animationDuration?: number;
}

export function TestimonialImage({ 
  testimonials, 
  active,
  animationDuration = 0.4 
}: TestimonialImageProps) {
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="relative h-[600px]">
      <AnimatePresence>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.src}
            initial={{
              opacity: 0,
              scale: 0.9,
              z: -100,
              rotate: randomRotateY(),
            }}
            animate={{
              opacity: index === active ? 1 : 0.7,
              scale: index === active ? 1 : 0.95,
              z: index === active ? 0 : -100,
              rotate: index === active ? 0 : randomRotateY(),
              zIndex: index === active ? 999 : testimonials.length + 2 - index,
              y: index === active ? [0, -80, 0] : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              z: 100,
              rotate: randomRotateY(),
            }}
            transition={{
              duration: animationDuration,
              ease: "easeInOut",
            }}
            className="absolute inset-0 origin-bottom"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c5fb00] to-[#18181b] rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image
                src={testimonial.src}
                alt={testimonial.name}
                width={800}
                height={800}
                draggable={false}
                className="relative h-full w-full rounded-2xl object-contain bg-pink-50 dark:bg-[#18181b] p-8 transition-all duration-300 group-hover:scale-[1.02] will-change-transform"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
