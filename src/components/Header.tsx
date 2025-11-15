'use client'; // <-- Necesario porque usa hooks (useState, useEffect)

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { gsap } from 'gsap';
import clsx from 'clsx';
import Image from 'next/image';


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
  <a href={href} className="flex items-center space-x-3 group no-cursor-pointer">
    <Image 
      src={flagSrc} 
      alt={flagAlt} 
      width={24}
      height={16}
      className="w-6 shrink-0" 
    />
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

  const contentGridRef = useRef(null);
  const locationsRef = useRef(null);

  // Hook de efecto para bloquear el scroll del body cuando el menú está abierto.
  useEffect(() => {
    const elements = [contentGridRef.current, locationsRef.current];

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // --- AÑADE ESTE BLOQUE GSAP ---
      // 1. Estado inicial (oculto abajo)
      gsap.set(elements, { y: "100%" }); 
      // 2. Animación de entrada
      gsap.to(elements, {
        y: "0%",
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1, // Anima uno después del otro
        delay: 0.4, // Espera 0.4s a que el panel se abra
      });
      // --- FIN DE AÑADIR ---

    } else {
      document.body.style.overflow = 'unset';

      // --- AÑADE ESTE BLOQUE GSAP ---
      // 1. Resetea la posición cuando se cierra
      gsap.set(elements, { y: "100%" });
      // --- FIN DE AÑADIR ---
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]); // El 'dependency array' [isMenuOpen] es correcto

  // URLs de los assets (logos, banderas) tomadas del código original.
  const logoUrl = "/andevo.svg";
  const flagUsaUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b85148c0623345fc0cc6_Estados%20Unidos%20Bandera.svg";
  const flagPeruUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b851cb4badab8c1b185f_Per%C3%BA%20Bandera.svg";

  return (
    // 'relative' en el header y 'fixed' en los elementos internos
    // da más control sobre las capas 'z-index'.
    <header className="w-full text-black">
      
      {/* 1. La barra de navegación principal (Logo y Botón) */}
      <div className={clsx(
        "fixed top-0 left-0 right-0 z-85 transition-colors duration-500 flex items-center justify-between py-4 px-4 md:px-8",
        "global-header-bar",
        "isolation-isolate",
        isMenuOpen ? "bg-transparent" : "bg-white",
        // --- ¡LA SOLUCIÓN! ---
        // Si el menú está abierto, la barra (y el botón) sube a z-[110]
        // Si está cerrado, vuelve a z-85
        isMenuOpen ? "z-[110]" : "z-85"
      )}>
        {/* Ya no hay un <Container> aquí */}
          
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="home" 
            className={clsx(
              "z-50 transition-opacity duration-500",
              isMenuOpen ? "opacity-0" : "opacity-100",
              "no-cursor-pointer"
            )}
          >
            <Image 
              src={logoUrl} 
              alt="Andevo Logo" 
              width={180}
              height={40}
              className="h-[26px] w-auto" 
              priority={true} 
            />
          </Link>
          
          {/* Botón de Menú (Hamburguesa) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={clsx(
              "z-50 flex items-center space-x-2", // Mantiene el layout
              isMenuOpen && "is-active" // Clase 'is-active' para disparar el CSS
            )}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* El texto "Menu" sigue igual (oculto en móvil) */}
            <span className="text-sm font-medium uppercase hidden md:block">Menu</span>
            
            {/* Esta es la nueva estructura del icono (reemplaza el 'div' anterior) */}
            <div className="cuberto-menu-icon menu-icon-trigger">
              <span className="cuberto-menu-line-1"></span>
              <span className="cuberto-menu-line-2"></span>
            </div>
          </button>

        {/* El </Container> de aquí se ha eliminado */}
      </div>

      {/* 2. El Panel del Menú (Overlay) */}
      <nav 
        className={clsx(
          "fixed top-0 right-0 bottom-0 h-screen bg-white z-[100]",
          "transition duration-700 ease-in-out",
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          
          // --- CAMBIO 1: Ancho Responsivo ---
          // w-full en móvil/tablet, w-[500px] en desktop
          "w-full lg:w-[600px]" 
        )}
      >
        {/* Usamos un layout de flex-col para separar el contenido principal de las direcciones */}
        {/* --- Logo interno del Menú --- */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white">
          <Container className="flex items-center justify-between py-4">
            <Link href="/" aria-label="home" className="z-50"> 
              <Image 
                src={logoUrl} 
                alt="Andevo Logo" 
                width={180}
                height={40}
                className="h-[26px] w-auto" 
                priority={true} 
              />
            </Link>
          </Container>
        </div>

        {/* --- Contenido principal del Menú --- */}
        <div className="relative z-0 h-full flex flex-col justify-start gap-16 md:gap-24 overflow-y-auto px-8 py-32 md:px-16 md:py-40">
          
          {/* --- AÑADE LA MÁSCARA (overflow-hidden) AQUÍ --- */}
          <div className="overflow-hidden">
            {/* Aplica el 'ref' al grid */}
            <div 
              ref={contentGridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
            
            {/* Columna de Redes Sociales */}
            <div 
              // --- CAMBIO 3: Visibilidad Responsiva ---
              // Oculto por defecto, visible solo en 'lg'
              className="hidden md:block"
            >
              <span className="text-xs uppercase text-gray-500 tracking-wider">Redes Sociales</span>
              {/* MODIFICACIÓN AQUÍ:
                - Cambiamos <ul> por <li>
                - Cambiamos <MenuLink> por <AnimatedLink>
                - Añadimos la clase de tamaño de texto
              */}
              <ul className="mt-4 space-y-1">
                <li>
                  <AnimatedLink href="https://www.tiktok.com/@teamandevo" text="TikTok" className="text-base sm:text-lg md:text-xl font-medium" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="https://www.instagram.com/teamandevo/" text="Instagram" className="text-base sm:text-lg md:text-xl font-medium" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="https://www.facebook.com/teamandevo/" text="Facebook" className="text-base sm:text-lg md:text-xl font-medium" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="https://www.youtube.com/@teamandevo" text="YouTube" className="text-base sm:text-lg md:text-xl font-medium" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="https://www.linkedin.com/company/andevo" text="LinkedIn" className="text-base sm:text-lg md:text-xl font-medium" onClick={() => setIsMenuOpen(false)} />
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
                  <AnimatedLink href="/" text="Home" className="text-2xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="/about" text="Nosotros" className="text-2xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="#" text="Servicios" className="text-2xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="/blog" text="Blog" className="text-2xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large" onClick={() => setIsMenuOpen(false)} />
                </li>
                <li>
                  <AnimatedLink href="/contact" text="Contacto" className="text-2xl sm:text-2xl md:text-3xl font-medium" data-cursor="-pointer-large" onClick={() => setIsMenuOpen(false)} />
                </li>
              </ul>
            </div>
          </div>

          
          {/* Contenido Inferior: Ubicaciones */}
          <div className="overflow-hidden">
            {/* Aplica el 'ref' al bloque de Ubícanos */}
            <div ref={locationsRef} className="mt-16">
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
        </div>
      </div>
      </nav>

      {/* 3. El Fondo (Backdrop) */}
      <div 
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-95 transition-opacity duration-700
                  ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>
    </header>
  );
}