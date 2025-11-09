// EN: src/components/VideoSection.tsx
'use client';

// 1. Importaciones de React (incluyendo useCallback)
import { useState, useEffect, useRef, useCallback } from 'react';
// 2. Importación de GSAP
import { gsap } from 'gsap';
import { Container } from './Container';
import Player from '@vimeo/player';
import { Volume2, Play, Pause } from 'lucide-react';

export const VideoSection = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null); 
  const playerRef = useRef<Player | null>(null); 
  const vimeoVideoId = '1072711253';

  const [isPlaying, setIsPlaying] = useState(true);
  const [isActivated, setIsActivated] = useState(false); 

  // 3. Refs para los contenedores de los botones (para GSAP)
  const unmuteButtonContainerRef = useRef<HTMLDivElement>(null);
  const playPauseButtonContainerRef = useRef<HTMLDivElement>(null);

  // 4. Función del efecto magnético (restaurada)
  const applyMagneticEffect = useCallback((container: HTMLElement | null, strength: number = 0.4) => {
    if (!container) return;
    
    const element = container.children[0] as HTMLElement;
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
      gsap.to(element, { x: 0, y: 0, ease: "power2.out", duration: 0.3 });
    };
  }, []);

  // 5. Hook de Efecto (Vimeo Player) - sin cambios
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

  // 6. Hook de Efecto (Magnético) - restaurado
  useEffect(() => {
    let cleanupUnmute: (() => void) | undefined;
    let cleanupPlayPause: (() => void) | undefined;
    
    if (isActivated) {
      cleanupPlayPause = applyMagneticEffect(playPauseButtonContainerRef.current);
    } else {
      cleanupUnmute = applyMagneticEffect(unmuteButtonContainerRef.current);
    }
    
    return () => {
      cleanupUnmute?.();
      cleanupPlayPause?.();
    };
  }, [isActivated, applyMagneticEffect]);

  // 7. Handlers - sin cambios
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
                 rounded-t-[5rem] -mt-20"
    >
      <Container>
        {/* Título */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            ¡Transforma tu marca con nosotros!
          </h2>
        </div>
        
        {/* Contenedor Principal del Video */}
        <div 
          ref={videoContainerRef}
          className="relative w-full aspect-video rounded-4xl overflow-hidden"
        >
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-black/30 cursor-pointer z-10
                        transition-opacity duration-500 ease-in-out
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handleUnmute}
          />

          {/* Botón de Sonido (con ref en el div) */}
          <div 
            ref={unmuteButtonContainerRef}
            className={`absolute inset-0 flex items-center justify-center z-20
                        transition-opacity duration-500
                        ${isActivated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <button
              onClick={handleUnmute}
              aria-label="Activar sonido"
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center
                         backdrop-blur-sm no-cursor-pointer"
            >
              <Volume2 size={32} />
            </button>
          </div>

          {/* Botón de Play/Pausa (con ref en el div) */}
          <div 
            ref={playPauseButtonContainerRef}
            className={`absolute top-6 right-6 z-20
                        transition-opacity duration-500 delay-200
                        ${isActivated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center
                     backdrop-blur-sm no-cursor-pointer"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

        </div> {/* Fin del contenedor Principal del Video */}
      </Container>
    </section>
  );
};