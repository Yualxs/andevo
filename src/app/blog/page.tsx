// EN: src/app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { sanityClient, BlogPost } from '@/lib/sanity.client'; // Importamos el cliente
import { BlogTabs } from './_components/BlogTabs'; // Importamos el componente de cliente

export const metadata: Metadata = {
  title: 'Blog | Andevo',
  description: 'Somos una agencia digital creativa en potencia',
};

// --- 1. Esta es la Consulta de Sanity (GROQ) ---
// Le pedimos todos los posts, en español, y traemos los datos que necesitamos
const postsQuery = `
  *[_type == "post" && language == "es"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    category,
    author->{
      name
    }
  }
`;

// 2. Función de Servidor para buscar los datos
async function getPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(postsQuery);
  return posts;
}

// 3. La Página (Async Server Component)
export default async function BlogPage() {
  // 4. Buscamos los datos cuando la página se construye
  const posts = await getPosts();

  return (
    <main className="bg-white text-black">
      
      {/* 1. Sección Hero (Replicada del HTML) */}
      <div className="pt-48 pb-32 lg:pt-60 lg:pb-44">
        <Container>
          <StaggeredEntryAnimation>
            {/* Breadcrumbs */}
            <div className="mb-16 flex items-center text-base text-black/70">
              <Link href="/" className="hover:text-black">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-black">Blog</span>
            </div>
            
            {/* Títulos */}
            <div className="max-w-4xl">
              <p className="text-lg sm:text-xl md:text-2xl mb-4">
                Nuestro Blog 😎️
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium">
                Somos una <span className="italic">agencia digital creativa</span> en potencia
              </h1>
            </div>
          </StaggeredEntryAnimation>
        </Container>
      </div>

      {/* 2. Sección de Pestañas y Artículos */}
      <section className="pb-36 lg:pb-52">
        <Container>
          {/* Le pasamos los posts (del servidor) al componente (del cliente) */}
          <BlogTabs posts={posts} />
        </Container>
      </section>

    </main>
  );
}