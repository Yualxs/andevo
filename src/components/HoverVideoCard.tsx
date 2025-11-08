// EN: src/components/HoverVideoCard.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

interface HoverVideoCardProps {
  href: string;
  title: string;
  subtitle: string;
  posterUrl: string;
  videoUrl: string;
  textColor?: string;
}

export const HoverVideoCard = ({ 
  href, 
  title, 
  subtitle, 
  posterUrl, 
  videoUrl, 
  textColor = 'text-black' // <-- 2. AÑADE ESTA LÍNEA (con el valor por defecto)
}: HoverVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = () => {
    videoRef.current?.play().catch(e => console.error("Error playing video:", e));
  };
  const handleMouseOut = () => {
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link 
      href={href} 
      className="block group" 
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseOut}
      aria-label={`Ver servicio: ${title}`}
    >
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover 
                     transition-transform duration-500 ease-in-out
                     group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 w-full h-full bg-black/10 
                     transition-opacity duration-300 group-hover:opacity-0"
        />
      </div>
      
      <div className="mt-4">
        <h3 className={`text-lg md:text-xl font-light ${textColor}`}> {/* <-- CAMBIO DE TAMAÑO */}
          <span className="font-medium">{title}</span> - <span className="italic">{subtitle}</span>
        </h3>
      </div>
    </Link>
  );
};