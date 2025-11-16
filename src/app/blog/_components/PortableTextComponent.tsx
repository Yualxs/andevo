// EN: src/app/blog/_components/PortableTextComponent.tsx
import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.client';
import Image from 'next/image';

// Este componente define cómo se renderiza cada tipo de bloque
export const PortableTextComponent = ({ value }: { value: any[] }) => {
  
  const components = {
    // Definimos cómo renderizar los "tipos" de bloques
    types: {
      
      // 1. Cómo renderizar imágenes (type: 'image')
      image: ({ value }: { value: any }) => (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Imagen del artículo'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
      ),

      // 2. Cómo renderizar PDFs (type: 'file')
      pdfUpload: ({ value }: { value: any }) => {
        // NOTA: Sanity no nos da la URL del archivo directamente
        // Necesitamos construirla: https://cdn.sanity.io/files/PROJECTID/DATASET/FILEID.pdf
        const fileUrl = `https://cdn.sanity.io/files/g03oumwp/production/${value.asset._ref.replace('file-', '')}.pdf`;
        return (
          <div className="my-8">
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline"
            >
              {value.description || 'Descargar PDF'}
            </a>
          </div>
        );
      },

      // 3. Cómo renderizar embeds (type: 'code')
      htmlEmbed: ({ value }: { value: any }) => (
        <div 
          className="my-8 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: value.code }}
        />
      ),
    },

    // Definimos cómo renderizar los "bloques" de texto estándar
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-semibold mt-12 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-xl md:text-2xl font-semibold mt-8 mb-4">{children}</h4>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-black/20 pl-4 italic text-black/80 my-8">
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => <p className="text-lg text-black/80 leading-relaxed mb-6">{children}</p>,
    },
    
    // Definimos cómo renderizar las listas
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-outside pl-8 my-6 space-y-2">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="text-lg text-black/80 leading-relaxed">{children}</li>,
    },
    
    // Definimos cómo renderizar los "marks" (links)
    marks: {
      link: ({ children, value }: any) => (
        <a 
          href={value.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      ),
    },
  };

  return <PortableText value={value} components={components} />;
};