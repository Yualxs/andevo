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

// Interfaz de tipo (más robusta)
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

// Query para la PÁGINA DE LISTADO (/blog)
export const postsQuery = `
  *[_type == "post" && language == "es"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    category,
    "author": author->{name}
  }
`;

// Query para la PÁGINA INTERNA ([slug])
export const postQuery = `
  *[_type == "post" && slug.current == $slug && language == "es"][0] {
    _id,
    title,
    slug,
    mainImage,
    category,
    "author": author->{name, image},
    body,
    summary,
    _createdAt
  }
`;

// Query para POSTS RELACIONADOS
export const relatedPostsQuery = `
  *[_type == "post" && language == "es" && slug.current != $currentSlug && category == $category] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    category,
    "author": author->{name}
  }
`;

// --- ¡NUEVA QUERY AÑADIDA! ---
// Query para la SECCIÓN DE BLOG EN EL HOME
export const homePostsQuery = `
  *[_type == "post" && language == "es"] | order(_createdAt desc) [0...4] {
    _id,
    title,
    slug,
    mainImage,
    category
  }
`;