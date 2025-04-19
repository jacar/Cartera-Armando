"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "../animated-testimonials";

interface TestimonialContentProps {
  testimonial: Testimonial;
  animationDuration?: number;
}

export function TestimonialContent({
  testimonial,
  animationDuration = 0.2,
}: TestimonialContentProps) {
  return (
    <motion.div
      key={testimonial.name}
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: -10,
        opacity: 0,
      }}
      transition={{
        duration: animationDuration * 0.6,
        ease: "easeOut",
        staggerChildren: 0.05,
      }}
      className="space-y-6"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <motion.p className="mb-8 text-xl leading-relaxed text-zinc-800 dark:text-gray-200">
        {testimonial.quote.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{
              filter: "blur(10px)",
              opacity: 0,
              y: 5,
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
              delay: 0.015 * index,
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.p>
      <div className="mt-8 flex items-center gap-4">
        <img
          src={testimonial.avatar || testimonial.src}
          alt={testimonial.name}
          className="h-16 w-16 rounded-full border-2 border-zinc-200 object-cover dark:border-[#27272A]"
        />
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-[#c5fb00]">
            {testimonial.name}
          </h3>
          <p className="text-base text-zinc-600 dark:text-gray-400">
            {testimonial.designation}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="h-5 w-5 text-[#c5fb00]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
}
