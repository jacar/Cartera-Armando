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
    <div className={cn("mb-20 w-full max-w-[100vw] px-2 sm:px-4 py-10 sm:py-20", className)}>
      <div className="relative mx-auto max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="mb-6 sm:mb-0">
          <TestimonialImage testimonials={testimonials} active={active} />
        </div>
        <div className="flex flex-col h-auto sm:h-[600px] rounded-xl border border-pink-200 bg-pink-50 px-4 sm:px-8 py-6 sm:py-12 dark:border-pink-900 dark:bg-[#18181b]">
          <div className="flex-grow">
            <TestimonialContent testimonial={testimonials[active]} />
            <div className="flex gap-4 pt-8 sm:pt-12 justify-center sm:justify-start">
              <button
                onClick={handlePrev}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-secondary"
              >
                <IconArrowLeft className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-secondary"
              >
                <IconArrowRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
