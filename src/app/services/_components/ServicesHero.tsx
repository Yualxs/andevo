// EN: src/app/services/_components/ServicesHero.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { AnimateOnScroll } from '@/components/AnimateOnScroll'; // <-- Importamos AnimateOnScroll
import { ChevronRight } from 'lucide-react';

export const ServicesHero = () => {
  const heroImageUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb013d769505704f880f9a_Example.webp";

  return (
    // 1. La sección principal (blanca)
    <section className="bg-white text-black pt-48 pb-44 lg:pt-60 lg:pb-52">
      
      <Container>

        <StaggeredEntryAnimation delay={0.1}>
          
          {/* Breadcrumbs */}
          <div className="mb-16 flex items-center text-base text-black/70">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-black">Servicios</span>
          </div>

          {/* Títulos */}
         <div className="max-w-4xl mb-24">
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              Nuestros Servicios 🥇️
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              <span className="italic">Nos encanta</span>
              <br/>
              lo que hacemos
            </h1>
          </div>

        </StaggeredEntryAnimation>


        {/* 3. Imagen (AHORA DENTRO DEL CONTAINER y CON BORDES) */}
        <AnimateOnScroll delay={0.3}>
          <div className="relative w-full aspect-video rounded-4xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <Image
              src={heroImageUrl}
              alt="Nuestros Servicios"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px" // Ajusta 'sizes' al container
              className="object-cover"
            />
          </div>
        </AnimateOnScroll>

      </Container>
    </section>
  );
};