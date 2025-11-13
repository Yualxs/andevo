// EN: src/app/about/page.tsx
import { Metadata } from 'next';

// 1. Importamos el nuevo componente de sección
import { AboutHeroSection } from './_components/AboutHeroSection';
import { AboutValuesSection } from './_components/AboutValuesSection';
import { AboutCarouselSection } from './_components/AboutCarouselSection';
import { AboutDetailsSection } from './_components/AboutDetailsSection';
import { CustomerLogos } from '@/components/CustomerLogos';
import { SectionTitleWithVideo } from '@/components/SectionTitleWithVideo';
import { BenefitsSection } from '@/components/BenefitsSection';

// 2. Añadimos la Metadata de la página
export const metadata: Metadata = {
  title: 'Nosotros | Andevo',
  description: 'Rompe las reglas, piensa en grande, haz las cosas bien.',
  // Aquí podríamos añadir más metadatos de Open Graph si es necesario
};

// --- 4. Preparamos el Título y el CTA para la sección de logos ---
const logoSectionTitle = (
  <SectionTitleWithVideo
    line1Text="Proyectos"
    line2Text={<span className="italic">realizados</span>}
    // URLs del video del HTML ("Proyectos realizados" usa el video de Cuberto)
    videoPoster="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf2ee52d82544aeb54_Andevo%20Video%20Title%2002.webp"
    videoWebM="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b75507630d948bae201_Andevo%20Video%20Title%2002-transcode.webm"
    videoMp4="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad78034dacf2e76aedf3_Andevo%20Video%20Title%2002-transcode.mp4"
    fontWeight="font-medium" 
  />
);

const ctaLine1 = <p>No seas un extraño, hablemos 👄</p>;
const ctaLine2 = <h3>¿Tienes una idea en mente?</h3>;

// 3. Este es el componente de la página
export default function AboutPage() {
  return (
    <main>
      {/* Por ahora, solo renderizamos la sección Hero */}
      <AboutHeroSection />
      <AboutValuesSection />
      <AboutCarouselSection />
      <AboutDetailsSection />
      <CustomerLogos
        title={logoSectionTitle}
        zIndex="z-40" // z-40 para apilarse sobre la sección anterior
        showCta={true} // <-- Activo en "Nosotros"
        ctaLine1={ctaLine1}
        ctaLine2={ctaLine2}
        ctaButtonText="Cuéntanos😉" // <-- Texto del botón de "Nosotros"
        ctaIsSecondary={true} // <-- Estilo secundario (negro)
      />
      <BenefitsSection zIndex="z-50" showImage={true} />

      {/* Aquí añadiremos las otras secciones (Valores, Imagen, etc.) 
          cuando las migremos. 
      */}
    </main>
  );
}