'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';

interface StaggeredEntryAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Un retraso opcional antes de que comience la animación
}

export const StaggeredEntryAnimation = ({ 
  children, 
  className, 
  delay = 0 
}: StaggeredEntryAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Encuentra todos los elementos "hijos" directos del wrapper
    const elementsToAnimate = gsap.utils.toArray<HTMLElement>(el.children);
    
    if (elementsToAnimate.length === 0) return;

    // 2. ESTADO INICIAL (Oculto)
    // Los preparamos antes de animar: invisibles y 40px abajo
    gsap.set(elementsToAnimate, { 
      opacity: 0, 
      y: 40 
    });
    
    // 3. LA ANIMACIÓN DE ENTRADA
    const anim = gsap.to(elementsToAnimate, {
      opacity: 1,
      y: 0,
      duration: 1.0, // Duración de 1 segundo
      delay: delay,
      ease: 'power3.out',
      stagger: 0.15, // <-- La magia: Anima cada hijo 0.15s después del anterior
    });

    // 4. Limpieza
    return () => {
      anim.kill();
    };
  }, [ref, delay]); // Se ejecuta solo una vez al cargar

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};