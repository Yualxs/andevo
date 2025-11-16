// EN: src/components/BenefitsSection.tsx
'use client';

import React from 'react'; // <-- Ya no se necesitan hooks aquí
import Image from 'next/image';
import { Container } from './Container';
import { AnimateOnScroll } from './AnimateOnScroll';
import clsx from 'clsx';
// 1. Importamos nuestro nuevo componente de LÍNEA ELÁSTICA
import { ElasticDivider } from './ElasticDivider'; 

// --- Data (sin cambios) ---
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

// --- 2. Sub-componente "Tonto" (sin hooks) ---
interface BenefitItemProps {
  title: string;
  description: string;
}
const BenefitItem = ({ title, description }: BenefitItemProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-12 lg:py-16">
    {/* Col 1: Icono */}
    <div className="w-16">
      <Image
        src={iconUrl}
        alt="Símbolo Andevo"
        width={64}
        height={64}
        className="rotating-image"
      />
    </div>
    {/* Col 2: Título (Corregido) */}
    <h3 className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wider text-black">
      {title}
    </h3>
    {/* Col 3: Descripción (Corregido) */}
    <p className="text-lg sm:text-lg md:text-xl text-black">
      {description}
    </p>
  </div>
);


// --- Componente Principal ---
interface BenefitsSectionProps {
  zIndex: string;
  showImage?: boolean;
}

export const BenefitsSection = ({ zIndex, showImage = true }: BenefitsSectionProps) => {
  return (
    <section 
      className={clsx(
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black",
        "rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20",
        zIndex
      )}
    >
      <Container>
        {/* Título Principal */}
        <AnimateOnScroll className="mb-24 max-w-5xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold">
            <span className="italic">Beneficios</span> de<br/>trabajar con Andevo
          </h2>
        </AnimateOnScroll>

        {/* 3. Lista de Beneficios (MODIFICADA) */}
        <div className="mb-24">
          {benefitsData.map((item, index) => (
            <React.Fragment key={index}>
              {/* Renderizamos nuestra nueva línea elástica */}
              <ElasticDivider />
              
              {/* Envolvemos el BenefitItem en el AnimateOnScroll */}
              <AnimateOnScroll delay={0.1 * (index + 1)}>
                <BenefitItem
                  title={item.title}
                  description={item.description}
                />
              </AnimateOnScroll>
            </React.Fragment>
          ))}
        </div>

        {/* 4. Imagen Inferior (CORREGIDA) */}
        {showImage && (
          <AnimateOnScroll delay={0.4}>
            {/* Este 'div' es el 'children' que faltaba */}
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