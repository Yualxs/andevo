// EN: src/app/_components/FaqItem.tsx
'use client'; 

import { ChevronDown } from 'lucide-react';
import clsx from 'clsx'; // <-- 1. Importa clsx

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  variant?: 'light' | 'dark'; // <-- 2. Añade la nueva prop 'variant'
}

export const FaqItem = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle, 
  variant = 'light' // <-- 3. Pon 'light' como valor por defecto
}: FaqItemProps) => {

  return (
    // 4. Clases condicionales para el contenedor
    <div className={clsx(
      "rounded-xl transition-all duration-300",
      variant === 'light' 
        ? "bg-neutral-50 border border-neutral-200 hover:border-neutral-300" 
        : "bg-black border border-white/20 hover:border-white/30" // Estilo oscuro
    )}>
      
      {/* Botón de la Pregunta */}
      <button
        onClick={onToggle} 
        className="flex justify-between items-center w-full p-6 text-left gap-4"
      >
        {/* 5. Clases condicionales para el texto */}
        <span className={clsx(
          "text-base sm:text-lg md:text-xl font-semibold",
          variant === 'light' ? "text-black" : "text-white"
        )}>
          {question}
        </span>
        <ChevronDown 
          size={24} 
          className={clsx(
            "flex-shrink-0 transition-transform duration-300",
            isOpen ? 'rotate-180' : 'rotate-0',
            variant === 'light' ? "text-black" : "text-white"
          )}
        />
      </button>
      
      {/* Contenedor de la Respuesta (animado) */}
      <div 
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          {/* 6. Clases condicionales para la respuesta */}
          <p className={clsx(
            "px-6 pb-6 text-base max-w-prose",
            variant === 'light' ? "text-black/70" : "text-white/70"
          )}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};