// EN: src/app/services/_components/GarantiaBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { PortableTextComponent } from '@/app/blog/_components/PortableTextComponent';

export const GarantiaBlock = ({ block }: { block: any }) => {
  return (
    <section className="bg-white text-black relative z-70 rounded-t-[3rem] -mt-12 lg:rounded-t-[5grem] lg:-mt-20">
      <Container className="py-16 lg:py-32">
        
        <AnimateOnScroll className="mb-12 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-4xl">
            {block.mainTitle}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          <div className="md:col-span-1">
            <AnimateOnScroll className="sticky top-28">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wider text-black">
                {block.stickyTitle}
              </h3>
            </AnimateOnScroll>
          </div>
          <div className="md:col-span-2">
            <AnimateOnScroll delay={0.1}>
              <div className="prose prose-lg prose-p:text-lg prose-p:leading-relaxed prose-p:text-black/80 prose-li:text-lg prose-li:text-black/80">
                <PortableTextComponent value={block.content} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
};