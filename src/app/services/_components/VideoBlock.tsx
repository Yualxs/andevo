// EN: src/app/services/_components/VideoBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import Player from '@vimeo/player';
import { useEffect, useRef } from 'react';

// Reutilizamos el componente VideoSection de la Home, pero simplificado
export const VideoBlock = ({ block }: { block: any }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (videoContainerRef.current && block.vimeoId) {
      const options = {
        id: block.vimeoId,
        responsive: true,
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
      };
      new Player(videoContainerRef.current, options);
    }
  }, [block.vimeoId]);

  return (
    <section 
      className="relative z-10 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white 
                 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20"
    >
      <Container>
        <AnimateOnScroll>
          <div 
            ref={videoContainerRef}
            className="w-full aspect-video rounded-3xl overflow-hidden"
          />
        </AnimateOnScroll>
      </Container>
    </section>
  );
};