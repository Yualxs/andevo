// EN: src/lib/sanity.client.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'g03oumwp', 
  dataset: 'production', 
  apiVersion: '2024-05-01', 
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}

// --- Interfaz del Blog (sin cambios) ---
export interface BlogPost {
  _id: string;
  title?: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category?: string;
  author?: {
    name?: string;
    image?: any; 
  };
  body?: any[]; 
  summary?: string;
  _createdAt?: string;
}

// --- Queries del Blog (sin cambios) ---
export const postsQuery = `
  *[_type == "post" && language == "es"] | order(_createdAt desc) {
    _id, title, slug, mainImage, category, "author": author->{name}
  }
`;
export const postQuery = `
  *[_type == "post" && slug.current == $slug && language == "es"][0] {
    _id, title, slug, mainImage, category, "author": author->{name, image}, body, summary, _createdAt
  }
`;
export const relatedPostsQuery = `
  *[_type == "post" && language == "es" && slug.current != $currentSlug && category == $category] | order(_createdAt desc) [0...3] {
    _id, title, slug, mainImage, category, "author": author->{name}
  }
`;
export const homePostsQuery = `
  *[_type == "post" && language == "es"] | order(_createdAt desc) [0...4] {
    _id, title, slug, mainImage, category
  }
`;

// --- Interfaz para la Tarjeta de Servicio (sin cambios) ---
export interface ServiceCard {
  _id: string;
  title?: string;
  description?: string; 
  slug: {
    current: string;
  };
  category?: 'general' | 'cusco';
}

// --- Query para la Página de /services (sin cambios) ---
export const servicesQuery = `
  *[_type == "service" && language == "es"] | order(title asc) {
    _id, title, "description": seoDescription, slug, category
  }
`;

// --- Interfaz para la Página de Servicio (sin cambios) ---
export interface ServicePageData {
  _id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: any;
  noIndex?: boolean;
  pageBuilder?: any[];
}

// --- ¡QUERY CORREGIDA Y COMPLETA! ---
// Query para la PÁGINA DE SERVICIO INDIVIDUAL ([slug])
export const servicePageQuery = `
  *[_type == "service" && slug.current == $slug && language == "es"][0] {
    _id,
    title,
    seoTitle,
    seoDescription,
    ogImage,
    noIndex,
    
    // Esto "expande" el Page Builder y obtiene todos los datos anidados
    pageBuilder[] {
      _key,
      _type,
      
      // Expande 'resultsBlock' (el antiguo iconGridBlock)
      _type == "resultsBlock" => { 
        ...,
        items[] {
          _key, title, description, icon
        }
      },

      // Expande 'processBlock' (el otro iconGridBlock)
      _type == "processBlock" => { 
        ...,
        items[] {
          _key, title, description, icon
        }
      },
      
      // Expande 'logoCarouselBlock'
      _type == "logoCarouselBlock" => {
        ...,
        slides[] {
          _key, mainImage, clientLogo
        }
      },
      
      // Expande 'faqBlock'
      _type == "faqBlock" => {
        ...,
        faqs[] {
          _key, question, answer
        }
      },

      // ¡LA LÍNEA QUE FALTABA!
      // Para todos los demás bloques (Hero, Video, Garantia, etc.)
      // que no tienen referencias anidadas, 
      // simplemente trae todos sus datos.
      ... 
    }
  }
`;