import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "mouse-follower/dist/mouse-follower.min.css";

// 1. Importa el NUEVO componente proveedor
import { ClientProviders } from "@/components/ClientProviders";

const montFont = localFont({
  src: [
    {
      path: '../assets/fonts/Mont-Regular.woff2', 
      weight: '400', // Regular
      style: 'normal',
    },
    {
      path: '../assets/fonts/Mont-RegularItalic.woff2',
      weight: '400', // Regular
      style: 'italic',
    },
    {
      path: '../assets/fonts/Mont-SemiBold.woff2',
      weight: '600', // SemiBold
      style: 'normal',
    },
    {
      path: '../assets/fonts/Mont-SemiBoldItalic.woff2',
      weight: '600', // SemiBold
      style: 'italic',
    },
  ],
  display: 'swap',
});

// 2. Ahora 'metadata' funcionará porque este es un Componente de Servidor
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
      <body className={montFont.className}>
        {/* 3. Envuelve {children} con el proveedor de cliente */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}