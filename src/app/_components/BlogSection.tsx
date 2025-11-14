// EN: src/components/BlogSection.tsx
'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/Container';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTitleWithVideo } from '@/components/SectionTitleWithVideo';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

// --- 1. IMPORTAR TIPOS DE SANITY ---
import { BlogPost } from '@/lib/sanity.client'; 
// --- 2. ¡IMPORTAR EL COMPONENTE BlogCard! ---
import { BlogCard } from '@/components/BlogCard';

// --- 3. ELIMINAR `blogData` y la definición de `BlogCard` interna ---

// URLs del video del título (sin cambios)
const videoPoster = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/683f70cff057f3c927e658ec_Andevo%20Video%20Title%2003.webp";
const videoWebM = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683f7b82f9805d31ef82b4ed_Andevo%20Video%20Title%2003-transcode.webm";
const videoMp4 = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd%2F683bad80f14bc69995d3aa3b_Andevo%20Video%20Title%2003-transcode.mp4";


// --- 4. ACTUALIZAR COMPONENTE PRINCIPAL: BlogSection ---
export const BlogSection = ({ posts }: { posts: BlogPost[] }) => {
  // ... (El código de refs de Swiper no cambia) ...
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted && swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, [isMounted]);

  return (
    <section 
      className="relative z-60 pt-16 pb-36 lg:pt-32 lg:pb-52 bg-black text-white 
                 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20"
    >
      <Container>
        {/* Título (sin cambios) */}
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <SectionTitleWithVideo
            line1Text="Artículos"
            line2Text={<span className="italic">destacados</span>} 
            videoPoster={videoPoster}
            videoWebM={videoWebM}
            videoMp4={videoMp4}
            fontWeight="font-light" 
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="relative">
            
            {/* Botones de Navegación (sin cambios) */}
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

            {/* --- 5. ACTUALIZAR SLIDER --- */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={isMounted ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              } : false}
              loop={true}
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
              }}
              className="overflow-visible!"
            >
              {/* Mapea sobre los 'posts' de las props */}
              {posts.map((post, index) => (
                <SwiperSlide key={post._id}>
                  {/* ¡AQUÍ ESTÁ LA CORRECCIÓN! */}
                  <BlogCard 
                    post={post} 
                    index={index} 
                    textColor="text-white" // <-- Pasa la prop de color
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimateOnScroll>
        
        {/* Botón CTA (sin cambios) */}
        <AnimateOnScroll className="text-center mt-24" delay={0.2}>
          <AnimatedButton
            href="/blog"
            text="Ver más Artículos"
            ariaLabel="Ver todos los artículos del blog"
            isSecondary={true}
          />
        </AnimateOnScroll>
      </Container>
    </section>
  );
};