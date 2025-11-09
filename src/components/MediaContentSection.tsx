import { Container } from "./Container";
import { AnimatedButton } from "./AnimatedButton";
import clsx from 'clsx';
import React from 'react';

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
}

export const MediaContentSection = ({
  title, // <-- CAMBIO
  description,
  mediaContent,
  zIndex,
  mediaPosition = 'left',
  buttonHref,
  buttonText,
  buttonAriaLabel
}: MediaContentSectionProps) => {

  // 2. Definimos las columnas (sin cambios)
  const mediaColumn = (
    <div className="flex items-center justify-center h-64 md:h-96">
      {mediaContent}
    </div>
  );

  const textColumn = (
    <div className="max-w-md">
      <p className="text-base sm:text-lg md:text-xl mb-12 leading-relaxed text-black/70">
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
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black rounded-t-[5rem] -mt-20", // <-- CAMBIO AQUÍ
        zIndex 
      )}
    >
      <Container>
        {/* Título (MODIFICADO) */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            {title} {/* <-- CAMBIO: Título en una sola línea, sin <br> */}
          </h2>
        </div>

        {/* Layout de 2 columnas (sin cambios) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* 5. Ordenamos las columnas (sin cambios) */}
          <div className={clsx(
            "relative z-0", // <-- AÑADE ESTO
            mediaPosition === 'right' && 'md:order-last'
          )}>
            {mediaColumn}
          </div>
          <div className="relative z-10">
            {textColumn}
          </div>

        </div>
      </Container>
    </section>
  );
};