// EN: cms-studio/schemaTypes/andevoBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'andevoBlock',
  title: 'Bloque: Por qué Andevo',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
    }),
    defineField({
      name: 'stickyImage',
      title: 'Imagen Fija',
      type: 'image',
    }),
    defineField({
      name: 'content',
      title: 'Contenido (Viñetas)',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Por qué Andevo'
      }
    }
  }
})