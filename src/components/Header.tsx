'use client'; // <-- Necesario porque usa hooks (useState, useEffect)

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';


/**
 * REEMPLAZO FINAL (Corregido para Tailwind v4 - usando valores arbitrarios)
 * * Reemplazamos 'ease-quint' por 'ease-[cubic-bezier(0.19,1,0.22,1)]'
 * Reemplazamos 'skew-y-7' por 'skew-y-[7deg]'
 */
const AnimatedLink = ({ href, text, className = "", ...rest }: { href: string; text: string; className?: string; [key: string]: any }) => {
  
  const isInternal = href.startsWith('/');
  const isExternal = href.startsWith('http');

  const linkClasses = `relative inline-block overflow-hidden group ${className}`;

  const content = (
    <>
      {/* Texto superior (visible) */}
      <span 
        className={`block transition duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)] py-2
                    group-hover:-translate-y-[105%] group-hover:skew-y-[7deg]`}
      >
        {text}
      </span>
      {/* Texto inferior (oculto) */}
      <span 
        className={`absolute top-[105%] left-0 block skew-y-[7deg] 
                  transition duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)] py-2
                    group-hover:-translate-y-[105%] group-hover:skew-y-0`}
      >
        {text}
      </span>
    </>
  );
  
  if (isInternal) {
    return (
      <Link href={href} className={linkClasses} {...rest}>
        {content}
      </Link>
    );
  }
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <a href={href} className={linkClasses}>
      {content}
    </a>
  );
};

/**
 * Componente de enlace para las direcciones (Corregido para Tailwind v4)
 */
const AddressLink = ({ href, flagSrc, flagAlt, text }: { href: string; flagSrc: string; flagAlt: string; text: string }) => (
  <a href={href} className="flex items-center space-x-3 group">
    <img src={flagSrc} alt={flagAlt} className="w-6 shrink-0" />
    <span className="text-sm relative">
      {text}
      {/* Línea de fondo estática */}
      <span className="absolute bottom-0 left-0 block h-px w-full bg-gray-300"></span>
      {/* Línea animada (on hover) - se quitó 'transform' y se cambió 'transition-transform' */}
      <span className="absolute bottom-0 left-0 block h-px w-full bg-black 
                       scale-x-0 transition duration-400 ease-in-out 
                       origin-center group-hover:scale-x-100">
      </span>
    </span>
  </a>
);

/**
 * Componente principal de la barra de navegación de Andevo.
 */
