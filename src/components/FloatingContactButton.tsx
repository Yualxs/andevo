// EN: src/components/FloatingContactButton.tsx
import Link from 'next/link';

// URLs de los assets
const svgUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67e9cb93fb3dead64a38cf07_Contacto%20Video.svg";
const videoUrl = "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/67eb03964b635d0445072369_Video%20Contact%20Andevo-transcode.mp4";

export const FloatingContactButton = () => {
  return (
    <Link 
      href="/contacto" 
      // Este es el tamaño corregido
      className="fixed bottom-8 right-8 z-40 w-36 h-36 rounded-full overflow-hidden group hidden md:block"
      aria-label="Ir a contacto"
    >
      {/* SVG Giratorio (fondo) */}
      <img 
        src={svgUrl} 
        alt="Contacto" 
        className="absolute inset-0 w-full h-full rotating-image"
      />
      {/* Video (centro) */}
      <div className="absolute inset-[12%] w-[76%] h-[76%] rounded-full overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-125"
        />
      </div>
    </Link>
  );
};