// EN: cms-studio/schemaTypes/imageWithListBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageWithListBlock',
  title: 'Bloque: Imagen con Lista Fija',
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
})