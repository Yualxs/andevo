// EN: src/components/Footer.tsx
'use client'; // <-- Es un Componente de Cliente para las animaciones

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Container } from './Container';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react'; // Icono para los enlaces
import Image from 'next/image';
import { AnimateOnScroll } from './AnimateOnScroll';

// Data para los enlaces de redes sociales
const socialLinks = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@teamandevo' },
  { name: 'Instagram', href: 'https://www.instagram.com/teamandevo/' },
  { name: 'Facebook', href: 'https://www.facebook.com/teamandevo/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@teamandevo' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/andevo' },
];

// --- AÑADE ESTE NUEVO COMPONENTE ---
const SocialLink = ({ href, name }: { href: string; name: string }) => {
  // Refs para los elementos que vamos a animar
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  // Hook para añadir los listeners de GSAP
  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    const icon = iconRef.current;

    if (!link || !text || !icon) return;

    // Animación de HOVER (Entrada)
    const onMouseEnter = () => {
      gsap.to(link, { 
        backgroundColor: '#FFFFFF', // Fondo a blanco
        duration: 0.4, 
        ease: 'power2.out' 
      });
      gsap.to([text, icon], { 
        color: '#000000', // Texto y flecha a negro
        duration: 0.4, 
        ease: 'power2.out' 
      });
    };

    // Animación de HOVER (Salida)
    const onMouseLeave = () => {
      gsap.to(link, { 
        backgroundColor: '#000000', // Fondo a negro
        duration: 0.4, 
        ease: 'power2.out' 
      });
      gsap.to([text, icon], { 
        color: '#FFFFFF', // Texto y flecha a blanco
        duration: 0.4, 
        ease: 'power2.out' 
      });
    };

    // Añade los listeners
    link.addEventListener('mouseenter', onMouseEnter);
    link.addEventListener('mouseleave', onMouseLeave);

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      link.removeEventListener('mouseenter', onMouseEnter);
      link.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ

  return (
    <a 
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Quitamos TODAS las clases de hover y transition de Tailwind
      className="w-full border-b border-white/20"
      // GSAP necesita un estado inicial explícito
      style={{ backgroundColor: '#000000' }}
    >
      <Container className="flex justify-between items-center py-6">
        <span 
          ref={textRef}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold"
          style={{ color: '#FFFFFF' }} // Estado inicial
        >
          {name}
        </span>
        <ArrowUpRight 
          ref={iconRef}
          size={48} 
          style={{ color: '#FFFFFF' }} // Estado inicial (siempre visible)
        />
      </Container>
    </a>
  );
};
// --- FIN DEL NUEVO COMPONENTE ---


export const Footer = () => {
  
  // Obtiene el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    // SECCIÓN: Fondo negro, "scoop", z-index 80 (el más alto)
    <footer 
      className="relative z-80 bg-black text-white 
                 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20 pt-16 lg:pt-32"
    >
      
      {/* 1. Marquee "Síguenos" */}
      <AnimateOnScroll className="overflow-hidden mb-32">
        <div className="flex whitespace-nowrap global-marquee-wrapper">
          {/* Replicamos el panel 4 veces para un bucle suave */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="marquee-panel shrink-0 flex items-center pr-8"
              aria-hidden={i > 0} // Oculta los duplicados a los lectores de pantalla
            >
              <h2 className="text-4xl md:text-5xl font-light">Síguenos</h2>
              <Image
                src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg" 
                alt="" 
                width={112} // de md:w-28
                height={112} // de md:h-28
                className="w-20 h-20 md:w-28 md:h-28 mx-8 rotating-image"
              />
            </div>
          ))}
        </div>
      </AnimateOnScroll>

      {/* 2. Contenido Principal del Footer (Redes Sociales) */}
      <AnimateOnScroll delay={0.1}>
        <Container className="mb-16"> {/* Reducido el margen inferior */}
          <div className="mb-4">
            <span className="text-base sm:text-lg md:text-xl uppercase text-white/70 tracking-wider">Nuestras Redes Sociales</span>
        </div>
        </Container>
      </AnimateOnScroll>
      {/* Lista de enlaces sociales (AHORA FUERA DEL CONTAINER) */}
      <AnimateOnScroll 
        className="flex flex-col border-t border-white/20 mb-24"
        delay={0.2}
      >
        {/* Usamos el nuevo componente animado */}
        {socialLinks.map((link) => (
          <SocialLink 
            key={link.name} 
            href={link.href}
            name={link.name}
          />
        ))}
      </AnimateOnScroll>

      {/* 3. Bottom Footer (Copyright y Logo) */}
      <AnimateOnScroll delay={0.3}>
        <Container className="pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Home">
                <Image 
                  src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg" 
                  alt="Símbolo Andevo" 
                  width={32} // de w-8
                  height={32} // de h-8
                  className="w-8 h-8 rotating-image"
                />
              </Link>
              <Link href="/politicas-de-privacidad" className="text-base sm:text-lg md:text-xl text-white/70 hover:text-white">
                Política de Privacidad
              </Link>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-white/70">
              © {currentYear} Andevo S.A.C. Todos los Derechos Reservados
            </div>
          </div>
          <div className="text-center text-base sm:text-lg md:text-xl text-white/70 mt-8">
            Desarrollado con ❤️ por <a href="https://andevo.io/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/90 hover:text-white">Andevo</a>
          </div>
        </Container>
      </AnimateOnScroll>
    </footer>
  );
};