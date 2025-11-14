// EN: src/app/blog/_components/BlogCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, urlFor } from '@/lib/sanity.client'; 
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  return (
    <AnimateOnScroll delay={0.1 * index}>
      <Link href={`/blog/${post.slug.current}`} className="block group">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(800).height(450).url()}
            // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
            alt={post.title || 'Artículo de blog'} 
            fill
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 w-full h-full bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-medium text-black line-clamp-2">
            {post.title || 'Artículo sin título'}
          </h3>
          <div className="text-base text-black/60 capitalize mt-1">
            {post.category || 'General'}
          </div>
        </div>
      </Link>
    </AnimateOnScroll>
  );
};