// EN: src/app/services/_components/LogoCarouselBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.client';
import { Autoplay } from 'swiper/modules'; // <-- REEMPLAZO (solo Autoplay)

// 2. Importa los CSS de los módulos (importante para que funcionen los efectos)
import 'swiper/css';
import 'swiper/css/autoplay';

export const LogoCarouselBlock = ({ block }: { block: any }) => {
  return (
    <section className="bg-white text-black relative z-60 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
      
      <Container className="pt-16 lg:pt-32">
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-medium max-w-4xl"
            dangerouslySetInnerHTML={{ __html: block.mainTitle }}
          />
        </AnimateOnScroll>
      </Container>

      <AnimateOnScroll delay={0.1} className="pb-16 lg:pb-32">
        <Swiper
            // 1. Módulo simplificado
            modules={[Autoplay]} 
            
            // 2. Autoplay más rápido y fluido
            autoplay={{
              delay: 1, // 1 milisegundo entre transiciones
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            speed={4000} // Duración de la animación (4 segundos por slide)

            // 3. Configuración del bucle (eliminamos Coverflow y centeredSlides)
            loop={true}
            slidesPerView={'auto'} // Mantenemos el ancho variable
            spaceBetween={30}
          className="w-full"
        >
          {block.slides?.map((slide: any) => (
            <SwiperSlide 
              key={slide._key} 
              // Los anchos de los slides (¡mantener estos!)
              className="!w-[80vw] md:!w-[60vw] lg:!w-[45vw] xl:!w-[35vw]"
            >
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden">
                <Image
                  src={urlFor(slide.mainImage).url()}
                  alt="Caso de éxito"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image
                  src={urlFor(slide.clientLogo).url()}
                  alt="Logo de cliente"
                  width={200}
                  height={80}
                  className="absolute z-20 bottom-6 left-6 w-auto h-12 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </AnimateOnScroll>
    </section>
  );
};