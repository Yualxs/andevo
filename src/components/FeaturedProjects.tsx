// EN: src/components/FeaturedProjects.tsx
import { Container } from "./Container";
import { AnimatedButton } from "./AnimatedButton";
import { HoverVideoCard } from "./HoverVideoCard"; // Importamos nuestra tarjeta reutilizable

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
      className="relative z-50 py-24 md:py-32 bg-black text-white 
                 rounded-t-[3.2rem] -mt-[3.2rem]"
    >
      <Container>
        {/* Título */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-light">
            Proyectos
            <br />
            <span className="italic">destacados</span>
          </h2>
        </div>

        {/* --- CONTENEDOR FLEX (DOS COLUMNAS) --- */}
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-16">

          {/* COLUMNA 1: Proyecto 1 y 2 */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16">
            
            {/* Proyecto 1 */}
            <HoverVideoCard
              href={projectData[0].href}
              title={projectData[0].title}
              subtitle={projectData[0].subtitle}
              posterUrl={projectData[0].posterUrl}
              videoUrl={projectData[0].videoUrl}
              textColor="text-white"
            />

            {/* Proyecto 2 */}
            <HoverVideoCard
              href={projectData[1].href}
              title={projectData[1].title}
              subtitle={projectData[1].subtitle}
              posterUrl={projectData[1].posterUrl}
              videoUrl={projectData[1].videoUrl}
              textColor="text-white"
            />
          </div>

          {/* COLUMNA 2: Proyecto 3 y 4 (con padding superior) */}
          <div className="flex flex-col w-full md:w-1/2 gap-y-16 md:pt-24">
            
            {/* Proyecto 3 */}
            <HoverVideoCard
              href={projectData[2].href}
              title={projectData[2].title}
              subtitle={projectData[2].subtitle}
              posterUrl={projectData[2].posterUrl}
              videoUrl={projectData[2].videoUrl}
              textColor="text-white"
            />

            {/* Proyecto 4 */}
            <HoverVideoCard
              href={projectData[3].href}
              title={projectData[3].title}
              subtitle={projectData[3].subtitle}
              posterUrl={projectData[3].posterUrl}
              videoUrl={projectData[3].videoUrl}
              textColor="text-white"
            />
          </div>

        </div>
        {/* --- FIN DEL FLEX --- */}

        {/* Botón (Botón secundario, fondo negro) */}
        <div className="text-center mt-24">
          <AnimatedButton
            href="/proyectos"
            text="Ver más proyectos"
            ariaLabel="Ver todos nuestros proyectos"
            isSecondary // <-- Usamos el estilo secundario
          />
        </div>
      </Container>
    </section>
  );
};