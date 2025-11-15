// EN: src/components/MascotViewer.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber'; 
import { Environment } from '@react-three/drei';
import { MascotScene } from './MascotScene';
// --- 1. CAMBIO AQUÍ: Importa 'useLayoutEffect' ---
import { Suspense, useRef, useLayoutEffect, RefObject } from 'react'; 
import { Group } from 'three'; 
import { gsap } from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

// Componente interno (sin cambios)
const ModelAnimator = ({ animationProps }: { animationProps: RefObject<{ rotationY: number }> }) => {
  const sceneRef = useRef<Group>(null);

  useFrame(() => {
    if (sceneRef.current && animationProps.current) {
      sceneRef.current.rotation.y = animationProps.current.rotationY;
    }
  });

  return (
    <group ref={sceneRef} scale={1.5}> 
      <MascotScene />
    </group>
  );
};


// Componente Padre (Maneja GSAP y el Canvas)
export const MascotViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const animationProps = useRef({ rotationY: 0 }); 

  // --- 2. CAMBIO AQUÍ: de 'useEffect' a 'useLayoutEffect' ---
  // Esto se ejecuta ANTES de que el navegador pinte,
  // previniendo el "flash" y el bug de Strict Mode.
  useLayoutEffect(() => {
    
    // 3. El contexto de GSAP (esto estaba bien)
    const ctx = gsap.context(() => {
      
      gsap.to(animationProps.current, { 
        rotationY: Math.PI * 2,
        ease: 'none',   
        scrollTrigger: {
          trigger: containerRef.current, 
          start: 'top bottom',
          end: 'bottom top',   
          scrub: 1, 
        },
      });

    }, containerRef); 

    // 4. La limpieza (esto estaba bien)
    return () => ctx.revert(); 
    
  }, []); // El array de dependencias [] es correcto

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }} 
        shadows
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <ModelAnimator animationProps={animationProps} />
        </Suspense>
      </Canvas>
    </div>
  );
};