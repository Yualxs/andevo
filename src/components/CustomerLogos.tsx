// EN: src/components/CustomerLogos.tsx
import React, { ReactElement } from 'react';
import { Container } from "./Container";
import { LogoCloud } from "./LogoCloud";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { CtaBlock, ElementProps } from './CtaBlock'; // <-- 2. Importar CtaBlock
import clsx from 'clsx'; // <-- 3. Importar clsx

// --- 4. Definir la nueva interfaz de Props ---
interface CustomerLogosProps {
  title: React.ReactNode;
  zIndex: string;
  showCta?: boolean;
  // --- USA EL TIPO IMPORTADO AQUÍ ---
  ctaLine1?: ReactElement<ElementProps>;
  ctaLine2?: ReactElement<ElementProps>;
  ctaButtonText?: string;
  ctaIsSecondary?: boolean;
}

// --- 5. Aplicar las props al componente ---
export const CustomerLogos = ({
  title,
  zIndex,
  showCta = false,
  ctaLine1,
  ctaLine2,
  ctaButtonText,
  ctaIsSecondary
}: CustomerLogosProps) => {
  return (
    <section 
      className={clsx(
        "relative pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20",
        zIndex // <-- Usar prop de zIndex
      )}
    >
      <Container>
        {/* 6. Renderizar el Título (ahora dinámico) */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          {title}
        </AnimateOnScroll>
        
        {/* LogoCloud (sin cambios) */}
        <AnimateOnScroll delay={0.1}>
          <LogoCloud />
        </AnimateOnScroll>

        {/* --- 7. Renderizado Condicional del CTA --- */}
        {showCta && ctaLine1 && ctaLine2 && (
          <AnimateOnScroll className="mt-24 lg:mt-32" delay={0.2}>
            <CtaBlock
              line1={ctaLine1}
              line2={ctaLine2}
              buttonText={ctaButtonText}
              isSecondary={ctaIsSecondary}
              buttonAriaLabel="Ir a contacto"
            />
          </AnimateOnScroll>
        )}
      </Container>
    </section>
  );
};