// EN: cms-studio/schemaTypes/faqBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqBlock',
  title: 'Bloque: FAQ Específico',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título (H2)',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'Lista de Preguntas',
      type: 'array',
      of: [{type: 'faqItem'}], // Referencia al item de FAQ
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: FAQ Específico'
      }
    }
  }
})