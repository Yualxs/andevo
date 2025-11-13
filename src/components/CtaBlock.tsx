// EN: src/components/CtaBlock.tsx
import React, { ReactElement } from 'react';
import { AnimatedButton } from "./AnimatedButton";
import clsx from 'clsx';

// 1. Exporta la interfaz para que CustomerLogos.tsx pueda usarla
export interface ElementProps {
  className?: string;
  // Añade cualquier otra prop que los elementos puedan tener
}

// 2. Define la interfaz de CtaBlockProps (UNA SOLA VEZ)
interface CtaBlockProps {
  line1: ReactElement<ElementProps>;
  line2: ReactElement<ElementProps>;
  buttonText?: string;
  buttonAriaLabel?: string;
  isSecondary?: boolean;
}

// 3. Exporta el componente
export const CtaBlock = ({ 
  line1, 
  line2,
  // Valores por defecto para no romper la Home
  buttonText = "😎 Agendar consultoría",
  buttonAriaLabel = "Agendar consultoría de marketing digital",
  isSecondary = false
}: CtaBlockProps) => { // <-- El error 'Cannot find name' se soluciona
  
  // 1. Modificamos 'line1WithClass'
  const line1WithClass = React.cloneElement(line1, {
    className: clsx(
      line1.props.className, 
      // Mantenemos las clases de tipografía/layout de la Home
      "text-lg sm:text-xl md:text-2xl font-medium mb-2", 
      // ARREGLO: Hacemos el color condicional
      isSecondary ? 'text-white' : 'text-black' 
    )
  });
  
  // 2. Modificamos 'line2WithClass'
  const line2WithClass = React.cloneElement(line2, {
    className: clsx(
      line2.props.className, 
      // Mantenemos las clases de tipografía/layout de la Home
      "text-base sm:text-lg md:text-xl font-regular", 
      // ARREGLO: Hacemos el color condicional (con opacidad para el subtítulo)
      isSecondary ? 'text-white/70' : 'text-black'
    )
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
      
      {/* Columna de Texto */}
      <div className="text-center md:text-left md:col-span-2">
        {line1WithClass}
        {line2WithClass}
      </div>
      
      {/* Columna del Botón (flexible) */}
      <div className="text-center md:text-right">
        <AnimatedButton 
          href="/contact"
          text={buttonText}
          ariaLabel={buttonAriaLabel}
          isSecondary={isSecondary}
        />
      </div>
    </div>
  );
};