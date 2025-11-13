// EN: src/app/about/_components/AboutCarouselSection.tsx
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importamos solo el CSS de Swiper, ya que no necesitamos módulos
// de navegación o paginación.
import 'swiper/css';

// Extraemos las URLs de las imágenes del HTML
const carouselImages = [
  { src: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb013d769505704f880f9a_Example.webp", alt: "Oficina Andevo" },
  { src: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67ec541152d731ccf6513605_Example%202.webp", alt: "Equipo Andevo trabajando" },
  // Las volvemos a añadir para asegurar un bucle suave
  { src: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb013d769505704f880f9a_Example.webp", alt: "Oficina Andevo" },
  { src: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67ec541152d731ccf6513605_Example%202.webp", alt: "Equipo Andevo trabajando" },
];

export const AboutCarouselSection = () => {
  return (
    // Esta sección es "full-bleed" (sin container)
    // y la ponemos sobre el fondo blanco
    <section className="relative z-20 bg-white py-16 lg:py-32 overflow-hidden">
      <Swiper
        // --- Configuración traducida de Slick ---
        loop={true}           // de infinite: true
        centeredSlides={true} // de centerMode: true
        slidesPerView="auto"  // de variableWidth: true
        // --- Fin de la configuración ---
        
        spaceBetween={30}     // Un espaciado estándar
        className="w-full"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide 
            key={index} 
            // Controlamos el 'variableWidth' dándole un ancho explícito a los slides
            // Usamos !w-[] para sobreescribir los estilos por defecto de Swiper
            className="!w-[80vw] md:!w-[60vw] lg:!w-[50vw]"
          >
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 80vw, 50vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};