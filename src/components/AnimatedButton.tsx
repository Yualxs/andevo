'use client';
import Link from 'next/link';

interface AnimatedButtonProps {
  href: string;
  text: string;
  ariaLabel?: string;
  isSecondary?: boolean; // Para botones negros (como en el blog)
}

/**
 * Réplica del botón animado de Webflow
 */
export const AnimatedButton = ({ href, text, ariaLabel, isSecondary = false }: AnimatedButtonProps) => {
  const isInternal = href.startsWith('/');

  // Clases base del botón
  const buttonClasses = `
    relative inline-block px-12 py-5 rounded-full font-medium cursor-pointer 
    overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.34,5.56,0.64,1)]
    group hover:scale-x-[1.02]
    ${isSecondary ? 'bg-black text-white' : 'bg-white text-black'}
  `;

  // El texto dual que se desliza
  const textContent = (
    <span className="relative block z-10 overflow-hidden">
      {/* Texto principal */}
      <span 
        className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                   group-hover:-translate-y-full"
      >
        {text}
      </span>
      {/* Texto secundario (aparece al hacer hover) */}
      <span 
        className={`absolute top-full left-0 block
                    transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:-translate-y-full
                    ${isSecondary ? 'text-black' : 'text-white'}`}
      >
        {text}
      </span>
    </span>
  );

  const buttonContent = (
    <>
      {/* Borde */}
      <span className="absolute inset-0 z-0 border border-current rounded-full"></span>
      
      {/* Efecto de "onda" (ripple) */}
      <span className="absolute inset-0 z-0 overflow-hidden rounded-full">
        <span 
          className="absolute block w-full h-full bg-current 
                     translate-y-full rounded-t-[50%] transition-all duration-500 
                     ease-[cubic-bezier(0.4,0,0,1)]
                     group-hover:translate-y-0 group-hover:rounded-t-none"
        ></span>
      </span>
      
      {/* Contenido de texto */}
      {textContent}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={buttonClasses} aria-label={ariaLabel}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <a href={href} className={buttonClasses} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
      {buttonContent}
    </a>
  );
};