// EN: src/components/CustomerLogos.tsx
import { Container } from "./Container";
import { LogoCloud } from "./LogoCloud";



// El componente principal de la sección
export const CustomerLogos = () => {
  return (
    // 1. pt-52 (13rem) - 5rem (scoop) = 8rem de espacio visual arriba.
    // 2. pb-52 (13rem) - 5rem (scoop) = 8rem de espacio visual abajo.
    <section className="relative z-10 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white rounded-t-[5rem] -mt-20">
      <Container>
        {/* Dejamos el margen interno tal cual (mb-12) */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            Hemos trabajado con
          </h2>
        </div>
        
        <LogoCloud />
      </Container>
    </section>
  );
};