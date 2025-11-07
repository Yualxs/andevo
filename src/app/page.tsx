// EN: src/app/page.tsx
// Fíjate cómo se han reducido las importaciones
import { CustomerLogos } from "@/components/CustomerLogos";
import { IntroSection } from "@/components/IntroSection";
import { VideoSection } from "@/components/VideoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { PhilosophySection } from "@/components/PhilosophySection";
import { BlogSection } from "@/components/BlogSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection"; // <-- 1. Importa el Hero

export default function Home() {
  
  // 2. Ya no necesitamos las constantes de video aquí (se movieron)

  return (
    <main className="overflow-x-hidden">
      
      {/* 3. Reemplazamos todo el bloque <header> con esto: */}
      <HeroSection /> 
      
      {/* El resto de tus secciones (sin cambios) */}
      <CustomerLogos />
      <IntroSection />
      <VideoSection />
      <ServicesSection />
      <FeaturedProjects />
      <PhilosophySection />
      <BlogSection />
      <FaqSection />
      
    </main>
  );
}