// EN: src/components/ServicesSection.tsx
import { Container } from "./Container";
import { AnimatedButton } from "./AnimatedButton";
import { HoverVideoCard } from "./HoverVideoCard"; // Asegúrate de que este esté importado

// Data para los 3 servicios (sin cambios)
const servicesData = [
  {
    href: "/servicios/marketing-digital",
    title: "Marketing Digital",
    subtitle: "Estrategia y Creatividad",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf111c5e76dcb79a4c_Andevo%20Video%20Title%2001.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad68cb9ea083f2316084_Andevo%20Video%20Title%2001-transcode.mp4"
  },
  {
    href: "/servicios/branding",
    title: "Branding",
    subtitle: "Identidad y Propósito",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf2ee52d82544aeb54_Andevo%20Video%20Title%2002.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad78034dacf2e76aedf3_Andevo%20Video%20Title%2002-transcode.mp4"
  },
  {
    href: "/servicios/desarrollo-web",
    title: "Desarrollo Web",
    subtitle: "Tecnología y Diseño",
    posterUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cff057f3c927e658ec_Andevo%20Video%20Title%2003.webp",
    videoUrl: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad80f14bc69995d3aa3b_Andevo%20Video%20Title%2003-transcode.mp4"
  }
];

export const ServicesSection = () => {
  return (
    // SECCIÓN: Fondo blanco, "scoop", z-index 40
    <section 
      className="relative z-40 py-24 md:py-32 bg-white text-black 
                 rounded-t-[3.2rem] -mt-[3.2rem]"
    >
      <Container>
        
        {/* --- 1. BLOQUE DE TÍTULO Y DESCRIPCIÓN (ARRIBA) --- */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            Nuestros servicios
          </h2>
        </div>

        {/* --- 2. CONTENEDOR FLEX (DOS COLUMNAS) --- */}
        {/* Usamos flexbox para crear las dos columnas principales */}
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-16">

          {/* COLUMNA 1: Descripción y Servicio de Branding */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16">
            
            {/* CÉLULA 1: Descripción */}
            <div className="md:pr-8">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-black/70">
                Desde diseño de movimiento hasta productos impulsados por IA,
                diseñamos y construimos interfaces para el futuro.
              </p>
            </div>

            {/* CÉLULA 2: Servicio 2 (Branding) */}
            <div>
              <HoverVideoCard
                href={servicesData[1].href} // Índice 1 = Branding
                title={servicesData[1].title}
                subtitle={servicesData[1].subtitle}
                posterUrl={servicesData[1].posterUrl}
                videoUrl={servicesData[1].videoUrl}
              />
            </div>
          </div>

          {/* COLUMNA 2: Marketing Digital y Desarrollo Web */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16">
            
            {/* CÉLULA 3: Servicio 1 (Marketing Digital) */}
            <div className="md:pt-24">
              <HoverVideoCard
                href={servicesData[0].href} // Índice 0 = Marketing Digital
                title={servicesData[0].title}
                subtitle={servicesData[0].subtitle}
                posterUrl={servicesData[0].posterUrl}
                videoUrl={servicesData[0].videoUrl}
              />
            </div>

            {/* CÉLULA 4: Servicio 3 (Desarrollo Web) */}
            <div>
              <HoverVideoCard
                href={servicesData[2].href} // Índice 2 = Desarrollo Web
                title={servicesData[2].title}
                subtitle={servicesData[2].subtitle}
                posterUrl={servicesData[2].posterUrl}
                videoUrl={servicesData[2].videoUrl}
              />
            </div>
          </div>

        </div>
        {/* --- FIN DEL FLEX --- */}

        {/* --- 3. BOTÓN (CENTRADO) --- */}
        <div className="text-center mt-24">
          <AnimatedButton
            href="/servicios"
            text="Ver todos los servicios"
            ariaLabel="Ver todos nuestros servicios"
            // Se usa el estilo primario (fondo blanco, hover negro)
          />
        </div>
      </Container>
    </section>
  );
};