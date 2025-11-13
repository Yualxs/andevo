// EN: src/app/about/_components/AboutValuesSection.tsx
'use client';

import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export const AboutValuesSection = () => {
  return (
    // Esta sección tiene fondo blanco, así que solo necesita padding
    // y un z-index para apilarse correctamente sobre el "scoop" del Hero.
    <section className="relative z-10 bg-white pt-16 pb-36 lg:pt-32 lg:pb-52">
      <Container>
        {/* El HTML usa un layout de 2 columnas. Lo replicamos con un grid.
          Usamos un grid de 3 columnas en desktop para que el texto
          ocupe 2/3, lo cual coincide con el diseño de Webflow.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Columna 1: Título (Nuestro objetivo) */}
          <AnimateOnScroll delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase tracking-wider text-black">
              Nuestro objetivo
            </h2>
          </AnimateOnScroll>
          
          {/* Columna 2: Párrafo de Descripción */}
          <AnimateOnScroll className="lg:col-span-2" delay={0.2}>
            {/* Este texto es más grande que un párrafo estándar.
              Usamos text-2xl/3xl para darle la importancia que tiene en el diseño.
            */}
            <p className="text-base sm:text-lg md:text-xl text-black/90 leading-snug">
              Desde nuestra fundación en Andevo, hemos acompañado a nuestros clientes 
              en la búsqueda de soluciones digitales, forjando marcas sólidas y 
              productos innovadores. A lo largo de los años, nuestra experiencia 
              se expande y nos permite crear proyectos que superan expectativas 
              y generan resultados excelentes.
            </p>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  );
};