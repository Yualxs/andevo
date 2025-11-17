// EN: cms-studio/schemaTypes/resultsBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resultsBlock', // <-- 1. NOMBRE ACTUALIZADO
  title: 'Bloque: Resultados esperados', // <-- 2. TÍTULO ACTUALIZADO
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
      description: 'Ej. "Resultados que puedes esperar"',
    }),
    defineField({
      name: 'items',
      title: 'Items de Resultados',
      type: 'array',
      of: [{type: 'iconGridItem'}], // <-- Sigue usando el mismo "ladrillo"
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Resultados esperados'
      }
    }
  }
})