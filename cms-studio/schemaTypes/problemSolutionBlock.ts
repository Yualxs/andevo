// EN: cms-studio/schemaTypes/problemSolutionBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'problemSolutionBlock',
  title: 'Bloque: Problema y Solución',
  type: 'object',
  fields: [
    // --- 1. Parte "Problema" ---
    defineField({
      name: 'problemTitle',
      title: 'Título del Problema (H2)',
      type: 'string',
      description: 'Ej. "¿Tu producto se confunde en un mar de competidores?"',
    }),
    defineField({
      name: 'problemStickyTitle',
      title: 'Subtítulo Fijo del Problema (H3)',
      type: 'string',
      description: 'Ej. "Un logo bonito no basta para escalar..."',
    }),
    defineField({
      name: 'problemContent',
      title: 'Contenido/Viñetas del Problema',
      type: 'blockContent', // Reutilizamos el editor de texto
    }),

    // --- 2. Parte "Imagen Central" ---
    defineField({
      name: 'centerImage',
      title: 'Imagen Central',
      type: 'image',
    }),

    // --- 3. Parte "Solución" ---
    defineField({
      name: 'solutionTitle',
      title: 'Título de la Solución (H2)',
      type: 'string',
      description: 'Ej. "Convierte tu identidad visual en ventaja competitiva"',
    }),
    defineField({
      name: 'solutionStickyTitle',
      title: 'Subtítulo Fijo de la Solución (H3)',
      type: 'string',
      description: 'Ej. "Cuatro etapas que aceleran tu crecimiento..."',
    }),
    defineField({
      name: 'solutionContent',
      title: 'Contenido/Viñetas de la Solución',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Problema y Solución'
      }
    }
  }
})