import { AnimatedButton } from "@/components/AnimatedButton";
import { Container } from "@/components/Container";
import { CustomerLogos } from "@/components/CustomerLogos";
import Link from 'next/link';
import { IntroSection } from "@/components/IntroSection";
import { VideoSection } from "@/components/VideoSection";

export default function Home() {
  
  const videoPoster = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cf111c5e76dcb79a4c_Andevo%20Video%20Title%2001.webp";
  const videoWebM = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b6adab61b98cef1315b_Andevo%20Video%20Title%2001-transcode.webm";
  const videoMp4 = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad68cb9ea083f2316084_Andevo%20Video%20Title%2001-transcode.mp4";

  return (
    <main className="overflow-x-hidden">
      {/* El <header> es la sección Hero de la página de inicio.
        Usamos py-24 (padding top/bottom) + pt-16 (padding top por el Header fijo) 
      */}
      <header className="py-24 pt-40 md:pt-48 md:pb-32 bg-white text-black">
        <Container>
          
          {/* Breadcrumbs */}
          <div className="mb-12 text-center">
            <Link href="/" className="text-sm">Home</Link> {/* <-- CAMBIO AQUÍ */}
          </div>

          <div className="mb-24 text-center">
            {/* Subtítulo superior */}
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl">¡Encantado de conocerte! 👋</h2>
            </div>
            
            {/* Título principal H1 - CORRECCIÓN FINAL */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 text-center">
              Agencia de
              <span className="font-medium italic"> Branding y Desarrollo Web </span>
              
              {/* Contenedor del video inline:
                - 'inline-flex' hace que se comporte como un elemento de texto (inline)
                - 'align-middle' lo centra verticalmente con la línea de texto
                - 'mx-2' le da un espacio (el 'gap' que perdimos)
              */}
              <span className="inline-flex items-center justify-center h-12 md:h-16 lg:h-24 w-24 md:w-32 lg:w-48 rounded-full overflow-hidden align-middle mx-2 flex-shrink-0">
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
            <h2 className="text-2xl md:text-3xl max-w-4xl mx-auto">
              Somos especialistas en branding y desarrollo web; creamos marketing 
              digital a tu medida, mezclando creatividad y datos para hacer crecer tu marca.
            </h2>
          </div>

          {/* Sección CTA (Call to Action) - MODIFICADO AQUÍ */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8"> {/* Removido bg-gray-100 y rounded-3xl */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-medium mb-2">¿Tienes una idea en mente?</h3>
              <p>Cuéntanos 😉, nosotros la creamos.</p>
            </div>
            <div className="md:text-right">
              <AnimatedButton 
                href="/contacto"
                text="😎 Agendar consultoría"
                ariaLabel="Agendar consultoría de marketing digital"
              />
            </div>
          </div>

        </Container>
      </header>

      {/* --- 2. AÑADE LA NUEVA SECCIÓN AQUÍ --- */}
      <CustomerLogos />
      <IntroSection />
      <VideoSection />
      {/* ... Aquí irán las otras secciones ... */}
    </main>
  );
}