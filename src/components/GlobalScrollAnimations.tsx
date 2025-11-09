// EN: src/components/GlobalScrollAnimations.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GlobalScrollAnimations = () => {
  
  useEffect(() => {
    // 1. Registrar el plugin una sola vez
    gsap.registerPlugin(ScrollTrigger);

    // --- Lógica de Rotación (de Header.tsx) ---
    const rotatingImages = gsap.utils.toArray('.rotating-image');
    let rotationTimeline: gsap.core.Timeline | null = null;

    if (rotatingImages.length > 0) {
      rotationTimeline = gsap.timeline({ repeat: -1 });
      rotationTimeline.to(rotatingImages, {
        rotation: 360,
        duration: 15,
        ease: 'none',
      });
    }

    // --- Lógica de Marquee (de Footer.tsx) ---
    const marquee = document.querySelector<HTMLDivElement>('.global-marquee-wrapper');
    let marqueeTimeline: gsap.core.Timeline | null = null;

    if (marquee) {
      // Calculamos el ancho de la MITAD de los paneles
      const loopWidth = marquee.scrollWidth / 2;
      marqueeTimeline = gsap.fromTo(marquee,
        { x: 0 },
        { 
          x: -loopWidth,
          duration: 30, // Velocidad base
          ease: 'none',
          repeat: -1,
        }
      );
    }

    // --- Disparador de Scroll ÚNICO (Consolidado) ---
    let scrollTimeout: NodeJS.Timeout;
    
    const st = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const direction = self.direction;
        // Usamos la sensibilidad de 500 que teníamos en el Footer
        const velocity = Math.abs(self.getVelocity() / 500); 
        const newTimeScale = direction * (1 + velocity);

        // 1. Actualiza el timeline de rotación
        if (rotationTimeline) {
          gsap.to(rotationTimeline, {
            timeScale: newTimeScale,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });
        }
        
        // 2. Actualiza el timeline del marquee
        if (marqueeTimeline) {
          gsap.to(marqueeTimeline, {
            timeScale: newTimeScale,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });
        }

        // Reseteo de velocidad (para ambos)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (rotationTimeline) {
            gsap.to(rotationTimeline, {
              timeScale: direction,
              duration: 1.5,
              ease: 'power2.out',
              overwrite: true,
            });
          }
          if (marqueeTimeline) {
            gsap.to(marqueeTimeline, {
              timeScale: direction,
              duration: 1.5,
              ease: 'power2.out',
              overwrite: true,
            });
          }
        }, 150);
      },
    });

    // Limpieza
    return () => {
      st.kill();
      rotationTimeline?.kill();
      marqueeTimeline?.kill();
      clearTimeout(scrollTimeout);
    };
    
  }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ

  return null; // Este componente no renderiza nada
};