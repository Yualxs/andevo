// EN: src/components/BenefitsSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { AnimateOnScroll } from './AnimateOnScroll';
import clsx from 'clsx';

// --- Data para la sección ---
const iconUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg";
const imageUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/6869d974ebcc49cbcf1ca919_Andevo.webp";

const benefitsData = [
  {
    title: "Compromiso con la Excelencia en cada Proyecto",
    description: "Cada proyecto refleja nuestra dedicación absoluta: estrategias claras, ejecución impecable y resultados reales."
  },
  {
    title: "¿Imposible? ¡Lo hacemos realidad!",
    description: "En Andevo, \"imposible\" no forma parte de nuestro lenguaje. Llevamos cada idea desde la estrategia inicial hasta la ejecución exacta, sin atajos ni simplificaciones, solo soluciones reales."
  },
  {
    title: "Soluciones integrales bajo un mismo techo",
    description: "Desde estrategias digitales completas hasta producción de contenido, desarrollo web, automatizaciones y branding: lo que tu negocio necesita, Andevo lo hace realidad."
  }
];

// --- Sub-componente para cada item de la lista ---
interface BenefitItemProps {
  title: string;
  description: string;
  delay: number;
}
const BenefitItem = ({ title, description, delay }: BenefitItemProps) => (
  <AnimateOnScroll 
    // Replicamos el layout de 3 columnas del HTML
    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
    delay={delay}
  >
    {/* Col 1: Icono */}
    <div className="w-16">
      <Image
        src={iconUrl}
        alt="Símbolo Andevo"
        width={64}
        height={64}
        className="rotating-image" // <-- Clase para la animación global
      />
    </div>
    {/* Col 2: Título */}
    <h3 className="text-base font-medium uppercase tracking-wider text-black">
      {title}
    </h3>
    {/* Col 3: Descripción */}
    <p className="text-lg text-black/70">
      {description}
    </p>
  </AnimateOnScroll>
);


// --- Componente Principal Reutilizable ---
interface BenefitsSectionProps {
  zIndex: string;
  showImage?: boolean;
}

export const BenefitsSection = ({ zIndex, showImage = true }: BenefitsSectionProps) => {
  return (
    // Sección con fondo blanco, "scoop" (boleado) y z-index dinámico
    <section 
      className={clsx(
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black",
        "rounded-t-[5rem] -mt-20", // <-- El "boleado"
        zIndex
      )}
    >
      <Container>
        {/* 1. Título Principal */}
        <AnimateOnScroll className="mb-24 max-w-5xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium">
            <span className="italic">Beneficios</span> de<br/>trabajar con Andevo
          </h2>
        </AnimateOnScroll>

        {/* 2. Lista de Beneficios */}
        <div className="space-y-16 mb-24">
          {benefitsData.map((item, index) => (
            <BenefitItem
              key={index}
              title={item.title}
              description={item.description}
              delay={0.1 * (index + 1)} // Staggered delay
            />
          ))}
        </div>

        {/* 3. Imagen Inferior (Opcional) */}
        {showImage && (
          <AnimateOnScroll delay={0.4}>
            <div className="relative w-full aspect-video rounded-4xl overflow-hidden">
              <div className="absolute inset-0 bg-black/5 z-10" />
              <Image
                src={imageUrl}
                alt="Equipo de Andevo"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                className="object-cover"
              />
            </div>
          </AnimateOnScroll>
        )}
      </Container>
    </section>
  );
};