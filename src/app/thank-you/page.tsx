// EN: src/app/thank-you/page.tsx
'use client';

import { Container } from '@/components/Container';
import { AnimatedButton } from '@/components/AnimatedButton';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <main className="bg-white text-black">
      {/* Usamos el mismo padding que la página de contacto */}
      <div className="pt-48 pb-44 lg:pt-80 lg:pb-96">
        <Container>
          
          {/* Breadcrumbs */}
          <StaggeredEntryAnimation>
            <div className="mb-16 flex items-center text-base text-black/70">
              <Link href="/" className="hover:text-black">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-black">Mensaje Enviado</span>
            </div>
          </StaggeredEntryAnimation>

          {/* Contenido de Éxito */}
          <StaggeredEntryAnimation delay={0.1}>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-6">
                ¡Mensaje Recibido!
              </h1>
              <p className="text-base md:text-lg text-black/70 mb-8">
                Te hemos enviado un correo de confirmación. Un especialista 
                revisará tu proyecto y te contactará.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-medium mb-4">¿Prefieres agendar ahora?</h2>
              <p className="text-base md:text-lg text-black/70 mb-8">
                Evita la espera. Usa nuestro enlace de agendamiento para 
                reservar una llamada de 30 minutos directamente con nuestro equipo.
              </p>
              <AnimatedButton
                href="https://calendly.com/team-andevo/reunion" // TU LINK DE CALENDLY
                text="Agendar mi reunión 🚀"
                ariaLabel="Agendar reunión ahora"
              />
            </div>
          </StaggeredEntryAnimation>

        </Container>
      </div>
    </main>
  );
}