// EN: src/components/FaqItem.tsx
'use client'; 

import { ChevronDown } from 'lucide-react';

// 1. Define la "forma" de las props que el componente espera recibir
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

// 2. Recibe y "desestructura" las props aquí
export const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {

  return (
    // 3. Este es el 'return' con el estilo de tarjeta que querías
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl transition-all duration-300
                    hover:border-neutral-300">
      
      {/* Botón de la Pregunta */}
      <button
        onClick={onToggle} // Usa la prop 'onToggle'
        className="flex justify-between items-center w-full p-6 text-left gap-4"
      >
        <span className="text-xl md:text-2xl font-medium">{question}</span> {/* Usa la prop 'question' */}
        <ChevronDown 
          size={24} 
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} // Usa la prop 'isOpen'
        />
      </button>
      
      {/* Contenedor de la Respuesta (animado) */}
      <div 
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }} // Usa la prop 'isOpen'
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-lg text-black/70 max-w-prose">
            {answer} {/* Usa la prop 'answer' */}
          </p>
        </div>
      </div>
    </div>
  );
};