// EN: src/components/PhilosophySection.tsx
import { Container } from "./Container";
// import { AnimatedButton } from "./AnimatedButton"; // <-- 1. ELIMINA ESTA LÍNEA

// --- 2. AÑADE LAS URLs DEL VIDEO DE FILOSOFÍA ---
const videoPoster = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f74cd134ebd745b447606_Andevo%20Video%203D.webp";
const videoWebM = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b894ac34ccefcb02bee_Andevo%20Video%203D-transcode.webm";
const videoMp4 = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F67cf689adf6efcbb3ed11493_2-transcode.mp4";
// ---

// --- 3. CAMBIA EL NOMBRE DEL COMPONENTE ---
export const PhilosophySection = () => {
  // const simboloUrl = "..."; // <-- Puedes borrar esta línea

  return (
    // CAMBIO DE Z-INDEX: 'z-50' para que se ponga sobre la sección anterior (z-40)
    <section 
      className="relative z-50 py-24 md:py-32 bg-white text-black 
                 rounded-t-[3.2rem] -mt-[3.2rem]"
    >
      <Container>
        {/* Título (CAMBIADO) */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            Nuestra filosofía
          </h2>
        </div>

        {/* Layout de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* --- 4. CAMBIA <img> POR <video> --- */}
          {/* Columna 1: Video 3D (reemplaza la <img>) */}
          <div className="flex items-center justify-center h-64 md:h-96">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              className="w-full h-full object-contain" // (Sin la clase 'rotating-image')
            >
              <source src={videoWebM} type="video/webm" />
              <source src={videoMp4} type="video/mp4" />
            </video>
          </div>

          {/* Columna 2: Texto (CAMBIADO) */}
          <div className="max-w-md">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-black/70">
              Estamos impulsados por el diseño centrado en el usuario que 
              impulsa la productividad y aumenta los ingresos. Nuestra 
              experiencia e ingenio son notables, pero siempre nos 
              esforzamos en mejorar en cada proyecto.
            </p>
            {/* Se elimina el <AnimatedButton /> */}
          </div>
          
        </div>
      </Container>
    </section>
  );
};