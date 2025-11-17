// EN: src/app/services/_components/FaqBlock.tsx
'use client';
import { Container } from '@/components/Container';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FaqItem } from '@/app/_components/FaqItem'; // <-- Reutilizamos el FaqItem de la Home
import { useState } from 'react';

export const FaqBlock = ({ block }: { block: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="bg-black text-white relative z-75 rounded-t-[3rem] -mt-12 lg:rounded-t-[5rem] lg:-mt-20">
      <Container className="py-16 lg:py-32">
        
        <AnimateOnScroll className="mb-12 lg:mb-16">
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-medium max-w-4xl"
            dangerouslySetInnerHTML={{ __html: block.mainTitle }}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1} className="flex flex-col gap-4">
          {block.faqs?.map((faq: any, index: number) => (
            <FaqItem 
              key={faq._key}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              variant="dark"
            />
          ))}
        </AnimateOnScroll>
      </Container>
    </section>
  );
};