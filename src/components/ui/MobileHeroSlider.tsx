"use client";
import { useState } from "react";

const slides = [
  {
    title: "¡Haz despegar tu web con estilo!",
    color: "text-[#c5fb00]",
    bg: "bg-black/70",
  },
  {
    title: "Convierte ideas en experiencias web",
    color: "text-blue-400",
    bg: "bg-black/70",
  },
  {
    title: "Tu presencia digital, única y memorable",
    color: "text-orange-400",
    bg: "bg-black/70",
  },
];

export default function MobileHeroSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative flex min-h-[120px] w-full select-none flex-col items-center justify-center py-4">
      <div
        className={`rounded-xl px-4 py-6 text-center text-2xl font-extrabold leading-tight shadow-lg ${slides[index].color} ${slides[index].bg} animate-fade-in transition-all duration-500`}
      >
        {slides[index].title}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          aria-label="Anterior"
          onClick={prevSlide}
          className="h-3 w-3 rounded-full border border-white bg-white/40 hover:bg-white/80"
        ></button>
        <button
          aria-label="Siguiente"
          onClick={nextSlide}
          className="h-3 w-3 rounded-full border border-white bg-white/40 hover:bg-white/80"
        ></button>
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`inline-block h-2 w-2 rounded-full ${i === index ? "bg-[#c5fb00]" : "bg-white/30"} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
