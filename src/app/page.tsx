// EN: src/app/page.tsx
// Fíjate cómo se han reducido las importaciones
import { CustomerLogos } from "@/components/CustomerLogos";
import { MediaContentSection } from "@/components/MediaContentSection";
import { VideoSection } from "@/components/VideoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { BlogSection } from "@/components/BlogSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection"; // <-- 1. Importa el Hero

export default function Home() {
  
  // 2. Ya no necesitamos las constantes de video aquí (se movieron)
  const introMedia = (
    <img
      src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg"
      alt="Símbolo de Andevo"
      loading="lazy"
      className="w-full h-full object-contain rotating-image"
    />
  );

  const philosophyMedia = (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f74cd134ebd745b447606_Andevo%20Video%203D.webp"
      className="w-full h-full object-contain"
    >
      <source src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b894ac34ccefcb02bee_Andevo%20Video%203D-transcode.webm" type="video/webm" />
      <source src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67cf689adf6efcbb3ed11493_2-transcode.mp4" type="video/mp4" />
    </video>
  );

  return (
    <main className="overflow-x-hidden">
         
      {/* 3. Reemplazamos todo el bloque <header> con esto: */}
      <HeroSection /> 

      {/* El resto de tus secciones (sin cambios) */}
      <CustomerLogos />
      <MediaContentSection
        zIndex="z-20"
        title="Construimos Marcas"
        description="Tu marca tiene una historia única y el mundo necesita escucharla. En Andevo combinamos estrategia, creatividad y tecnología para conectar con las personas correctas y generar impacto real."
        mediaContent={introMedia}
        buttonHref="/nosotros"
        buttonText="Conócenos"
        buttonAriaLabel="Conoce más sobre Andevo"
      />
      <VideoSection />
      <ServicesSection />
      <FeaturedProjects />
      <MediaContentSection
        zIndex="z-50"
        title="Nuestra filosofía"
        description="Estamos impulsados por el diseño centrado en el usuario que impulsa la productividad y aumenta los ingresos. Nuestra experiencia e ingenio son notables, pero siempre nos esforzamos en mejorar en cada proyecto."
        mediaContent={philosophyMedia}
        // (No pasamos props de botón, por lo que no se renderizará)
      />
      <BlogSection />
      <FaqSection />
      
    </main>
  );
}