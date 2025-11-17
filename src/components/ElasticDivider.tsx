// EN: src/components/ElasticDivider.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx'; // <-- 1. Importa clsx

// 2. Añade la interfaz de props
interface ElasticDividerProps {
  className?: string;
}

// 3. Acepta 'className' y pon 'text-black' como valor POR DEFECTO
export const ElasticDivider = ({ className = "text-black" }: ElasticDividerProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<SVGRectElement>(null);

  const morphProps = useRef({
    x: 600, 
    y: 30,  
  }).current;

  const quickToX = useRef<gsap.QuickToFunc | null>(null);

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

    quickToX.current = gsap.quickTo(morphProps, "x", {
      duration: 1.5, 
      ease: "elastic.out(1, 1.5)", 
      onUpdate: updatePath, 
    });
    
    gsap.set(path, { attr: { d: "M0,30 Q600,30 1200,30" } });

    const onMouseEnter = () => {
      gsap.to(morphProps, {
        y: 140, 
        duration: 2.0, 
        ease: 'elastic.out(1, 0.5)', 
        onUpdate: updatePath,
      });
    };

    const onMouseLeave = () => {
      gsap.to(morphProps, {
        y: 30, 
        x: 600, 
        duration: 1.0, 
        ease: 'elastic.out(1, 0.6)', 
        onUpdate: updatePath,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      const mouseX = e.clientX - rect.left; 
      const relativeX = mouseX / rect.width;
      const svgX = relativeX * 1200; 
      
      if (quickToX.current) {
        quickToX.current(svgX); 
      }
    };

    trigger.addEventListener('mouseenter', onMouseEnter);
    trigger.addEventListener('mouseleave', onMouseLeave);
    trigger.addEventListener('mousemove', onMouseMove);

    return () => {
      trigger.removeEventListener('mouseenter', onMouseEnter);
      trigger.removeEventListener('mouseleave', onMouseLeave);
      trigger.removeEventListener('mousemove', onMouseMove);
    };
  }, []); 

  return (
    <svg
      width="100%"
      height="60" 
      viewBox="0 0 1200 150" 
      preserveAspectRatio="none"
      className="w-full"
    >
      <path
        ref={pathRef}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        // --- 4. ¡CAMBIO AQUÍ! ---
        // Ahora solo aplica el 'className' que recibe (que por defecto es 'text-black')
        className={clsx(className)} 
      />
      <rect
        ref={triggerRef}
        width="1200"
        height="150" 
        fill="transparent"
        className="cursor-pointer"
      />
    </svg>
  );
};