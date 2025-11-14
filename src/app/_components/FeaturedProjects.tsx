// EN: src/components/FeaturedProjects.tsx
'use client';

import { Container } from "@/components/Container";
import { AnimatedButton } from "@/components/AnimatedButton";
import { HoverVideoCard } from "./HoverVideoCard";
import { SectionTitleWithVideo } from '@/components/SectionTitleWithVideo';
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

// Data extraída del HTML original de Andevo (Proyectos Destacados)
const projectData = [
  {
    href: "/proyectos/alpaca-expeditions",
    title: "Alpaca Expeditions",
    subtitle: "Diseño Web UX UI",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf111c5e76dcb79a4c_Andevo%20Video%20Title%2001.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67ddf16e5c2c9bf97c1a09ad_Andevo%20Clientes%20Pasados-transcode.mp4"
  },
  {
    href: "/proyectos/sam-travel",
    title: "Sam Travel",
    subtitle: "Rebranding",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf2ee52d82544aeb54_Andevo%20Video%20Title%2002.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67ddf16e5c2c9bf97c1a09ad_Andevo%20Clientes%20Pasados-transcode.mp4"
  },
  {
    href: "/proyectos/cusela",
    title: "Cusela",
    subtitle: "Meta Ads TikTok Ads Google Ads",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cff057f3c927e658ec_Andevo%20Video%20Title%2003.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67ddf16e5c2c9bf97c1a09ad_Andevo%20Clientes%20Pasados-transcode.mp4"
  },
  {
    href: "/proyectos/super-jump-park",
    title: "Super Jump Park",
    subtitle: "Chatbot Marketing",
    // Re-usamos un poster ya que el HTML no proveía 4 únicos
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/68407423e8093d5f309d73d6_Andevo%20Service%2001.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67ddf16e5c2c9bf97c1a09ad_Andevo%20Clientes%20Pasados-transcode.mp4"
  }
];

export const FeaturedProjects = () => {
  return (
    // SECCIÓN: Fondo negro, "scoop", z-index 50 (más alto que Servicios)
    <section 
      className="relative z-50 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white 
                 rounded-t-[5rem] -mt-[5rem]"
    >
      <Container>
        {/* 3. Reemplaza el <div> y <h2> por esto: */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <SectionTitleWithVideo
            line1Text="Proyectos"
            line2Text="destacados"
            videoPoster="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf2ee52d82544aeb54_Andevo%20Video%20Title%2002.webp"
            videoWebM="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b75507630d948bae201_Andevo%20Video%20Title%2002-transcode.webm"
            videoMp4="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad78034dacf2e76aedf3_Andevo%20Video%20Title%2002-transcode.mp4"
          />
        </AnimateOnScroll>

        {/* --- CONTENEDOR FLEX (DOS COLUMNAS) --- */}
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-16">

          {/* COLUMNA 1: Proyecto 1 y 2 */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16">
            
            {/* Proyecto 1 */}
            <AnimateOnScroll delay={0.1}>
              <HoverVideoCard
                href={projectData[0].href}
                title={projectData[0].title}
                subtitle={projectData[0].subtitle}
                posterUrl={projectData[0].posterUrl}
                videoUrl={projectData[0].videoUrl}
                textColor="text-white"
              />
            </AnimateOnScroll>

            {/* Proyecto 2 */}
            <AnimateOnScroll delay={0.3}>
              <HoverVideoCard
                href={projectData[1].href}
                title={projectData[1].title}
                subtitle={projectData[1].subtitle}
                posterUrl={projectData[1].posterUrl}
                videoUrl={projectData[1].videoUrl}
                textColor="text-white"
              />
            </AnimateOnScroll>
          </div>

          {/* COLUMNA 2: Proyecto 3 y 4 (con padding superior) */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16 md:pt-24">
            
            {/* Proyecto 3 */}
            <AnimateOnScroll delay={0.2}>
              <HoverVideoCard
                href={projectData[2].href}
                title={projectData[2].title}
                subtitle={projectData[2].subtitle}
                posterUrl={projectData[2].posterUrl}
                videoUrl={projectData[2].videoUrl}
                textColor="text-white"
              />
            </AnimateOnScroll>

            {/* Proyecto 4 */}
            <AnimateOnScroll delay={0.4}>
              <HoverVideoCard
                href={projectData[3].href}
                title={projectData[3].title}
                subtitle={projectData[3].subtitle}
                posterUrl={projectData[3].posterUrl}
                videoUrl={projectData[3].videoUrl}
                textColor="text-white"
              />
            </AnimateOnScroll>
          </div>

        </div>
        {/* --- FIN DEL FLEX --- */}

        {/* Botón (Botón secundario, fondo negro) */}
        <AnimateOnScroll className="text-center mt-24" delay={0.5}>
          <AnimatedButton
            href="/proyectos"
            text="Ver más proyectos"
            ariaLabel="Ver todos nuestros proyectos"
            isSecondary // <-- Usamos el estilo secundario
          />
        </AnimateOnScroll>
      </Container>
    </section>
  );
};