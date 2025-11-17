// EN: src/app/services/_components/ServiceBlockRenderer.tsx
'use client';

// Importa todos los componentes de bloque que vamos a crear
import { ServiceHeroBlock } from './ServiceHeroBlock';
import { VideoBlock } from './VideoBlock';
import { ProblemSolutionBlock } from './ProblemSolutionBlock';
import { AndevoBlock } from './AndevoBlock';
import { ResultsBlock } from './ResultsBlock';
import { ProcessBlock } from './ProcessBlock';
import { LogoCarouselBlock } from './LogoCarouselBlock';
import { GarantiaBlock } from './GarantiaBlock';
import { FaqBlock } from './FaqBlock';

export const ServiceBlockRenderer = ({ blocks }: { blocks: any[] }) => {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'serviceHero':
            return <ServiceHeroBlock key={block._key} block={block} />;
          case 'videoBlock':
            return <VideoBlock key={block._key} block={block} />;
          case 'problemSolutionBlock':
            return <ProblemSolutionBlock key={block._key} block={block} />;
          case 'andevoBlock':
            return <AndevoBlock key={block._key} block={block} />;
          case 'resultsBlock':
            return <ResultsBlock key={block._key} block={block} />;
          case 'processBlock':
            return <ProcessBlock key={block._key} block={block} />;
          case 'logoCarouselBlock':
            return <LogoCarouselBlock key={block._key} block={block} />;
          case 'garantiaBlock':
            return <GarantiaBlock key={block._key} block={block} />;
          case 'faqBlock':
            return <FaqBlock key={block._key} block={block} />;
          default:
            console.warn(`Tipo de bloque no reconocido: ${block._type}`);
            return null;
        }
      })}
    </>
  );
};