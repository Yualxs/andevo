// EN: src/app/services/_components/ServiceList.tsx
'use client';

import { ServiceCard } from "@/lib/sanity.client";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ServiceItem } from "./ServiceItem"; // <-- Importamos el item
import { ElasticDivider } from "@/components/ElasticDivider"; // <-- Reutilizamos el divisor

export const ServiceList = ({ services }: { services: ServiceCard[] }) => {

  // Filtramos los servicios en dos listas, tal como en el HTML
  const generalServices = services.filter(s => s.category === 'general');
  const cuscoServices = services.filter(s => s.category === 'cusco');

  return (
    <section 
      className="relative z-10 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white 
                 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20"
    >
      <Container>
        
        {/* --- Lista 1: Soluciones Generales --- */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium">
            Nuestras<br/><span className="italic">soluciones</span>
          </h2>
        </AnimateOnScroll>
        
        <div className="flex flex-col">
          {generalServices.map((service, index) => (
            <div key={service._id}>
              {index > 0 && <ElasticDivider className="text-white" />}
              <ServiceItem
                href={`/services/${service.slug.current}`}
                title={service.title}
                description={service.description}
                buttonText="Saber más 🌐"
              />
            </div>
          ))}
        </div>

        {/* --- Lista 2: Soluciones en Cusco --- */}
        {cuscoServices.length > 0 && (
          <>
            <AnimateOnScroll className="mt-24 mb-12 lg:mt-32 lg:mb-16">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium">
                Nuestras<br/><span className="italic">soluciones en Cusco</span>
              </h2>
            </AnimateOnScroll>
            
            <div className="flex flex-col">
              {cuscoServices.map((service, index) => (
                <div key={service._id}>
                  {index > 0 && <ElasticDivider className="text-white" />}
                  <ServiceItem
                    href={`/services/${service.slug.current}`}
                    title={service.title}
                    description={service.description}
                    buttonText="Saber más 🎨"
                  />
                </div>
              ))}
            </div>
          </>
        )}

      </Container>
    </section>
  );
};