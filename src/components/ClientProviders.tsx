'use client'; 

// Importaciones de React y Next
import { usePathname } from 'next/navigation';

// Importaciones de Componentes
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { CursorProvider } from '@/components/CursorContext';
import { GlobalScrollAnimations } from '@/components/GlobalScrollAnimations';

// Importaciones de Framer Motion
import { AnimatePresence, motion } from 'framer-motion'; 

// Importaciones de GSAP (para el refresh)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- 1. Definimos las variantes de animación para la CORTINA ---
const curtainVariants = {
  // Estado 'exit' (cuando la página se va)
  exit: {
    scaleY: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const // <-- Opcional: 'as const' puede ayudar
    }
  },
  // Estado 'animate' (cuando la página entra)
  animate: {
    scaleY: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const, // <-- Opcional: 'as const' puede ayudar
      delay: 0.2 
    }
  }
};

// --- 2. Definimos las variantes de animación para el CONTENIDO (fade) ---
const contentVariants = {
  exit: {
    opacity: 0,
    transition: { duration: 0.1 } 
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 } 
  }
};

export function ClientProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  gsap.registerPlugin(ScrollTrigger);

  return (
    <CursorProvider>
      <GlobalScrollAnimations />
      <Header />
      <FloatingContactButton />

      {/* 3. El AnimatePresence ahora controla todo */}
      <AnimatePresence 
        mode="wait"
        onExitComplete={() => {
          ScrollTrigger.refresh(); // Sigue refrescando GSAP después de la transición
        }}
      >
        {/* 4. Usamos 'key={pathname}' para que detecte el cambio de página */}
        <motion.div key={pathname}>

          {/* 5. EL CONTENIDO DE LA PÁGINA */}
          <motion.div
            variants={contentVariants}
            initial="exit" // Empieza invisible
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>

          {/* 6. LA CORTINA (origin-bottom) */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-screen w-full origin-bottom bg-white z-[9999]"
            variants={curtainVariants}
            initial="exit" // Empieza cubriendo la pantalla
            animate="animate"
            exit="exit"
          />
          {/* 7. LA CORTINA (origin-top, para el efecto "cierre") */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-screen w-full origin-top bg-white z-[9999]"
            variants={curtainVariants}
            initial="animate" // Empieza oculta
            animate="animate"
            exit="exit"
          />

        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </CursorProvider>
  );
}