// EN: src/components/BlogSection.tsx
'use client'; // <-- ¡Importante! Esto es un Componente de Cliente

import React, { useState, useEffect, useRef } from 'react';
import { Container } from './Container';
import { AnimatedButton } from './AnimatedButton';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTitleWithVideo } from './SectionTitleWithVideo';

// --- Data Ficticia (Hardcoded) para el Blog ---
const blogData = [
  {
    title: "Potencial del Turismo Estadounidense en Perú: Insights del Reporte de PromPerú",
    imgSrc: "https://cdn.prod.website-files.com/65f0a9f88c6334214f7dea39/66e8a7c9bdf7d7355de6a280_Yualxs%20Blog%20004.webp",
    href: "/blog/potencial-del-turismo-estadounidense-en-peru"
  },
  {
    title: "Meta Ads: Domina el Formato Imagen en Facebook e Instagram",
    imgSrc: "https://cdn.prod.website-files.com/65f0a9f88c6334214f7dea39/66e8a9d8961308a7a2924d56_Yualxs%20Blog%20003.webp",
    href: "/blog/meta-ads-domina-el-formato-imagen"
  },
  {
    title: "Una Agencia me Pidió Eliminar la Fan Page de un Cliente",
    imgSrc: "https://cdn.prod.website-files.com/65f0a9f88c6334214f7dea39/66443b9f981b946d6566d5e6_Compromiso%20con%20Resultados%20-%20Home%20Yualxs.webp",
    href: "/blog/una-agencia-me-pidio-eliminar-la-fan-page"
  },
  {
    title: "Sea Siempre el Dueño de sus Cuentas Publicitarias",
    imgSrc: "https://cdn.prod.website-files.com/65f0a9f88c6334214f7dea39/6644f4b12975ef77c46c3525_Yualxs%20-%20Blog%2001%20-%2000%20-%20Control%20Total%20de%20Cuentas%20en%20Meta%20Ads.webp",
    href: "/blog/sea-siempre-el-dueno-de-sus-cuentas"
  }
];

// URLs del video del título (Video 03)
const videoPoster = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cff057f3c927e658ec_Andevo%20Video%20Title%2003.webp";
const videoWebM = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b82f9805d31ef82b4ed_Andevo%20Video%20Title%2003-transcode.webm";
const videoMp4 = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad80f14bc69995d3aa3b_Andevo%20Video%20Title%2003-transcode.mp4";

// --- Sub-componente: Tarjeta de Blog ---
const BlogCard = ({ post }: { post: typeof blogData[0] }) => (
  <Link href={post.href} className="block group">
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
      <img
        src={post.imgSrc}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 w-full h-full bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
    </div>
    <div className="mt-4">
      <h3 className="text-xl md:text-2xl font-light text-white">
        {post.title}
      </h3>
    </div>
  </Link>
);

// --- Componente Principal de la Sección ---
export const BlogSection = () => {
  // Refs para los botones de navegación y la instancia de Swiper
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  // Estado para forzar una actualización después de que los refs estén listos
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Actualiza la navegación de Swiper cuando los refs estén listos
  useEffect(() => {
    if (isMounted && swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, [isMounted]);

  return (
    // SECCIÓN: Fondo negro, "scoop", z-index 60 (para estar sobre la sección anterior)
    <section 
      className="relative z-60 py-24 md:py-32 bg-black text-white 
                 rounded-t-[5rem] -mt-20"
    >
      <Container>
        {/* 3. Reemplaza el <div> y <h2> por esto: */}
        <SectionTitleWithVideo
          line1Text="Artículos"
          line2Text={<span className="italic">destacados</span>} // Pasamos JSX
          videoPoster={videoPoster}
          videoWebM={videoWebM}
          videoMp4={videoMp4}
          className="mb-16 md:mb-24" // Pasa el margen
          fontWeight="font-light" // Especificamos el font-light
        />

        {/* Contenedor del Slider (para posicionar las flechas) */}
        <div className="relative">
          
          {/* Botones de Navegación (fuera del Swiper) */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden md:block z-10">
            <button
              ref={prevRef}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center
                         transition-colors hover:bg-white hover:text-black"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden md:block z-10">
            <button
              ref={nextRef}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center
                         transition-colors hover:bg-white hover:text-black"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* El Slider de Swiper */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            navigation={isMounted ? { // Solo asigna los refs si el componente está montado
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            } : false}
            loop={true}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="overflow-visible!" // Permite que los botones externos funcionen
          >
            {blogData.map((post) => (
              <SwiperSlide key={post.title}>
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Botón CTA (Secundario) */}
        <div className="text-center mt-24">
          <AnimatedButton
            href="/blog"
            text="Ver más Artículos"
            ariaLabel="Ver todos los artículos del blog"
            isSecondary={true} // <-- Estilo negro con texto blanco
          />
        </div>
      </Container>
    </section>
  );
};