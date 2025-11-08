import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "mouse-follower/dist/mouse-follower.min.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { CursorProvider } from '@/components/CursorContext';

const matterFont = localFont({
  src: [
    {
      // Asumo que están en src/assets/fonts/ como te sugerí
      path: '../assets/fonts/Matter-Regular.woff2', 
      weight: '400', // '400' es el peso para 'Regular'
      style: 'normal',
    },
    {
      path: '../assets/fonts/Matter-Medium.woff2',
      weight: '500', // '500' es el peso para 'Medium'
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Andevo - Agencia de Marketing Digital",
  description: "Replicado con Next.js y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={matterFont.className}>
        <CursorProvider>
        <Header />
        
        {/* Contenido principal de la página */}
        {children}

        {/* --- 2. AÑADE EL FOOTER AQUÍ --- */}
        <Footer />

        <FloatingContactButton />
        </CursorProvider>
      </body>
    </html>
  );
}