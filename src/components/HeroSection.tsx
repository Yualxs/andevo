// EN: src/components/HeroSection.tsx
import { Container } from "./Container";
import { CtaBlock } from "./CtaBlock"; // Importamos el CTA
import Link from 'next/link';

export const HeroSection = () => {
  // Las constantes del video ahora viven dentro de este componente
  const videoPoster = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf111c5e76dcb79a4c_Andevo%20Video%20Title%2001.webp";
  const videoWebM = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b6adab61b98cef1315b_Andevo%20Video%20Title%2001-transcode.webm";
  const videoMp4 = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad68cb9ea083f2316084_Andevo%20Video%20Title%2001-transcode.mp4";

  return (
    <header className="py-24 pt-40 md:pt-48 md:pb-32 bg-white text-black">
      <Container>
        
        {/* Breadcrumbs */}
        <div className="mb-12 text-center">
          <Link href="/" className="text-base">Home</Link>
        </div>

        <div className="mb-24 text-center">
          {/* Subtítulo superior */}
          <div className="mb-4">
            <p className="text-lg sm:text-xl md:text-2xl">¡Encantado de conocerte! 👋</p>
          </div>
          
          {/* Título principal H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-8 text-center">
            Agencia de Branding y Desarrollo Web
            
            <span className="inline-flex items-center justify-center h-[0.85em] aspect-[2/1] rounded-full overflow-hidden align-middle mx-2 shrink-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={videoPoster}
                className="w-full h-full object-cover scale-150"
              >
                <source src={videoWebM} type="video/webm" />
                <source src={videoMp4} type="video/mp4" />
              </video>
            </span>
          </h1>

          {/* Subtítulo inferior H2 */}
          <h2 className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto">
            Somos especialistas en branding y desarrollo web; creamos marketing digital a tu medida, mezclando creatividad y datos para hacer crecer tu marca.
          </h2>
        </div>

        {/* Sección CTA (reutilizando el componente) */}
        <CtaBlock
          line1={<h3 className="text-2xl font-medium mb-2">¿Tienes una idea en mente?</h3>}
          line2={<p>Cuéntanos 😉, nosotros la creamos.</p>}
        />

      </Container>
    </header>
  );
};