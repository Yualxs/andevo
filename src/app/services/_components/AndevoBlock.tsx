// EN: src/app/services/_components/AndevoBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { PortableTextComponent } from '@/app/blog/_components/PortableTextComponent';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.client';

export const AndevoBlock = ({ block }: { block: any }) => {
  return (
    <section className="bg-black text-white relative z-30 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
      <Container className="py-16 lg:py-32">
        
        <AnimateOnScroll className="mb-12 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-4xl">
            {block.mainTitle}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          <div className="md:col-span-1">
            <AnimateOnScroll className="sticky top-28">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                <Image
                  src={urlFor(block.stickyImage).url()}
                  alt={block.mainTitle || 'Imagen de sección'}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
          <div className="md:col-span-2">
            <AnimateOnScroll delay={0.1}>
              <div className="prose prose-lg prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-white prose-li:text-lg prose-li:text-white">
                <PortableTextComponent value={block.content} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
};