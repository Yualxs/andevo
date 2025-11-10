'use client';

import clsx from 'clsx';
import React from 'react';

interface AnimatedCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AnimatedCheckbox = ({ label, ...props }: AnimatedCheckboxProps) => {
  return (
    <label className="form-checkbox group relative inline-block cursor-pointer">
      <input
        {...props}
        type="checkbox"
        className="peer absolute -z-10 opacity-0"
      />
      {/* 1. El 'peer-checked:scale-x-[1.02]' es el único que se queda */ }
      <span className={clsx(
        "checkbox-box bg-white text-black relative inline-block transform-gpu overflow-hidden rounded-full py-3 px-6 text-xl font-medium",
        "transition-transform duration-500 ease-[cubic-bezier(0.34,5.56,0.64,1)]",
        "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-blue-500",
        "peer-checked:scale-x-[1.02]"
      )}>
        {/* Borde */}
        <span className="checkbox-border absolute inset-0 z-[3] rounded-full border border-current" />
        
        {/* Ripple (fondo que sube) */}
        <span className="checkbox-ripple absolute inset-0 z-[1] overflow-hidden rounded-full">
          {/* Deja solo las clases de estilo, no de animación */}
          <span className="absolute block h-full w-full rounded-t-[50%] bg-current" />
        </span>
        
        {/* 3. TÍTULO CORREGIDO: 
            Volvemos a un solo <span> con 'data-text'
        */}
        <span className="checkbox-title relative z-[2] block overflow-hidden">
          <span 
            className="block text-black" /* Solo necesitas esta clase */
            data-text={label}
          >
            {label}
          </span>
        </span>
      </span>
    </label>
  );
};