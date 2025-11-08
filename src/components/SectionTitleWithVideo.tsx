import clsx from 'clsx';
import React from 'react';

interface SectionTitleWithVideoProps {
  line1Text: string;
  line2Text: React.ReactNode; // Acepta string o JSX (para itálicas)
  videoPoster: string;
  videoWebM: string;
  videoMp4: string;
  className?: string; // Para clases extra (como márgenes)
  fontWeight?: 'font-light' | 'font-medium'; // Para flexibilidad
}

export const SectionTitleWithVideo = ({
  line1Text,
  line2Text,
  videoPoster,
  videoWebM,
  videoMp4,
  className,
  fontWeight = 'font-medium' // Por defecto será 'medium'
}: SectionTitleWithVideoProps) => {
  return (
    // Aplicamos el fontWeight y las clases de tamaño de fuente base
    <h2 className={clsx(
      "text-3xl sm:text-4xl md:text-5xl",
      fontWeight,
      className 
    )}>
      
      {/* Línea 1 de texto */}
      {line1Text}
      
      {/* Línea 2 (con el salto de línea, espaciado y video) */}
      <span className="flex flex-wrap items-center justify-start gap-x-4 mt-2">
        
        {/* Píldora de Video (con altura dinámica) */}
        <span className="inline-flex items-center justify-center h-[0.85em] aspect-[2/1] rounded-full overflow-hidden align-middle shrink-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="w-full h-full object-cover scale-150"
          >
            <source src={videoWebM} type="video/webm" /> 
            <source src={videoMp4} type="video/mp4" /> 
          </video>
        </span>
        
        {/* Línea 2 de texto */}
        {line2Text} 
        
      </span>
    </h2>
  );
};