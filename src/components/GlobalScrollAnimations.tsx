'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GlobalScrollAnimations = () => {
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Lógica de Rotación ---
    const rotatingImages = gsap.utils.toArray('.rotating-image');
    // 1. CORRECCIÓN DE TIPO: Debe ser 'Timeline'
    let rotationTimeline: gsap.core.Timeline | null = null; 

    if (rotatingImages.length > 0) {
      rotationTimeline = gsap.timeline({ repeat: -1 }); // .timeline() devuelve una Timeline
      rotationTimeline.to(rotatingImages, { // .to() SÍ existe en Timeline
        rotation: 360,
        duration: 15,
        ease: 'none',
      });
    }

    // --- Lógica de Marquee ---
    const marquee = document.querySelector<HTMLDivElement>('.global-marquee-wrapper');
    // 1. CORRECCIÓN DE TIPO: Este SÍ es un 'Tween'
    let marqueeTimeline: gsap.core.Tween | null = null; 

    if (marquee) {
      const loopWidth = marquee.scrollWidth / 2;
      marqueeTimeline = gsap.fromTo(marquee, // .fromTo() devuelve un Tween
        { x: 0 },
        { 
          x: -loopWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
        }
      );
    }

    // --- Lógica de Ocultar Header ---
    const headerBar = document.querySelector<HTMLDivElement>('.global-header-bar');
    const headerQuickTo = headerBar ? gsap.quickTo(headerBar, "y", { duration: 0.5, ease: "power2.out" }) : null;
    let lastDirection = 0;

    // --- Disparador de Scroll ÚNICO ---
    let scrollTimeout: NodeJS.Timeout;
    
    const st = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      
      onUpdate: (self) => {
        const direction = self.direction;
        const velocity = Math.abs(self.getVelocity() / 500); 
        const newTimeScale = direction * (1 + velocity);

        // 1. Actualiza Rotación
        if (rotationTimeline) {
          gsap.to(rotationTimeline, {
            timeScale: newTimeScale,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });
        }
        
        // 2. Actualiza Marquee
        if (marqueeTimeline) {
          gsap.to(marqueeTimeline, {
            timeScale: newTimeScale,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });
        }

        // 3. Actualiza Header
        if (headerQuickTo && headerBar) {
          const isMenuOpen = headerBar.classList.contains('bg-transparent');
          
          if (direction !== lastDirection && !isMenuOpen) {
            
            // 2. CORRECCIÓN DE MÉTODO (Sigue siendo correcta)
            if (self.scroll() <= 100) { // <-- self.scroll()
              headerQuickTo(0); 
            } 
            else if (direction === 1) {
              headerQuickTo(-headerBar.offsetHeight); 
            } 
            else if (direction === -1) {
              headerQuickTo(0); 
            }
            lastDirection = direction;
          }
        }

        // Reseteo de velocidad
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
    
  }, []); 

  return null;
};