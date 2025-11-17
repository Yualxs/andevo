// EN: src/app/services/_components/IconGridBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ElasticDivider } from '@/components/ElasticDivider';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.client';

export const IconGridBlock = ({ block }: { block: any }) => {
  return (
    <section className="bg-white text-black relative z-40 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
      <Container className="py-16 lg:py-32">
        
        <AnimateOnScroll className="mb-12 lg:mb-24 max-w-4xl">
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-medium"
            dangerouslySetInnerHTML={{ __html: block.mainTitle }}
          />
        </AnimateOnScroll>

        <div className="flex flex-col">
          {block.items?.map((item: any, index: number) => (
            <div key={item._key}>
              <ElasticDivider />
              <AnimateOnScroll delay={index * 0.1}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-12 lg:py-16">
                  {/* Col 1: Icono */}
                  <div className="w-16">
                    <Image
                      src={urlFor(item.icon).width(64).height(64).url()}
                      alt={item.title || 'Icono'}
                      width={64}
                      height={64}
                      className="rotating-image"
                    />
                  </div>
                  {/* Col 2: Título */}
                  <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-black">
                    {item.title}
                  </h3>
                  {/* Col 3: Descripción */}
                  <p className="text-lg text-black/70">
                    {item.description}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};