export default function Header() {
  // Estado para controlar si el menú móvil está abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hook de efecto para bloquear el scroll del body cuando el menú está abierto.
  useEffect(() => {
    if (isMenuOpen) {
      // Agrega la clase al body para ocultar el scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Remueve la clase para restaurar el scroll
      document.body.style.overflow = 'unset';
    }

    // Función de limpieza: se asegura de restaurar el scroll si el componente se desmonta.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]); // Este efecto se ejecuta cada vez que 'isMenuOpen' cambia.

  // --- 3. AÑADE ESTE NUEVO HOOK PARA LA ANIMACIÓN GLOBAL DE SCROLL ---
    useEffect(() => {
      // Registra el plugin de ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // Selecciona TODAS las imágenes que queremos que roten
      const rotatingImages = gsap.utils.toArray('.rotating-image');
      
      if (rotatingImages.length > 0) {
        // 1. Crea una línea de tiempo (timeline) base que rota 360 grados en 15s, infinitamente
        const rotationTimeline = gsap.timeline({ repeat: -1 });
        rotationTimeline.to(rotatingImages, {
          rotation: 360,
          duration: 15,
          ease: 'none',
        });

        // 2. Crea el ScrollTrigger que escucha el scroll de la página
        let scrollTimeout: NodeJS.Timeout;
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          // 'onUpdate' se dispara cada vez que el usuario hace scroll
          onUpdate: (self) => {
            // 1. Obtiene la dirección (1 = abajo, -1 = arriba)
            const direction = self.direction;

            // 2. Obtiene la velocidad (siempre positiva) y la normaliza
            const velocity = Math.abs(self.getVelocity() / 2000);

            // 3. Calcula el nuevo timeScale: (1 + velocidad) * dirección
            // Scroll abajo: (1 + 0.5) * 1 = 1.5 (sentido horario, rápido)
            // Scroll arriba: (1 + 0.5) * -1 = -1.5 (sentido antihorario, rápido)
            const newTimeScale = direction * (1 + velocity);

            gsap.to(rotationTimeline, {
              timeScale: newTimeScale,
              duration: 0.3,
              ease: 'power1.out',
              overwrite: true, // Evita animaciones conflictivas
            });

            // 4. Resetea la velocidad a la dirección base (1 o -1) cuando el scroll se detiene
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              gsap.to(rotationTimeline, {
                timeScale: direction, // Vuelve a velocidad 1 (o -1)
                duration: 1.5,
                ease: 'power2.out',
                overwrite: true,
              });
            }, 150);
          },
        });

        // Función de limpieza: se ejecuta si el componente se desmonta
        return () => {
          rotationTimeline.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
          clearTimeout(scrollTimeout);
        };
      }
    }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ
    // --- FIN DEL NUEVO HOOK ---

  // URLs de los assets (logos, banderas) tomadas del código original.
  const logoUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/68f3e09aa04559817c8e3342_New%20logo%20andevo.svg";
  const flagUsaUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b85148c0623345fc0cc6_Estados%20Unidos%20Bandera.svg";
  const flagPeruUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b851cb4badab8c1b185f_Per%C3%BA%20Bandera.svg";

  return (
    // 'relative' en el header y 'fixed' en los elementos internos
    // da más control sobre las capas 'z-index'.
    <header className="relative z-50 w-full text-black">
      
      {/* 1. La barra de navegación principal (Logo y Botón) */}
      <div className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 flex items-center justify-between py-4 px-4 md:px-8",
        isMenuOpen ? "bg-transparent" : "bg-white"
      )}>
        {/* Ya no hay un <Container> aquí */}
          
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="home" 
            className={clsx(
              "z-50 transition-opacity duration-500",
              isMenuOpen ? "opacity-0" : "opacity-100"
            )}
          >
            <img src={logoUrl} loading="lazy" alt="Andevo Logo" className="h-8 md:h-10 w-auto" />
          </Link>
          
          {/* Botón de Menú (Hamburguesa) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="z-50 flex items-center space-x-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-sm font-medium uppercase hidden md:block">Menu</span>
            <div className="flex flex-col space-y-1.5 justify-center w-6 h-6 menu-icon-trigger">
              <span className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out
                              ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}>
              </span>
              <span className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out
                              ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}>
              </span>
            </div>
          </button>

        {/* El </Container> de aquí se ha eliminado */}
      </div>

      {/* 2. El Panel del Menú (Overlay) */}
      <nav 
        className={`fixed top-0 right-0 bottom-0 w-full md:w-1/2 lg:w-[40%] h-screen bg-white z-40 
                  transition duration-700 ease-in-out
                  ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Usamos un layout de flex-col para separar el contenido principal de las direcciones */}
        {/* --- Logo interno del Menú --- */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white">
          <Container className="flex items-center justify-between py-4">
            <Link href="/" aria-label="home" className="z-50"> 
              <img 
                src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e6e497ca956bf81e2297aa_Logo%20Andevo%20Black.svg" 
                loading="lazy" 
                alt="Andevo Logo" 
                className="h-8 md:h-10 w-auto" 
              />
            </Link>
          </Container>
        </div>

        {/* --- Contenido principal del Menú --- */}
        <div className="relative z-0 h-full flex flex-col justify-start gap-16 md:gap-24 overflow-y-auto px-8 py-32 md:px-16 md:py-40">
          
          {/* Contenido Superior: Menú y Redes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Columna de Redes Sociales */}
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wider">Redes Sociales</span>
              {/* MODIFICACIÓN AQUÍ:
                - Cambiamos <ul> por <li>
                - Cambiamos <MenuLink> por <AnimatedLink>
                - Añadimos la clase de tamaño de texto
              */}
              <ul className="mt-4 space-y-1">
                <li>
                  <AnimatedLink href="https://www.tiktok.com/@teamandevo" text="TikTok" className="text-base sm:text-lg md:text-xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.instagram.com/teamandevo/" text="Instagram" className="text-base sm:text-lg md:text-xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.facebook.com/teamandevo/" text="Facebook" className="text-base sm:text-lg md:text-xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.youtube.com/@teamandevo" text="YouTube" className="text-base sm:text-lg md:text-xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.linkedin.com/company/andevo" text="LinkedIn" className="text-base sm:text-lg md:text-xl font-medium" />
                </li>
              </ul>
            </div>
            
            {/* Columna de Menú Principal */}
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wider">Menu</span>
              {/* MODIFICACIÓN AQUÍ:
                - Cambiamos <ul> por <li>
                - Cambiamos <MenuLink> por <AnimatedLink>
                - Añadimos la clase de tamaño de texto
              */}
              <ul className="mt-4 space-y-1">
                <li>
                  <AnimatedLink href="/" text="Home" className="text-xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large"/>
                </li>
                <li>
                  <AnimatedLink href="/nosotros" text="Nosotros" className="text-xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large"/>
                </li>
                <li>
                  <AnimatedLink href="/servicios" text="Servicios" className="text-xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large"/>
                </li>
                <li>
                  <AnimatedLink href="/blog" text="Blog" className="text-xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large"/>
                </li>
                <li>
                  <AnimatedLink href="/contacto" text="Contacto" className="text-xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large"/>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contenido Inferior: Ubicaciones */}
          <div className="mt-16">
            <span className="text-xs uppercase text-gray-500 tracking-wider">Ubícanos</span>
            <div className="mt-4 space-y-4 max-w-sm">
              <AddressLink 
                href="#" 
                flagSrc={flagUsaUrl} 
                flagAlt="USA Flag" 
                text="5212 Avalon Gates, Trumbull, CT 06611, EE. UU." 
              />
              <AddressLink 
                href="#" 
                flagSrc={flagPeruUrl} 
                flagAlt="Perú Flag" 
                text="Av. Micaela Bastidas 829, Cusco 08002, Perú"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* 3. El Fondo (Backdrop) */}
      <div 
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-700
                  ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>
    </header>
  );
}