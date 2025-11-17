// EN: cms-studio/schemaTypes/index.ts
import blockContent from './blockContent'
import author from './author'
import post from './post'
import service from './service'

// Importa todos los "ladrillos"
import serviceHero from './serviceHero'
import videoBlock from './videoBlock'
import problemSolutionBlock from './problemSolutionBlock'
import andevoBlock from './andevoBlock'
import resultsBlock from './resultsBlock'
import processBlock from './processBlock'
import iconGridItem from './iconGridItem'
import logoCarouselBlock from './logoCarouselBlock'
import garantiaBlock from './garantiaBlock'
import faqBlock from './faqBlock'
import faqItem from './faqItem'

export const schemaTypes = [
  // --- ¡CORRECCIÓN AQUÍ! ---
  // 1. Carga todos los "Objetos" (ladrillos) PRIMERO
  blockContent,
  serviceHero,
  videoBlock,
  problemSolutionBlock,
  andevoBlock,
  resultsBlock,
  processBlock,
  iconGridItem,
  logoCarouselBlock,
  garantiaBlock,
  faqBlock,
  faqItem,

  // 2. Carga los "Documentos" (páginas) al FINAL
  post,
  author,
  service, 
]