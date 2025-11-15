// EN: src/components/MediaContentSection.tsx
'use client'; // <-- 1. Asegúrate de que sea un 'client component'

import { Container } from "@/components/Container";
import { AnimatedButton } from "@/components/AnimatedButton";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import clsx from 'clsx';
import React from 'react';
import { DynamicMascotViewer } from "@/components/DynamicMascotViewer";

// 1. Definimos las Props (MODIFICADO)
interface MediaContentSectionProps {
  title: React.ReactNode; // <-- CAMBIO: Se unifica el título
  description: string;
  mediaContent: React.ReactNode; // Pasaremos el <img /> o <video /> como un hijo
  zIndex: string; // 'z-20' o 'z-50'
  mediaPosition?: 'left' | 'right'; // Para futura flexibilidad
  buttonHref?: string;
  buttonText?: string;
  buttonAriaLabel?: string;
  useMascotViewer?: boolean;
}

export const MediaContentSection = ({
  title, // <-- CAMBIO
  description,
  mediaContent,
  zIndex,
  mediaPosition = 'left',
  buttonHref,
  buttonText,
  buttonAriaLabel,
  useMascotViewer = false
}: MediaContentSectionProps) => {

  // 2. Definimos las columnas (sin cambios)
  const mediaColumn = (
    <div className="flex items-center justify-center h-64 md:h-96">
      {mediaContent}
    </div>
  );

  const textColumn = (
    <div className="max-w-md">
      <p className="text-lg sm:text-lg md:text-xl mb-12 leading-relaxed text-black">
        {description}
      </p>
      
      {/* 3. Renderizado condicional del botón (sin cambios) */}
      {buttonHref && buttonText && (
        <AnimatedButton
          href={buttonHref}
          text={buttonText}
          ariaLabel={buttonAriaLabel}
        />
      )}
    </div>
  );

  return (
    // 4. Usamos 'clsx' (sin cambios)
    <section 
      className={clsx(
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20",
        zIndex 
      )}
    >
      <Container>
        
        {/* 3. ENVUELVE EL TÍTULO */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            {title}
          </h2>
        </AnimateOnScroll>

        {/* 4. ENVUELVE EL GRID DE 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* --- INICIO DE LA CORRECCIÓN --- */}
          
          {/* 1. El wrapper AnimateOnScroll (ya no tiene clases de layout) */}
          <AnimateOnScroll 
            className={clsx(
              "relative z-0",
              mediaPosition === 'right' && 'md:order-last'
            )}
            delay={mediaPosition === 'left' ? 0.1 : 0.2} 
          >
            {/* 2. Restauramos el <div> de layout que da el tamaño */}
            <div className="flex items-center justify-center h-64 md:h-96">
              
              {/* 3. La lógica condicional (esto estaba bien) */}
              {useMascotViewer ? <DynamicMascotViewer /> : mediaContent}
            
            </div>
          </AnimateOnScroll>
          
          {/* 6. ENVUELVE LA COLUMNA DE TEXTO 
              (con un delay condicional) */}
          <AnimateOnScroll 
            className="relative z-10"
            delay={mediaPosition === 'left' ? 0.2 : 0.1} // Se anima un poco después del texto si está a la izquierda
          >
            {textColumn}
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  );
};