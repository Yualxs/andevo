// EN: src/components/Footer.tsx
'use client'; // <-- Es un Componente de Cliente para las animaciones

import React, { useEffect, useRef } from 'react';
import { Container } from './Container';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react'; // Icono para los enlaces
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          className="text-4xl md:text-5xl lg:text-6xl font-medium"
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
  // Ref para la cinta (marquee)
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Obtiene el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  // Hook para la animación de la cinta (marquee)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueePanels = gsap.utils.toArray<HTMLElement>('.marquee-panel');
    
    if (marqueePanels.length > 0) {
      
      // 1. Crea la animación de la cinta (duration: 20 para ser más rápida)
      const marqueeTimeline = gsap.fromTo(marqueePanels, 
        { xPercent: 0 },
        { 
          xPercent: -100,
          duration: 20, // <-- Velocidad base
          ease: 'none',
          repeat: -1,
        }
      );

      // 2. Crea el ScrollTrigger (LÓGICA CORREGIDA)
      let scrollTimeout: NodeJS.Timeout;
      const st = ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const direction = self.direction;
          const velocity = Math.abs(self.getVelocity() / 700); // <-- Sensibilidad aumentada

          // 3. Calcula la nueva velocidad (Dirección * (1 + Velocidad))
          const newTimeScale = direction * (1 + velocity);

          // 4. Aplica la nueva velocidad
          gsap.to(marqueeTimeline, {
            timeScale: newTimeScale,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });

          // 5. Resetea la velocidad a 1 (o -1) cuando el scroll se detiene
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to(marqueeTimeline, {
              timeScale: direction, // Vuelve a la velocidad base (manteniendo la dirección)
              duration: 1.5,
              ease: 'power2.out',
              overwrite: true,
            });
          }, 150);
        },
      });

      // Función de limpieza
      return () => {
        st.kill();
        marqueeTimeline.kill();
        clearTimeout(scrollTimeout); // Limpia el timeout
      };
    }
  }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ

  return (
    // SECCIÓN: Fondo negro, "scoop", z-index 80 (el más alto)
    <footer 
      className="relative z-[80] bg-black text-white 
                 rounded-t-[3.2rem] -mt-[3.2rem] pt-24 md:pt-32"
    >
      
      {/* 1. Marquee "Síguenos" */}
      <div className="overflow-hidden mb-16">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {/* Replicamos el panel 4 veces para un bucle suave */}
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="marquee-panel flex-shrink-0 flex items-center pr-8"
              aria-hidden={i > 0} // Oculta los duplicados a los lectores de pantalla
            >
              <h2 className="text-7xl md:text-9xl font-light italic uppercase">Síguenos</h2>
              <img 
                src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg" 
                alt="" 
                className="w-20 h-20 md:w-28 md:h-28 mx-8 rotating-image" // Añadimos la clase para la rotación global
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Contenido Principal del Footer (Redes Sociales) */}
      <Container className="mb-16"> {/* Reducido el margen inferior */}
        <div className="mb-4">
          <span className="text-xs uppercase text-white/70 tracking-wider">Nuestras Redes Sociales</span>
      </div>
      </Container>

      {/* Lista de enlaces sociales (AHORA FUERA DEL CONTAINER) */}
      <div className="flex flex-col border-t border-white/20 mb-24">
        {/* Usamos el nuevo componente animado */}
        {socialLinks.map((link) => (
          <SocialLink 
            key={link.name} 
            href={link.href}
            name={link.name}
          />
        ))}
      </div>

      {/* 3. Bottom Footer (Copyright y Logo) */}
      <Container className="pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Home">
              <img 
                src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg" 
                alt="Símbolo Andevo" 
                className="w-8 h-8 rotating-image" // Añadimos la clase para la rotación global
              />
            </Link>
            <Link href="/politicas-de-privacidad" className="text-sm text-white/70 hover:text-white">
              Política de Privacidad
            </Link>
          </div>
          <div className="text-sm text-white/70">
            © {currentYear} Andevo S.A.C. Todos los Derechos Reservados
          </div>
        </div>
        <div className="text-center text-sm text-white/70 mt-8">
          Desarrollado con ❤️ por <a href="https://andevo.io/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/90 hover:text-white">Andevo</a>
        </div>
      </Container>
    </footer>
  );
};