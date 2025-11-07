// EN: src/components/IntroSection.tsx
import { Container } from "./Container";
import { AnimatedButton } from "./AnimatedButton";

export const IntroSection = () => {
  const simboloUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67defed42550debdc0a4ec7b_Simbolo%20Andevo.svg";

  return (
    // Esta sección tiene el fondo blanco/alterno
    <section 
      className="relative z-20 py-24 md:py-32 bg-white text-black 
                 rounded-t-[3.2rem] -mt-[3.2rem]"
    >
      <Container>
        {/* Título */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-light">
            Construimos
            <br />
            <span className="italic">Marcas</span>
          </h2>
        </div>

        {/* Layout de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Columna 1: Imagen giratoria */}
          <div className="flex items-center justify-center h-64 md:h-96">
            <img
              src={simboloUrl}
              alt="Símbolo de Andevo"
              loading="lazy"
              className="w-full h-full object-contain rotating-image"
              // Usamos la misma animación que el botón de contacto
            />
          </div>

          {/* Columna 2: Texto y Botón */}
          <div className="max-w-md">
            <p className="text-xl md:text-2xl mb-12 leading-relaxed">
              Tu marca tiene una historia única y el mundo necesita escucharla. 
              En Andevo combinamos estrategia, creatividad y tecnología para 
              conectar con las personas correctas y generar impacto real.
            </p>
            
            {/* Reutilizamos el botón animado */}
            <AnimatedButton
              href="/nosotros"
              text="Conócenos"
              ariaLabel="Conoce más sobre Andevo"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};