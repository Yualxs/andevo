// EN: src/components/VideoSection.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react'; // <-- Añadido useCallback
import { Container } from './Container';
import Player from '@vimeo/player';
import { Volume2, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap'; // <-- Importar GSAP

export const VideoSection = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null); 
  const playerRef = useRef<Player | null>(null); 
  const vimeoVideoId = '1072711253';

  const [isPlaying, setIsPlaying] = useState(true);
  const [isActivated, setIsActivated] = useState(false); 

  // Refs para los botones para el efecto magnético
  const unmuteButtonContainerRef = useRef<HTMLDivElement>(null);
  const playPauseButtonContainerRef = useRef<HTMLDivElement>(null);
  
  // --- Hook de Efecto (Vimeo Player) ---
  useEffect(() => {
    if (videoContainerRef.current && !playerRef.current) {
      const options = {
        id: vimeoVideoId,
        // background: true, // <-- LO QUITAMOS
        responsive: true,    // <-- AÑADIMOS ESTO
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,     // Replicamos 'background:true'
        title: false,        // Replicamos 'background:true'
        byline: false,       // Replicamos 'background:true'
        portrait: false,     // Replicamos 'background:true'
        dnt: true,
        quality: '1080p',
      };
      const player = new Player(videoContainerRef.current, options);
      playerRef.current = player;

      player.on('play', () => setIsPlaying(true));
      player.on('pause', () => setIsPlaying(false));

      player.setMuted(true);

      return () => {
        player.destroy();
        playerRef.current = null;
      };
    }
  }, [vimeoVideoId]); // <-- Añade vimeoVideoId como dependencia

  // --- Lógica del efecto magnético ---
  const applyMagneticEffect = useCallback((container: HTMLElement | null, strength: number = 0.4) => {
    if (!container) return;
    
    const element = container.children[0] as HTMLElement; // El botón dentro del div
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        ease: "power2.out",
        duration: 0.5
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.5)",
        duration: 0.8
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      gsap.to(element, { x: 0, y: 0, ease: "power2.out", duration: 0.3 }); // Resetea al limpiar
    };
  }, []);

  // --- Hook para aplicar el efecto magnético ---
  useEffect(() => {
    // Este hook se encarga de aplicar/limpiar los listeners de GSAP
    let cleanupUnmute: (() => void) | undefined;
    let cleanupPlayPause: (() => void) | undefined;
    
    if (isActivated) {
      // Si está activado, aplica efecto al botón play/pausa
      cleanupPlayPause = applyMagneticEffect(playPauseButtonContainerRef.current);
    } else {
      // Si no, aplica efecto al botón de sonido
      cleanupUnmute = applyMagneticEffect(unmuteButtonContainerRef.current);
    }
    
    // Función de limpieza: se ejecuta cuando 'isActivated' cambia
    return () => {
      cleanupUnmute?.();
      cleanupPlayPause?.();
    };
  }, [isActivated, applyMagneticEffect]);


  // --- Handlers ---
  const handleUnmute = () => {
    if (playerRef.current) {
      playerRef.current.setMuted(false);
      playerRef.current.setVolume(1); // Asegurar volumen completo al desmutear
      setIsPlaying(true); // Asegurar que empieza a reproducir
      setIsActivated(true);
      playerRef.current.play(); // Asegurar que el video se reproduce al desmutear
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      className="relative z-30 py-24 md:py-32 bg-black text-white 
                 rounded-t-[5rem] -mt-[5rem]"
    >
      <Container>
        {/* Título de la sección (sin cambios) */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            ¡Transforma tu marca con nosotros!
          </h2>
        </div>
        
        {/* --- Contenedor Principal del Video (CORREGIDO) --- */}
        {/* Este div actúa como el marco para el video y todos sus controles */}
        <div 
          ref={videoContainerRef}
          className="relative w-full aspect-video rounded-3xl overflow-hidden"
        >
          {/* ¡IMPORTANTE! El IFRAME de Vimeo se inyectará aquí automáticamente
            como un hijo directo de este div, con 'absolute inset-0'.
            No necesitamos un div explícito para el iframe.
          */}

          {/* Overlay (Ahora es absoluto respecto al padre del video) */}
          <div 
            className={`absolute inset-0 bg-black/30 cursor-pointer z-10
                        transition-opacity duration-500 ease-in-out
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handleUnmute}
          />

          {/* --- Botones Personalizados (DOM CORREGIDO) --- */}
          
          {/* Contenedor del Botón de Sonido (Centrado, absoluto respecto al padre del video) */}
          <div 
            ref={unmuteButtonContainerRef}
            className={`absolute inset-0 flex items-center justify-center z-20
                        transition-opacity duration-500
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <button
              onClick={handleUnmute}
              aria-label="Activar sonido"
              className="w-20 h-20 rounded-full bg-white/20 text-white flex items-center justify-center
                         backdrop-blur-sm"
            >
              <Volume2 size={32} />
            </button>
          </div>

          {/* Contenedor del Botón de Play/Pausa (Arriba a la derecha, absoluto respecto al padre del video) */}
          <div 
            ref={playPauseButtonContainerRef}
            className={`absolute top-6 right-6 z-20
                        transition-opacity duration-500 delay-200
                        ${isActivated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center
                         backdrop-blur-sm"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

        </div> {/* Fin del contenedor Principal del Video */}
      </Container>
    </section>
  );
};