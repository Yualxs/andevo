'use client'; // <-- Necesario porque usa hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './Container';

/**
 * REEMPLAZO FINAL (Corregido para Tailwind v4 - usando valores arbitrarios)
 * * Reemplazamos 'ease-quint' por 'ease-[cubic-bezier(0.19,1,0.22,1)]'
 * Reemplazamos 'skew-y-7' por 'skew-y-[7deg]'
 */
const AnimatedLink = ({ href, text, className = "" }: { href: string; text: string; className?: string }) => {
  
  const isInternal = href.startsWith('/');
  const isExternal = href.startsWith('http');

  const linkClasses = `relative inline-block overflow-hidden group ${className}`;

  const content = (
    <>
      {/* Texto superior (visible) */}
      <span 
        className={`block transition duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] py-2
                    group-hover:-translate-y-[105%] group-hover:skew-y-[7deg]`}
      >
        {text}
      </span>
      {/* Texto inferior (oculto) */}
      <span 
        className={`absolute top-[105%] left-0 block skew-y-[7deg] 
                    transition duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] py-2
                    group-hover:-translate-y-[105%] group-hover:skew-y-0`}
      >
        {text}
      </span>
    </>
  );
  
  if (isInternal) {
    return (
      <Link href={href} className={linkClasses}>
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
    <img src={flagSrc} alt={flagAlt} className="w-6 flex-shrink-0" />
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

  // URLs de los assets (logos, banderas) tomadas del código original.
  const logoUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/68f3e09aa04559817c8e3342_New%20logo%20andevo.svg";
  const flagUsaUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b85148c0623345fc0cc6_Estados%20Unidos%20Bandera.svg";
  const flagPeruUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e4b851cb4badab8c1b185f_Per%C3%BA%20Bandera.svg";

  return (
    // 'relative' en el header y 'fixed' en los elementos internos
    // da más control sobre las capas 'z-index'.
    <header className="relative z-50 w-full text-black">
      
      {/* 1. La barra de navegación principal (Logo y Botón) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        {/* REEMPLAZAMOS EL DIV POR EL CONTENEDOR */}
        <Container className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link href="/" aria-label="home" className="z-50"> 
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
            <div className="flex flex-col space-y-[6px] justify-center w-6 h-6">
              <span className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out
                              ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}>
              </span>
              <span className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out
                              ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}>
              </span>
            </div>
          </button>

        </Container>
      </div>

      {/* 2. El Panel del Menú (Overlay) */}
      <nav 
        className={`fixed top-0 right-0 bottom-0 w-full md:w-3/4 lg:w-[60%] h-screen bg-white z-40 
                  transition duration-700 ease-in-out
                  ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Usamos un layout de flex-col para separar el contenido principal de las direcciones */}
        <div className="h-full flex flex-col justify-between overflow-y-auto px-8 py-24 md:px-16 md:py-32">
          
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
                  <AnimatedLink href="https://www.tiktok.com/@teamandevo" text="TikTok" className="text-xl md:text-2xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.instagram.com/teamandevo/" text="Instagram" className="text-xl md:text-2xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.facebook.com/teamandevo/" text="Facebook" className="text-xl md:text-2xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.youtube.com/@teamandevo" text="YouTube" className="text-xl md:text-2xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="https://www.linkedin.com/company/andevo" text="LinkedIn" className="text-xl md:text-2xl font-medium" />
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
                  <AnimatedLink href="/" text="Home" className="text-4xl md:text-5xl lg:text-6xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="/nosotros" text="Nosotros" className="text-4xl md:text-5xl lg:text-6xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="/servicios" text="Servicios" className="text-4xl md:text-5xl lg:text-6xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="/blog" text="Blog" className="text-4xl md:text-5xl lg:text-6xl font-medium" />
                </li>
                <li>
                  <AnimatedLink href="/contacto" text="Contacto" className="text-4xl md:text-5xl lg:text-6xl font-medium" />
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
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-700
                   ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>
    </header>
  );
}