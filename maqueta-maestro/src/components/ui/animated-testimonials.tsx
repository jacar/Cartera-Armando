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
    <div className={cn("mb-20 w-full max-w-[100vw] px-4 py-20", className)}>
      <div className="relative mx-auto grid max-w-[2000px] grid-cols-2 gap-12">
        <TestimonialImage testimonials={testimonials} active={active} />
        <div className="flex h-[600px] flex-col rounded-xl border border-pink-200 bg-pink-50 px-8 py-12 dark:border-pink-900 dark:bg-[#18181b]">
          <div className="flex-grow">
            <TestimonialContent testimonial={testimonials[active]} />
            <div className="flex gap-4 pt-12 md:pt-0">
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
