// EN: src/components/AnimateOnScroll.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

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

    // Declaramos 'anim' aquí para que sea accesible en la limpieza
    let anim: gsap.core.Tween | null = null; 

    // Usamos setTimeout para esperar el "tick" del navegador
    const timeout = setTimeout(() => {
      // Lógica 'fadeInUp' (la única que debe tener este componente)
      gsap.set(el, { 
        opacity: 0, 
        y: 50 
      });
      
      anim = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el, 
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, 100); // 100ms de retraso seguro

    // Función de limpieza unificada
    return () => {
      clearTimeout(timeout); // Limpia el timeout
      anim?.kill(); // Limpia la animación (esto también mata el ScrollTrigger)
    };

  }, [ref, delay]); // Array de dependencias limpio

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};