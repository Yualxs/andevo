'use client';

import clsx from 'clsx';
import React from 'react';

// URLs de las líneas (sin cambios)
const blackLineSvg = `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'%3E%3Cpath fill='none' stroke='%23000' d='M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5C893.995,56.5,1200,56.5,1200,56.5'%3E%3C/path%3E%3C/svg%3E")`;
const redLineSvg = `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'%3E%3Cpath fill='none' stroke='%23DC2626' d='M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5C893.995,56.5,1200,56.5,1200,56.5'%3E%3C/path%3E%3C/svg%3E")`;

// Interfaces (sin cambios)
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isTextArea?: false;
  hasError?: boolean;
}
interface AnimatedTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isTextArea: true;
  hasError?: boolean;
}
type Props = AnimatedInputProps | AnimatedTextAreaProps;

export const AnimatedInput = (props: Props) => {
  const commonClasses = clsx(
    "form_input text-size-medium w-input",
    "relative z-2 block w-full border-0 bg-transparent py-4 text-3xl text-black outline-none placeholder:text-black/30",
    "focus:ring-0" 
  );

  const { isTextArea, hasError, ...rest } = props;

  return (
    <div className="form_field group relative overflow-hidden"> 
      {isTextArea ? (
        // Aseguramos que 'rest' (que contiene onBlur, onChange) se pase aquí
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={clsx(commonClasses, "is-text-area min-h-60 resize-none")}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className={commonClasses}
        />
      )}
      
      {/* Lógica de la línea (sin cambios) */}
      <div 
        className={clsx(
          "form_line pointer-events-none absolute bottom-0 left-0 right-0 z-1 h-[60px] w-[300%] bg-contain bg-bottom bg-no-repeat",
          "transition-transform,opacity duration-500 ease-[cubic-bezier(0,0.25,0.5,1)]",
          "translate-x-[-66.66%]",
          "group-focus-within:translate-x-0 group-focus-within:opacity-100",
          hasError ? 'opacity-100' : 'opacity-10'
        )}
        style={{
          backgroundImage: hasError ? redLineSvg : blackLineSvg,
        }}
      />
    </div>
  );
};