// EN: src/components/MediaContentSection.tsx
import { Container } from "./Container";
import { AnimatedButton } from "./AnimatedButton";
import clsx from 'clsx';
import React from 'react';

// 1. Definimos las Props que nuestro componente aceptará
interface MediaContentSectionProps {
  titleLine1: string;
  titleLine2: string; // La línea en itálica
  description: string;
  mediaContent: React.ReactNode; // Pasaremos el <img /> o <video /> como un hijo
  zIndex: string; // 'z-20' o 'z-50'
  mediaPosition?: 'left' | 'right'; // Para futura flexibilidad
  buttonHref?: string;
  buttonText?: string;
  buttonAriaLabel?: string;
}

export const MediaContentSection = ({
  titleLine1,
  titleLine2,
  description,
  mediaContent,
  zIndex,
  mediaPosition = 'left',
  buttonHref,
  buttonText,
  buttonAriaLabel
}: MediaContentSectionProps) => {

  // 2. Definimos las columnas como variables para poder reordenarlas
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
      
      {/* 3. Renderizado condicional del botón */}
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
    // 4. Usamos 'clsx' para aplicar el zIndex y el boleado de 5rem
    <section 
      className={clsx(
        "relative py-24 md:py-32 bg-white text-black rounded-t-[5rem] -mt-[5rem]",
        zIndex // Aplicamos el z-index ('z-20' o 'z-50')
      )}
    >
      <Container>
        {/* Título (ahora dinámico) */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            {titleLine1}
            <br />
            {titleLine2}
          </h2>
        </div>

        {/* Layout de 2 columnas (con orden dinámico) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* 5. Ordenamos las columnas según 'mediaPosition' */}
          <div className={clsx(mediaPosition === 'right' && 'md:order-last')}>
            {mediaColumn}
          </div>
          <div>
            {textColumn}
          </div>

        </div>
      </Container>
    </section>
  );
};