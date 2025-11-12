// EN: src/components/ClientProviders.tsx
'use client'; 

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { CursorProvider } from '@/components/CursorContext';
import { GlobalScrollAnimations } from '@/components/GlobalScrollAnimations';
import { AnimatePresence, motion } from 'framer-motion'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- (Las 'variants' de la cortina y el contenido siguen aquí) ---
const curtainVariants = {
  exit: { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }},
  animate: { scaleY: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
};
const contentVariants = {
  exit: { opacity: 0, transition: { duration: 0.1 } },
  animate: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
};

export function ClientProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  gsap.registerPlugin(ScrollTrigger);

  // --- LÓGICA DE RECAPTCHA ELIMINADA DE AQUÍ ---

  return (
    // --- 'GoogleReCaptchaProvider' ELIMINADO ---
    <CursorProvider>
      <GlobalScrollAnimations />
      <Header />
      <FloatingContactButton />

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => {
          ScrollTrigger.refresh();
        }}
      >
        <motion.div key={pathname}>
          
          <motion.div
            variants={contentVariants}
            initial="exit"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>

          {/* ... (tus motion.div de la cortina) ... */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-screen w-full origin-bottom bg-white z-[9999]"
            variants={curtainVariants}
            initial="exit"
            animate="animate"
            exit="exit"
          />
          <motion.div
            className="fixed top-0 left-0 right-0 h-screen w-full origin-top bg-white z-[9999]"
            variants={curtainVariants}
            initial="animate"
            animate="animate"
            exit="exit"
          />

        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </CursorProvider>
  );
}