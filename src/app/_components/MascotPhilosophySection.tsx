// EN: src/app/_components/MascotPhilosophySection.tsx
'use client';

import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { DynamicMascotViewer } from "@/components/DynamicMascotViewer";
import clsx from 'clsx';
import React from 'react';

export const MascotPhilosophySection = () => {

  const zIndex = "z-50";
  const title = "Nuestra filosofía";
  const description = "Estamos impulsados por el diseño centrado en el usuario que impulsa la productividad y aumenta los ingresos. Nuestra experiencia e ingenio son notables, pero siempre nos esforzamos en mejorar en cada proyecto.";
  
  // const mediaPosition = 'left'; // <-- Ya no necesitamos esta variable

  const textColumn = (
    <div className="max-w-md">
      <p className="text-lg sm:text-lg md:text-xl mb-12 leading-relaxed text-black">
        {description}
      </p>
    </div>
  );

  return (
    <section 
      className={clsx(
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20",
        zIndex 
      )}
    >
      <Container>
        
        {/* Título */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            {title}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Columna de Media (3D) */}
          <div className="relative z-0">
            <div className="flex items-center justify-center h-64 md:h-96">
              {/* 2. Renderizamos el 3D directamente */}
              <DynamicMascotViewer />
            </div>
          </div>
          
          {/* Columna de Texto */}
          <AnimateOnScroll 
            className="relative z-10"
            delay={0.2} 
          >
            {textColumn}
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  );
};