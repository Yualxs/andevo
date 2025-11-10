'use client';

import clsx from 'clsx';
import React from 'react';

interface AnimatedRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AnimatedRadio = ({ label, ...props }: AnimatedRadioProps) => {
  return (
    <label className="form-radio group relative inline-block cursor-pointer">
      <input
        {...props}
        type="radio" 
        className="peer absolute -z-10 opacity-0"
      />
      {/* 1. El 'peer-checked:scale-x-[1.02]' es el único que se queda */ }
      <span className={clsx(
        "radio-box bg-white text-black relative inline-block transform-gpu overflow-hidden rounded-full py-3 px-6 text-xl font-medium",
        "transition-transform duration-500 ease-[cubic-bezier(0.34,5.56,0.64,1)]",
        "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-blue-500",
        "peer-checked:scale-x-[1.02]"
      )}>
        <span className="radio-border absolute inset-0 z-[3] rounded-full border border-current" />
        
        {/* Ripple (fondo que sube) */}
        <span className="radio-ripple absolute inset-0 z-[1] overflow-hidden rounded-full">
          {/* Deja solo las clases de estilo, no de animación */}
          <span className="absolute block h-full w-full rounded-t-[50%] bg-current" />
        </span>
        
        {/* 3. TÍTULO CORREGIDO: 
            Volvemos a un solo <span> con 'data-text'
        */}
        <span className="radio-title relative z-[2] block overflow-hidden">
          <span 
            className="block text-black" // <-- SOLO DEJA ESTO
            data-text={label}
          >
            {label}
          </span>
        </span>
      </span>
    </label>
  );
};