// EN: src/components/CtaBlock.tsx
import { AnimatedButton } from "./AnimatedButton";

interface CtaBlockProps {
  line1: React.ReactNode; // Usamos ReactNode para poder pasarle JSX (como un <p>)
  line2: React.ReactNode; // O un <h3>
}

export const CtaBlock = ({ line1, line2 }: CtaBlockProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
      
      {/* Columna de Texto */}
      <div className="md:col-span-2">
        {line1}
        {line2}
      </div>
      
      {/* Columna del Botón (siempre es igual) */}
      <div className="md:text-right">
        <AnimatedButton 
          href="/contacto"
          text="😎 Agendar consultoría"
          ariaLabel="Agendar consultoría de marketing digital"
          // Estilo primario (fondo blanco)
        />
      </div>
    </div>
  );
};