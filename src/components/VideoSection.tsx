// EN: src/components/VideoSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // <-- Se fueron GSAP y useCallback
import { Container } from './Container';
import Player from '@vimeo/player';
import { Volume2, Play, Pause } from 'lucide-react';
// (No hay importación de GSAP)

export const VideoSection = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null); 
  const playerRef = useRef<Player | null>(null); 
  const vimeoVideoId = '1072711253';

  const [isPlaying, setIsPlaying] = useState(true);
  const [isActivated, setIsActivated] = useState(false); 

  // (Ya no necesitamos los refs para los contenedores de los botones)

  // --- Hook de Efecto (Vimeo Player) ---
  useEffect(() => {
    if (videoContainerRef.current && !playerRef.current) {
      const options = {
        id: vimeoVideoId,
        responsive: true,
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
        title: false,
        byline: false,
        portrait: false,
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
  }, [vimeoVideoId]);

  // --- (Se eliminó toda la lógica del efecto magnético de GSAP) ---

  // --- Handlers ---
  const handleUnmute = () => {
    if (playerRef.current) {
      playerRef.current.setMuted(false);
      playerRef.current.setVolume(1);
      setIsPlaying(true); 
      setIsActivated(true);
      playerRef.current.play();
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
                 rounded-t-[5rem] -mt-20" // <-- Corregido con el boleado de 5rem
    >
      <Container>
        {/* Título de la sección (sin cambios) */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-light">
            ¡Transforma <span className="italic">tu marca</span>
            <br />
            con nosotros!
          </h2>
        </div>
        
        {/* --- Contenedor Principal del Video --- */}
        <div 
          ref={videoContainerRef}
          className="relative w-full aspect-video rounded-3xl overflow-hidden"
        >
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-black/30 cursor-pointer z-10
                        transition-opacity duration-500 ease-in-out
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handleUnmute}
          />

          {/* --- Botones Personalizados --- */}
          
          {/* Contenedor del Botón de Sonido (Centrado) */}
          <div 
            // ref={unmuteButtonContainerRef} <-- Ya no se necesita
            className={`absolute inset-0 flex items-center justify-center z-20
                        transition-opacity duration-500
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <button
              onClick={handleUnmute}
              aria-label="Activar sonido"
              className="w-20 h-20 rounded-full bg-white/20 text-white flex items-center justify-center
                         backdrop-blur-sm magnetic"
            >
              <Volume2 size={32} />
            </button>
          </div>

          {/* Contenedor del Botón de Play/Pausa (Arriba a la derecha) */}
          <div 
            // ref={playPauseButtonContainerRef} <-- Ya no se necesita
            className={`absolute top-6 right-6 z-20
                        transition-opacity duration-500 delay-200
                        ${isActivated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center
                         backdrop-blur-sm magnetic"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

        </div> {/* Fin del contenedor Principal del Video */}
      </Container>
    </section>
  );
};