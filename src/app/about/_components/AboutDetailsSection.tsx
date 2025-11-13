// EN: src/app/about/_components/AboutDetailsSection.tsx
'use client';

import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export const AboutDetailsSection = () => {
  return (
    // Sección de fondo blanco con padding estándar
    <section className="relative z-30 bg-white pt-16 pb-36 lg:pt-32 lg:pb-52">
      <Container>
        
        {/* 1. Título Principal (H2) */}
        <AnimateOnScroll className="mb-24 max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            <span className="italic">Nos atrevemos<br/>a hacer</span>
            <br/>lo que otros<br/>no hacen
          </h2>
        </AnimateOnScroll>

        {/* 2. Layout de dos columnas (1/3 + 2/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Columna Izquierda (Título secundario) */}
          <AnimateOnScroll delay={0.1}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wider text-black">
              En pocas palabras, nos encanta lo que hacemos
            </h3>
          </AnimateOnScroll>

          {/* Columna Derecha (Contenido principal) */}
          <div className="lg:col-span-2">
            
            {/* Bloque de Texto */}
            <AnimateOnScroll delay={0.2}>
              <div className="text-base sm:text-lg md:text-xl text-black/90 leading-snug space-y-6 mb-16">
                <p>
                  Somos increíbles creando ecosistemas digitales y marcas únicas. Andevo 
                  es un equipo unido de expertos listo para resolver los desafíos 
                  más complejos del desarrollo web, aplicaciones móviles, branding 
                  estratégico y campañas de marketing exitosas. Nos apasiona 
                  profundamente lo que hacemos y apostamos por el éxito de cada 
                  proyecto que emprendemos.
                </p>
                <p>
                  ¿Lo típico? No es lo nuestro. Porque esto va más allá de un 
                  trabajo, es nuestra pasión. No vemos clientes, vemos personas. 
                  Cada proyecto que tomamos es valioso, y cada persona que 
                  confía en nosotros cuenta de verdad. Nos hacemos cargo de tus 
                  objetivos, tus tiempos y tu tranquilidad, sin excusas, y esa 
                  es nuestra garantía.
                </p>
              </div>
            </AnimateOnScroll>
            
            {/* Bloque de Estadísticas (animado después del texto) */}
            <AnimateOnScroll delay={0.3}>
              <div className="grid grid-cols-3 gap-8 text-center">
                
                {/* Stat 1 */}
                <div>
                  <span className="block text-5xl md:text-7xl font-medium">10+</span>
                  <span className="block text-base sm:text-lg md:text-xl text-black/70 mt-2">
                    Creativos y Analistas
                  </span>
                </div>
                
                {/* Stat 2 */}
                <div>
                  <span className="block text-5xl md:text-7xl font-medium">60+</span>
                  <span className="block text-base sm:text-lg md:text-xl text-black/70 mt-2">
                    Proyectos<br/>Completados
                  </span>
                </div>
                
                {/* Stat 3 */}
                <div>
                  <span className="block text-5xl md:text-7xl font-medium">8+</span>
                  <span className="block text-base sm:text-lg md:text-xl text-black/70 mt-2">
                    Años de Experiencia
                  </span>
                </div>

              </div>
            </AnimateOnScroll>
          </div>
          
        </div>
      </Container>
    </section>
  );
};