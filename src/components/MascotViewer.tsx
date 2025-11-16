// EN: src/components/MascotViewer.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber'; 
import { Environment } from '@react-three/drei';
import { MascotScene } from './MascotScene';
import { Suspense, useRef, useEffect, RefObject } from 'react'; // <-- Usa 'useEffect'
import { Group } from 'three'; 
import { gsap } from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

// Componente interno (con los ajustes de centrado)
const ModelAnimator = ({ animationProps }: { animationProps: RefObject<{ rotationY: number }> }) => {
  const sceneRef = useRef<Group>(null);

  useFrame(() => {
    if (sceneRef.current && animationProps.current) {
      sceneRef.current.rotation.y = animationProps.current.rotationY;
    }
  });

  return (
    <group ref={sceneRef} scale={1.8} position={[0, -0.2, 0]}> 
      <MascotScene />
    </group>
  );
};


// Componente Padre (Maneja GSAP y el Canvas)
export const MascotViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const animationProps = useRef({ rotationY: 0 }); 

  // Usa 'useEffect' (no useLayoutEffect)
  useEffect(() => {
    
    let anim: gsap.core.Tween | null = null;

    // Usa el 'setTimeout' para vencer a StrictMode
    const timeout = setTimeout(() => {
      
      anim = gsap.to(animationProps.current, { 
        rotationY: Math.PI * 2,
        ease: 'none',   
        scrollTrigger: {
          trigger: containerRef.current, 
          start: 'top bottom',
          end: 'bottom top',   
          scrub: 1, 
        },
      });
      
    }, 100); // 100ms de retraso

    // Limpieza (solo limpia el timeout y la anim)
    return () => {
      clearTimeout(timeout);
      anim?.kill(); 
    };
    
  }, []); 

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