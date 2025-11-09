import Image from 'next/image';

interface LogoItemProps {
  imgWhite: string;
  imgColor: string;
  alt: string;
}

// Este es el sub-componente que estaba dentro de CustomerLogos.tsx
export const LogoItem = ({ imgWhite, imgColor, alt }: LogoItemProps) => {
  return (
    // 'group' nos permite controlar el hover de los hijos
    <div className="relative group flex items-center justify-center h-16 md:h-20">
      
      {/* 1. Logo Blanco (visible por defecto) */}
      <Image
        src={imgWhite}
        alt={alt}
        fill
        className="object-contain
                   transition-opacity duration-300 ease-in-out
                   group-hover:opacity-0"
        sizes="(max-width: 768px) 50vw, 16.6vw"
      />
      
      {/* 2. Logo de Color (oculto por defecto) */}
      <Image
        src={imgColor}
        alt={alt}
        fill
        className="object-contain
                   opacity-0 transition-opacity duration-300 ease-in-out
                   group-hover:opacity-100"
        sizes="(max-width: 768px) 50vw, 16.6vw"
      />
    </div>
  );
};