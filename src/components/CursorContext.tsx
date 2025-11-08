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
    // Registra GSAP
    MouseFollower.registerGSAP(gsap);

    // Inicializa el cursor
    const cursorOptions = {
      skewing: 1,
      // Usamos stateDetection para añadir la clase .-pointer
      // a los botones Y a nuestro ícono de menú.
      stateDetection: {
        '-pointer': 'a, button, .menu-icon-trigger',
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