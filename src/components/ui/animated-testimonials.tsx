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
    <div
      className={cn(
        "-mt-[250px] mb-20 w-full max-w-full px-2 py-4 sm:mt-0 sm:px-4 sm:py-20",
        className,
      )}
    >
      <div className="relative mx-auto grid max-w-full grid-cols-1 items-center gap-x-4 gap-y-[50px] sm:max-w-[1000px] sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
        <div className="sm:mb-0">
          <TestimonialImage testimonials={testimonials} active={active} />
        </div>
        <div className="flex h-[400px] flex-col rounded-xl border border-pink-200 bg-pink-50 px-4 py-6 dark:border-pink-900 dark:bg-[#18181b] sm:h-[600px] sm:px-8 sm:py-12">
          <div className="flex-grow">
            <TestimonialContent testimonial={testimonials[active]} />
            <div className="flex justify-center gap-4 pt-8 sm:justify-start sm:pt-12">
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
