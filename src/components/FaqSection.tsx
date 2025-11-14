// EN: src/components/FaqSection.tsx
'use client'; // <-- ¡IMPORTANTE! Se convierte en Componente de Cliente

import { useState, useEffect, useRef } from 'react'; // <-- Importamos hooks
import { Container } from "./Container";
import { CtaBlock } from "./CtaBlock"; // Importamos el CTA
import { FaqItem } from "./FaqItem";
import { AnimateOnScroll } from './AnimateOnScroll';

// Data de las preguntas frecuentes (sin cambios)
const faqData = [
  { q: "Mi marca no tiene una identidad clara, ¿pueden ayudarme a definirla?", a: "Por supuesto, desarrollamos identidades visuales únicas y coherentes que reflejan los valores y objetivos de tu negocio. Esto incluye logotipos, identidad corporativa y diseño UX/UI." },
  { q: "¿Cómo puede mi empresa destacar en redes sociales saturadas?", a: "Creamos estrategias personalizadas para redes sociales, diseñando contenido atractivo y gestionando campañas que incrementan la interacción y el alcance de tu marca." },
  { q: "¿Hacen campañas publicitarias tradicionales además de digitales?", a: "Sí, además de publicidad digital, desarrollamos campañas offline como anuncios en medios impresos, radiales o exteriores, maximizando tu alcance en ambos formatos." },
  { q: "Mi página web no genera conversiones, ¿cómo pueden ayudarme?", a: "Optimizamos tu sitio web con un enfoque en diseño UX/UI, funcionalidad técnica y mensajes claros que guían a los usuarios hacia la acción deseada." },
  { q: "¿Qué herramientas utilizan para desarrollar sitios web y aplicaciones?", a: "Utilizamos WordPress, Webflow y desarrollo a medida para sitios web, además de FlutterFlow y código personalizado para aplicaciones móviles o de escritorio." },
  { q: "¿Pueden ayudarme a expandir mi negocio a nuevos mercados?", a: "Sí, desarrollamos estrategias de branding y marketing adaptadas a diferentes públicos, ayudándote a posicionarte en mercados locales e internacionales." },
  { q: "¿Puedo trabajar directamente con el equipo encargado de mi proyecto?", a: "Sí, nuestra prioridad es mantener una comunicación abierta. Tendrás contacto directo con los especialistas que gestionan tu proyecto para garantizar los mejores resultados." }
];

export const FaqSection = () => {
  // --- LÓGICA DEL ACORDEÓN ---
  // 1. El estado 'openIndex' vive ahora en el padre
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // 2. Ref para el contenedor y detectar clics afuera
  const faqContainerRef = useRef<HTMLDivElement>(null);

  // 3. Hook para manejar el "clic afuera"
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqContainerRef.current && !faqContainerRef.current.contains(event.target as Node)) {
        setOpenIndex(null); // Cierra el acordeón
      }
    };
    // Añade el listener al documento
    document.addEventListener('mousedown', handleClickOutside);
    // Limpia el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // El array vacío [] asegura que esto solo se ejecute UNA VEZ

  // 4. Función de Toggle que se pasará a los hijos
  const handleToggle = (index: number) => {
    // Si el índice clicado es el que ya está abierto, ciérralo (null).
    // Si no, abre el nuevo índice.
    setOpenIndex(openIndex === index ? null : index);
  };
  // --- FIN DE LA LÓGICA ---

  return (
    <section 
      className="relative z-70 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black 
                 rounded-t-[5rem] -mt-20"
    >
      <Container>
        {/* Título (sin cambios) */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Preguntas frecuentes
          </h2>
        </AnimateOnScroll>

        {/* Lista de FAQs (MODIFICADA) */}
        <AnimateOnScroll 
          className="mb-24 md:mb-32 flex flex-col gap-4" 
          delay={0.1}
        >
          {faqData.map((item, index) => (
            <FaqItem 
              key={index} 
              question={item.q} 
              answer={item.a}
              isOpen={openIndex === index}      
              onToggle={() => handleToggle(index)} 
            />
          ))}
        </AnimateOnScroll>

        {/* --- Sección CTA (Sin cambios) --- */}
        <AnimateOnScroll delay={0.2}>
          <CtaBlock
            line1={<p className="text-xl text-black/70 mb-2">No seas un extraño, hablemos 👄</p>}
            line2={<h3 className="text-3xl md:text-4xl font-semibold">¿Tienes una idea en mente?</h3>}
          />
        </AnimateOnScroll>
      </Container>
    </section>
  );
};