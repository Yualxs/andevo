// EN: src/components/CtaBlock.tsx
import React, { ReactElement } from 'react'; // <-- 1. Importa ReactElement
import { AnimatedButton } from "./AnimatedButton";
import clsx from 'clsx'; // <-- 2. Importa clsx

// 3. Define la "forma" de las props que el elemento debe tener
interface ElementProps {
  className?: string;
  // Añade cualquier otra prop que los elementos puedan tener
}

// 4. Cambia la interface para que acepte ReactElement
interface CtaBlockProps {
  line1: ReactElement<ElementProps>;
  line2: ReactElement<ElementProps>;
}

export const CtaBlock = ({ line1, line2 }: CtaBlockProps) => {
  
  // 5. Clona 'line1' y fusiona sus props/clases
  const line1WithClass = React.cloneElement(line1, {
    className: clsx(
      line1.props.className, // <-- Obtiene las clases de page.tsx (ej. "text-2xl...")
      "text-lg sm:text-xl md:text-2xl font-medium text-black mb-2" // <-- Añade las clases base de CtaBlock
    )
  });

  // 6. Clona 'line2' y fusiona sus props/clases
  const line2WithClass = React.cloneElement(line2, {
    className: clsx(
      line2.props.className, // <-- Obtiene las clases de page.tsx
      "text-base sm:text-lg md:text-xl font-regular" // <-- Añade las clases base de CtaBlock
    )
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
      
      {/* Columna de Texto */}
      <div className="text-center md:text-left md:col-span-2">
        {line1WithClass} {/* <-- 7. Renderiza el nuevo elemento */}
        {line2WithClass} {/* <-- 7. Renderiza el nuevo elemento */}
      </div>
      
      {/* Columna del Botón (con tu centrado de mobile) */}
      <div className="text-center md:text-right">
        <AnimatedButton 
          href="/contacto"
          text="😎 Agendar consultoría"
          ariaLabel="Agendar consultoría de marketing digital"
        />
      </div>
    </div>
  );
};