import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es">
      <body className={inter.className}>
        <Header />
        
        {/* Contenido principal de la página */}
        {children}

        {/* --- 2. AÑADE EL FOOTER AQUÍ --- */}
        <Footer />

        {/* --- 2. AÑADE EL BOTÓN DE CONTACTO PEGAJOSO --- */}
        <Link 
          href="/contacto" 
          className="fixed bottom-8 right-8 z-40 w-20 h-20 rounded-full overflow-hidden group hidden md:block"
          aria-label="Ir a contacto"
        >
          {/* SVG Giratorio (fondo) */}
          <img 
            src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e9cb93fb3dead64a38cf07_Contacto%20Video.svg" 
            alt="Contacto" 
            className="absolute inset-0 w-full h-full rotating-image"
          />
          {/* Video (centro) */}
          <div className="absolute inset-[10%] w-[80%] h-[80%] rounded-full overflow-hidden">
            <video
              src="https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb03964b635d0445072369_Video%20Contact%20Andevo-transcode.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-150"
            />
          </div>
        </Link>
        {/* --- FIN DEL BOTÓN --- */}
        
      </body>
    </html>
  );
}