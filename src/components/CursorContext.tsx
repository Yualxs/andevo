'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import MouseFollower from 'mouse-follower';
import { gsap } from 'gsap';

// 1. Definimos la "forma" de nuestro contexto
interface CursorContextType {
  cursor: MouseFollower | null;
}

// 2. Creamos el contexto
const CursorContext = createContext<CursorContextType>({ cursor: null });

// 3. Creamos un hook para usarlo fácilmente
export const useCursor = () => useContext(CursorContext);

// 4. Este es nuestro NUEVO proveedor que SÍ comparte el cursor
export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursor, setCursor] = useState<MouseFollower | null>(null);

  useEffect(() => {
    
    // --- 1. AÑADE ESTA CONDICIÓN ---
    // 1024px es el breakpoint 'lg' de Tailwind, un estándar para tablets.
    // Si la pantalla es menor o igual a 1024px, no inicialices el cursor.
    if (window.innerWidth <= 1024) {
      return; // Salir del hook
    }
    // --- FIN DE LA CONDICIÓN ---

    // Registra GSAP
    MouseFollower.registerGSAP(gsap);

    // Inicializa el cursor
    const cursorOptions = {
      skewing: 1, // Esto permite el efecto "pegajoso"
      stickDelta: 0.15, // Esta es la "fuerza" del efecto pegajoso

      // Esto detecta botones y links para el efecto de "escala"
      stateDetection: {
        '-pointer': 'a:not(.no-cursor-pointer), button:not(.no-cursor-pointer), .menu-icon-trigger',
      },
    };

    // Inicializamos el cursor forzando las opciones
    const newCursor = new MouseFollower(cursorOptions as any);
    
    // Guarda la instancia en el estado de React
    setCursor(newCursor);

    // Limpia la instancia al salir
    return () => {
      newCursor.destroy();
    };
  }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ

  return (
    <CursorContext.Provider value={{ cursor }}>
      {children}
    </CursorContext.Provider>
  );
};