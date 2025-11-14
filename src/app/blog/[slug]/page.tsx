// EN: src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { 
  sanityClient, 
  urlFor, 
  BlogPost, 
  postQuery,
  relatedPostsQuery
} from '@/lib/sanity.client';

import { PortableTextComponent } from '../_components/PortableTextComponent';
import { BlogCard } from '@/components/BlogCard';

async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch(postQuery, { slug: slug });
  return post;
}

async function getRelatedPosts(currentSlug: string, category: string): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(relatedPostsQuery, { 
    currentSlug: currentSlug, 
    category: category 
  });
  return posts;
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const post = await getPost(params.slug); 
  
  if (!post) {
    return { title: 'No encontrado' };
  }
  return {
    title: `${post.title || 'Artículo'} | Andevo Blog`,
    description: post.summary || 'Un artículo del blog de Andevo',
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound(); 
  }

  const postCategory = post.category || 'general';
  const postSlug = post.slug?.current || '';
  const postTitle = post.title || 'Artículo sin título';
  const postAuthorName = post.author?.name || 'Autor Desconocido';

  const relatedPosts = await getRelatedPosts(postSlug, postCategory);

  const postDate = post._createdAt 
    ? new Date(post._createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) 
    : '';

  return (
    <main className="bg-white text-black">
      
      {/* 1. Hero del Artículo (¡ACTUALIZADO!) */}
      <section className="
        relative 
        pt-48 pb-32 lg:pt-60 lg:pb-44 
        bg-black text-white 
        overflow-hidden
      ">
        {/* Capa de gradiente que se mezcla con el contenido */}
        <div className="
          absolute bottom-0 left-0 right-0 h-1/2 
          bg-gradient-to-t from-white to-transparent 
          z-10
        "/>

        {/* Imagen principal integrada en el hero como fondo parcial */}
        <div className="
          absolute inset-0 w-full h-full
          z-0
        ">
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={postTitle}
            fill
            priority
            className="object-cover object-center opacity-30" // Oscurecer y centrar
            sizes="100vw"
          />
        </div>

        {/* Contenido del hero (título, fecha, autor) */}
        <Container className="max-w-3xl text-center relative z-20"> {/* z-index para que esté sobre la imagen */}
          <StaggeredEntryAnimation>
            <div className="mb-16 flex items-center justify-center text-base text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              {/* ¡ESTE ES EL ENLACE CORRECTO! */}
              <Link href="/blog" className="hover:text-white">Blog</Link> 
              <ChevronRight size={16} className="mx-1" />
              <span className="text-white truncate max-w-xs">{postTitle}</span>
            </div>
            {postDate && <div className="text-base text-white/80 mb-4">{postDate}</div>}
            <h1 className="text-4xl md:text-6xl font-medium">{postTitle}</h1>
            {post.author && (
              <div className="flex items-center justify-center gap-4 mt-8">
                {post.author.image && (
                  <Image 
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={postAuthorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="text-lg font-medium">{postAuthorName}</span>
              </div>
            )}
          </StaggeredEntryAnimation>
        </Container>
      </section>
      
      {/* (La sección de Imagen Principal original se ELIMINA, ya está en el Hero) */}

      {/* 3. Contenido (Rich Text) */}
      <section className="py-24 lg:py-32 bg-white"> {/* Aseguramos fondo blanco para el texto */}
        <Container className="max-w-3xl">
          {post.body ? (
            <PortableTextComponent value={post.body} />
          ) : (
            <p className="text-center text-lg">Este artículo no tiene contenido.</p>
          )}
        </Container>
      </section>

      {/* 4. CTA (Limpio) */}
      <section className="py-24 lg:py-32 bg-gray-50 rounded-t-[5rem] -mt-20">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Lleva a tu agencia turística al siguiente nivel
          </h2>
          <p className="text-lg text-black/70 mb-8">
            Conéctate con los turistas estadounidenses y aumenta tus reservas.
          </p>
          <AnimatedButton
            href="/contact"
            text="Quiero atraer más turistas"
            ariaLabel="Contactar a Andevo"
          />
        </Container>
      </section>

      {/* 5. Artículos Relacionados */}
      {relatedPosts.length > 0 && (
        <section className="py-24 lg:py-32 bg-white">
          <Container>
            <h2 className="text-5xl md:text-7xl font-medium mb-16">
              <span className="italic">Artículos</span><br/>relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost._id} post={relatedPost} index={index} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}