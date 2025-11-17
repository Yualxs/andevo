// EN: src/app/services/_components/ServiceItem.tsx
'use client';

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { AnimatedButton } from "@/components/AnimatedButton";

interface ServiceItemProps {
  href: string;
  title?: string;
  description?: string;
  buttonText: string;
}

// Este es el componente que replica el layout .is-services
export const ServiceItem = ({ href, title, description, buttonText }: ServiceItemProps) => {
  return (
    <AnimateOnScroll className="py-12 lg:py-16">
      {/* --- ¡CAMBIO AQUÍ! --- */}
      {/* Cambiamos 'md:grid-cols-3' por 'md:grid-cols-2' para un layout 50/50 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        
        {/* Columna 1: Título (ahora ocupa 1 de 2 columnas) */}
        <div className="md:col-span-1">
          <h3 className="text-lg md:text-xl font-medium uppercase tracking-wider text-white">
            {title || 'Servicio sin título'}
          </h3>
        </div>

        {/* Columna 2: Descripción y Botón (ahora ocupa 1 de 2 columnas) */}
        <div className="md:col-span-1">
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
            {description || 'Sin descripción.'}
          </p>
          <AnimatedButton
            href={href}
            text={buttonText}
            ariaLabel={`Saber más sobre ${title}`}
            isSecondary={true}
          />
        </div>
      </div>
    </AnimateOnScroll>
  );
};