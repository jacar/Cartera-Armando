"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, Settings2 } from "lucide-react";

// Utilidad para detectar móvil
declare const window: any;
const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

export default function TouchScrollControl() {
  const [showSettings, setShowSettings] = useState(false);
  const [speed, setSpeed] = useState(40); // velocidad de scroll por tap

  // Scroll suave
  const scrollBy = (amount: number) => {
    window.scrollBy({
      top: amount,
      behavior: 'smooth',
    });
  };

  if (!isMobile) return null;

  return (
    <div className="fixed right-2 top-1/2 z-50 flex flex-col items-center -translate-y-1/2 select-none">
      <button
        aria-label="Scroll arriba"
        className="mb-2 rounded-full bg-black/40 p-2 text-white shadow-lg backdrop-blur-sm hover:bg-black/60 transition-opacity opacity-70 hover:opacity-100"
        style={{ pointerEvents: 'auto' }}
        onTouchStart={() => scrollBy(-speed)}
      >
        <ChevronUp size={28} />
      </button>
      <button
        aria-label="Scroll abajo"
        className="mt-2 rounded-full bg-black/40 p-2 text-white shadow-lg backdrop-blur-sm hover:bg-black/60 transition-opacity opacity-70 hover:opacity-100"
        style={{ pointerEvents: 'auto' }}
        onTouchStart={() => scrollBy(speed)}
      >
        <ChevronDown size={28} />
      </button>
      <button
        aria-label="Configurar velocidad"
        className="mt-4 rounded-full bg-black/20 p-1 text-white opacity-50 hover:opacity-90 transition"
        onClick={() => setShowSettings((v) => !v)}
        style={{ pointerEvents: 'auto' }}
      >
        <Settings2 size={20} />
      </button>
      {showSettings && (
        <div className="mt-2 rounded-xl bg-black/70 p-3 text-white shadow-xl flex flex-col items-center gap-2 min-w-[120px]">
          <label className="text-xs mb-1">Velocidad</label>
          <input
            type="range"
            min={10}
            max={120}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-full accent-[#c5fb00]"
          />
          <span className="text-xs">{speed} px</span>
        </div>
      )}
    </div>
  );
}
