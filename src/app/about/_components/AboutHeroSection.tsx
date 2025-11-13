// EN: src/components/AboutHeroSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ChevronRight } from 'lucide-react';

export const AboutHeroSection = () => {
  const heroImageUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/6869d974ebcc49cbcf1ca919_Andevo.webp";

  return (
    // Replicamos la estructura de padding de otras páginas (ej. Contacto)
    <section className="bg-white text-black pt-48 pb-44 lg:pt-60 lg:pb-52">
      <Container>
        
        {/* Usamos StaggeredEntryAnimation para la animación de entrada */}
        <StaggeredEntryAnimation delay={0.1}>
          
          {/* 1. Breadcrumbs (Miga de pan) */}
          <div className="mb-16 flex items-center text-base text-black/70">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-black">Nosotros</span>
          </div>

          {/* 2. Bloque de Texto del Hero */}
          <div className="max-w-4xl mb-24">
            {/* Subtítulo (del heading-style-h4) */}
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              Sobre Nosotros ✌️
            </p>
            
            {/* Título Principal (H1) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium">
              <span className="italic">Rompe las reglas</span>, 
              piensa en grande, haz las cosas bien.
            </h1>
          </div>

        </StaggeredEntryAnimation>

        {/* 3. Bloque de Imagen Principal */}
        {/* Usamos AnimateOnScroll para el efecto de revelado */}
        <AnimateOnScroll delay={0.3}>
          <div className="relative w-full aspect-video rounded-4xl overflow-hidden">
            {/* Overlay (del .image-overlay) */}
            <div className="absolute inset-0 bg-black/5 z-10" />
            
            <Image
              src={heroImageUrl}
              alt="Equipo de Andevo"
              fill
              priority // Marcar como prioridad (LCP)
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
              className="object-cover"
              // Nota: El HTML original usa 'scale(1.3)' para un parallax.
              // Lo hemos omitido por ahora en favor de AnimateOnScroll.
              // Podemos añadir el parallax de GSAP después.
            />
          </div>
        </AnimateOnScroll>

      </Container>
    </section>
  );
};