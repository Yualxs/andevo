// EN: src/app/services/page.tsx
import { Metadata } from 'next';
import { sanityClient, ServiceCard } from '@/lib/sanity.client';
import { servicesQuery } from '@/lib/sanity.client';

// Componentes locales que crearemos
import { ServicesHero } from './_components/ServicesHero';
import { ServiceList } from './_components/ServiceList';

// Componentes Globales Reutilizados
import { BenefitsSection } from '@/components/BenefitsSection';
import { CtaBlock } from '@/components/CtaBlock';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Servicios | Andevo',
  description: 'Nos encanta lo que hacemos. Soluciones de Branding, Desarrollo Web y Marketing.',
};

// 1. Función de Servidor para buscar los datos
async function getServices(): Promise<ServiceCard[]> {
  const services = await sanityClient.fetch(servicesQuery);
  return services;
}

// 2. La Página (Async Server Component)
export default async function ServicesPage() {
  const services = await getServices();

  // El CTA es una sección global que podemos reutilizar
  const ctaBlock = (
    <AnimateOnScroll>
      <Container>
        <CtaBlock
          line1={<p className="text-xl text-black/70 mb-2">No seas un extraño, hablemos 👄</p>}
          line2={<h3 className="text-3xl md:text-4xl font-semibold">¿Tienes una idea en mente?</h3>}
        />
      </Container>
    </AnimateOnScroll>
  );

  return (
    <main className="overflow-x-hidden">
      
      {/* 1. Hero (H1, H4, Breadcrumbs) */}
      <ServicesHero />
      
      {/* 2. Lista de Servicios (Fondo Negro) */}
      <ServiceList services={services} />

      {/* 3. REUTILIZAMOS la sección de Beneficios */}
      {/* (El HTML muestra la imagen, así que 'showImage={true}') */}
      <BenefitsSection zIndex="z-30" showImage={true} />

      {/* 4. REUTILIZAMOS el CTA (Formulario) */}
      {/* (El HTML no lo muestra, pero asumimos que lo queremos) */}
      <section className="relative z-40 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
        {ctaBlock}
      </section>
      
      {/* El Footer se renderiza automáticamente desde ClientProviders */}
    </main>
  );
}