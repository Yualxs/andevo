// EN: src/components/FloatingContactButton.tsx
'use client'; // <-- 1. Convertir a Componente de Cliente

import { useEffect, useRef } from 'react'; // <-- 2. Importar hooks
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap'; // <-- 3. Importar GSAP

// URLs de los assets
const svgUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e9cb93fb3dead64a38cf07_Contacto%20Video.svg";
const videoUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb03964b635d0445072369_Video%20Contact%20Andevo-transcode.mp4";

export const FloatingContactButton = () => {
  // 4. Ref para el botón
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // 5. Hook de Efecto para la animación de entrada
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 1, // Ir a opacidad 1
        scale: 1,   // Ir a escala 1
        duration: 1, // Duración de 1 segundo
        delay: 2.5,   // <-- Aparecer después de 2.5 segundos
        ease: 'power2.out',
      });
    }
  }, []); // El [] asegura que solo se ejecute una vez

  return (
    <Link 
      href="/contacto" 
      ref={buttonRef} // <-- 6. Asignar el ref
      className="fixed bottom-8 right-8 z-90 w-36 h-36 rounded-full overflow-hidden group hidden md:block
                 opacity-0 scale-90" // <-- 7. Estado inicial (oculto)
      aria-label="Ir a contacto"
    >
      {/* SVG Giratorio (fondo) */}
      <Image 
        src={svgUrl} 
        alt="Contacto" 
        fill
        className="rotating-image"
      />
      {/* Video (centro) */}
      <div className="absolute inset-[12%] w-[76%] h-[76%] rounded-full overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-125"
          loading="lazy" // <-- 8. Mantenemos el lazy load (por si acaso)
        />
      </div>
    </Link>
  );
};