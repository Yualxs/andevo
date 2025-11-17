// EN: src/app/services/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient, urlFor, ServicePageData, servicePageQuery } from '@/lib/sanity.client';

// Componentes Globales
import { Container } from '@/components/Container';
import { CtaBlock } from '@/components/CtaBlock';
import { CustomerLogos } from '@/components/CustomerLogos';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

// Componente Local
import { ServiceBlockRenderer } from '../_components/ServiceBlockRenderer';

// --- 1. FUNCIÓN DE DATA FETCHING (Sin cambios, está correcta) ---
async function getService(slug: string): Promise<ServicePageData | null> {
  const service = await sanityClient.fetch(servicePageQuery, { slug });
  return service;
}

// --- 2. FUNCIÓN DE METADATA (¡CORREGIDA!) ---
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  
  // --- ¡CORRECCIÓN AQUÍ! ---
  // Primero "esperamos" a que la promesa de 'params' se resuelva
  const params = await paramsPromise;
  
  const service = await getService(params.slug); // <-- Ahora params.slug SÍ existe
  
  if (!service) {
    return { title: 'Servicio no encontrado' };
  }

  const title = service.seoTitle || service.title || 'Servicio de Andevo';
  const description = service.seoDescription || 'Soluciones de Branding y Desarrollo Web.';
  
  return {
    title: `${title} | Andevo`,
    description: description,
    robots: {
      index: service.noIndex === true ? false : true,
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      images: service.ogImage ? [urlFor(service.ogImage).width(1200).height(630).url()] : [],
    },
  };
}

// --- 3. EL COMPONENTE DE PÁGINA (¡CORREGIDO!) ---
export default async function ServicePage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  
  // --- ¡CORRECCIÓN AQUÍ! ---
  // Hacemos lo mismo para el componente de la página
  const params = await paramsPromise;

  const service = await getService(params.slug); // <-- Ahora params.slug SÍ existe

  if (!service) {
    notFound(); // Muestra la página 404
  }

  // Preparamos el CTA Global (sin cambios)
  const globalCta = (
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
      
      {/* 1. RENDERIZADOR DE BLOQUES */}
      {service.pageBuilder && service.pageBuilder.length > 0 && (
        <ServiceBlockRenderer blocks={service.pageBuilder} />
      )}

      {/* 2. SECCIONES GLOBALES (sin cambios) */}
      <CustomerLogos 
        title={<h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">Proyectos <span className="italic">Destacados</span></h2>}
        zIndex="z-80"
        showCta={false}
      />
      
      <section className="relative z-90 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-white text-black rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
        {globalCta}
      </section>

    </main>
  );
}