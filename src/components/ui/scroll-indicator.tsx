"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLineDown, 
  ArrowLineUp, 
  GearSix, 
  X, 
  Lightning, 
  Gauge 
} from '@phosphor-icons/react';
import { isMobile } from '@/lib/utils';
import { useTheme } from "next-themes";

/**
 * Componente que muestra un controlador de scroll flotante en dispositivos móviles
 * Permite navegar rápidamente hacia arriba y abajo, con opciones de velocidad configurables
 */
export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // 0.5 = lento, 1 = normal, 2 = rápido
  const { theme } = useTheme();

  // Clase para el color de fondo basado en el tema
  const bgColorClass = theme === 'dark' ? 'bg-[#c5fb00]' : 'bg-black';
  const textColorClass = theme === 'dark' ? 'text-black' : 'text-white';
  
  // Función para manejar el scroll y mantener visible el control
  const handleScroll = useCallback(() => {
    // El control siempre está visible, solo actualizamos la posición
    setIsVisible(true);
  }, []);

  // Función para desplazarse hacia arriba con velocidad configurable
  const scrollUp = useCallback(() => {
    const scrollAmount = window.innerHeight * scrollSpeed;
    const targetPosition = Math.max(0, window.scrollY - scrollAmount);
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, [scrollSpeed]);

  // Función para desplazarse hacia abajo con velocidad configurable
  const scrollDown = useCallback(() => {
    const scrollAmount = window.innerHeight * scrollSpeed;
    const targetPosition = window.scrollY + scrollAmount;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, [scrollSpeed]);

  // Función para configurar la velocidad de desplazamiento
  const setSpeed = (speed) => {
    setScrollSpeed(speed);
    setShowSettings(false); // Cerrar panel de configuración después de seleccionar
  };

  // Efecto para inicializar y configurar el controlador
  useEffect(() => {
    // Solo mostrar en dispositivos móviles
    setIsMobileDevice(isMobile());
    
    // Configurar el detector de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Si no es un dispositivo móvil, no renderizar nada
  if (!isMobileDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-2"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Botón para desplazarse hacia arriba */}
          <motion.button
            className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColorClass} shadow-lg`}
            onClick={scrollUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Desplazarse hacia arriba"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowLineUp size={24} weight="bold" className={textColorClass} />
            </motion.div>
          </motion.button>

          {/* Botón para desplazarse hacia abajo */}
          <motion.button
            className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColorClass} shadow-lg`}
            onClick={scrollDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Desplazarse hacia abajo"
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowLineDown size={24} weight="bold" className={textColorClass} />
            </motion.div>
          </motion.button>

          {/* Botón de configuración */}
          <motion.button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} shadow-lg`}
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Configurar velocidad de desplazamiento"
          >
            {showSettings ? (
              <X size={20} weight="bold" className={textColorClass} />
            ) : (
              <GearSix size={20} weight="bold" className={textColorClass} />
            )}
          </motion.button>

          {/* Panel de configuración de velocidad */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                className={`absolute right-12 top-1/2 -translate-y-1/2 rounded-lg p-3 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} shadow-lg`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div className="text-sm font-medium mb-2 text-center">Velocidad</div>
                <div className="flex flex-col gap-2">
                  <motion.button
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${scrollSpeed === 0.5 ? bgColorClass : 'hover:bg-opacity-20 hover:bg-gray-500'}`}
                    onClick={() => setSpeed(0.5)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Gauge size={18} weight="bold" className={textColorClass} />
                    <span className={scrollSpeed === 0.5 ? textColorClass : ''}>Lento</span>
                  </motion.button>
                  
                  <motion.button
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${scrollSpeed === 1 ? bgColorClass : 'hover:bg-opacity-20 hover:bg-gray-500'}`}
                    onClick={() => setSpeed(1)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Lightning size={18} weight="bold" className={textColorClass} />
                    <span className={scrollSpeed === 1 ? textColorClass : ''}>Normal</span>
                  </motion.button>
                  
                  <motion.button
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${scrollSpeed === 2 ? bgColorClass : 'hover:bg-opacity-20 hover:bg-gray-500'}`}
                    onClick={() => setSpeed(2)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Lightning size={18} weight="bold" className={textColorClass} />
                    <Lightning size={18} weight="bold" className={textColorClass} />
                    <span className={scrollSpeed === 2 ? textColorClass : ''}>Rápido</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
