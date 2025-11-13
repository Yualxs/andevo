// EN: src/components/ElasticDivider.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const ElasticDivider = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<SVGRectElement>(null);

  const morphProps = useRef({
    x: 600, // Coordenada X (horizontal)
    y: 30,  // Coordenada Y (vertical/profundidad)
  }).current;

  // quickTo para el seguimiento horizontal (X)
  const quickToX = useRef<gsap.QuickToFunc | null>(null);

  // --- 1. FUNCIÓN DE DIBUJADO (ACTUALIZADA) ---
  // La línea recta ahora vive en y=30 (cerca del tope del nuevo lienzo)
  const updatePath = () => {
    if (!pathRef.current) return;
    const { x, y } = morphProps;
    const newPath = `M0,30 Q${x},${y} 1200,30`; 
    gsap.set(pathRef.current, { attr: { d: newPath } });
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    const path = pathRef.current;
    if (!trigger || !path) return;

    // 2. Seguimiento X (Resorte "Pesado")
    quickToX.current = gsap.quickTo(morphProps, "x", {
      duration: 1.5, 
      ease: "elastic.out(1, 1.5)", 
      onUpdate: updatePath, 
    });
    
    // 3. Estado inicial (Recta)
    gsap.set(path, { attr: { d: "M0,30 Q600,30 1200,30" } });

    // 4. Animación de entrada (onMouseEnter)
    const onMouseEnter = () => {
      gsap.to(morphProps, {
        y: 140, // <-- La curva profunda (¡ahora visible!)
        duration: 2.0, 
        ease: 'elastic.out(1, 0.5)', 
        onUpdate: updatePath,
      });
    };

    // 5. Animación de salida (onMouseLeave)
    const onMouseLeave = () => {
      gsap.to(morphProps, {
        y: 30, // De vuelta a la recta (y=30)
        x: 600, // De vuelta al centro
        duration: 1.0, 
        ease: 'elastic.out(1, 0.6)', 
        onUpdate: updatePath,
      });
    };

    // 6. Animación de Movimiento (onMouseMove)
    const onMouseMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      const mouseX = e.clientX - rect.left; 
      const relativeX = mouseX / rect.width;
      const svgX = relativeX * 1200; // Coordenada SVG
      
      if (quickToX.current) {
        quickToX.current(svgX); 
      }
    };

    // 7. Asignar los 3 listeners
    trigger.addEventListener('mouseenter', onMouseEnter);
    trigger.addEventListener('mouseleave', onMouseLeave);
    trigger.addEventListener('mousemove', onMouseMove);

    // Limpieza
    return () => {
      trigger.removeEventListener('mouseenter', onMouseEnter);
      trigger.removeEventListener('mouseleave', onMouseLeave);
      trigger.removeEventListener('mousemove', onMouseMove);
    };
  }, []); 

  return (
    <svg
      width="100%"
      height="60" // <-- ALTURA FÍSICA (lo que ocupa en el layout)
      viewBox="0 0 1200 150" // <-- LIENZO INTERNO (más alto)
      preserveAspectRatio="none"
      className="w-full"
    >
      <path
        ref={pathRef}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-black" // Negro sólido
      />
      <rect
        ref={triggerRef}
        width="1200"
        height="150" // <-- GATILLO (cubre todo el lienzo)
        fill="transparent"
        className="cursor-pointer"
      />
    </svg>
  );
};