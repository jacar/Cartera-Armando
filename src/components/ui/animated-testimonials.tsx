"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TestimonialImage } from "./animated-testimonials/testimonial-image";
import { TestimonialContent } from "./animated-testimonials/testimonial-content";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  avatar?: string;
}

export type { Testimonial };

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("w-full max-w-[100vw] px-4 py-20 mb-20", className)}>
      <div className="relative grid grid-cols-2 gap-12 max-w-[2000px] mx-auto">
        <TestimonialImage 
          testimonials={testimonials}
          active={active}
        />
        <div className="flex flex-col py-12 px-8 bg-pink-50 dark:bg-[#18181b] rounded-xl h-[600px] border border-pink-200 dark:border-pink-900">
          <div className="flex-grow">
            <TestimonialContent testimonial={testimonials[active]} />
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <IconArrowLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <IconArrowRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
