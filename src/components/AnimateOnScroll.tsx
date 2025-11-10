'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

// Ya registramos ScrollTrigger en GlobalScrollAnimations, 
// pero es buena práctica registrarlo aquí también 
// para que el componente sea 100% independiente.
gsap.registerPlugin(ScrollTrigger);

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string; // Para pasar clases de layout (ej. 'mb-12')
  delay?: number;     // Para retrasar la animación
}

export const AnimateOnScroll = ({ 
  children, 
  className, 
  delay = 0 
}: AnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. ESTADO INICIAL (Oculto)
    // Lo ponemos aquí (y no con CSS) para evitar "flashes"
    gsap.set(el, { 
      opacity: 0, 
      y: 50 // Desplazado 50px hacia abajo
    });

    // 2. LA ANIMACIÓN DE REVELADO
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power2.out',
      // 3. EL DISPARADOR (ScrollTrigger)
      scrollTrigger: {
        trigger: el,
        start: 'top 85%', // Animar cuando el 85% superior entre en la pantalla
        toggleActions: 'play none none none', // Ejecutar la animación UNA SOLA VEZ
      },
    });

    // 4. Limpieza al desmontar el componente
    return () => {
      anim.kill(); // <-- GSAP se encarga de matar el trigger asociado
    };
  }, [ref, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};