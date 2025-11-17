// EN: src/app/services/_components/ServiceHeroBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CtaBlock } from '@/components/CtaBlock';

export const ServiceHeroBlock = ({ block }: { block: any }) => {
  return (
    <header className="bg-white text-black pt-48 pb-36 lg:pt-60 lg:pb-44">
      <Container>
        <StaggeredEntryAnimation delay={0.1}>
          {/* Breadcrumbs (Asumimos que siempre es Home > Servicios > Título) */}
          <div className="mb-16 flex items-center text-base text-black/70">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <Link href="/services" className="hover:text-black">Servicios</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-black">{block.title || 'Detalle'}</span>
          </div>

          {/* Títulos */}
          <div className="max-w-4xl mb-24">
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              {block.preTitle}
            </p>
            {/* Usamos dangerouslySetInnerHTML para renderizar las <span> de itálicas */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-medium"
              dangerouslySetInnerHTML={{ __html: block.title }}
            />
            <h2 className="text-xl md:text-2xl lg:text-3xl text-black/80 mt-6">
              {block.subtitle}
            </h2>
          </div>

          {/* CTA del Hero */}
          <CtaBlock
            line1={<h3 className="text-2xl font-semibold mb-2">¿Tienes una idea en mente?</h3>}
            line2={<p>Cuéntanos 😉, nosotros la creamos.</p>}
            buttonText={block.ctaText || "Agendar reunión 👇"}
          />

        </StaggeredEntryAnimation>
      </Container>
    </header>
  );
};