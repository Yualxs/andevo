// EN: cms-studio/schemaTypes/stickyListBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stickyListBlock',
  title: 'Bloque: Lista con Título Fijo',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
    }),
    defineField({
      name: 'stickyTitle',
      title: 'Título Fijo (H3)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenido (Viñetas)',
      type: 'blockContent', // Reutilizamos el editor de texto
    }),
    defineField({
      name: 'image',
      title: 'Imagen (Opcional)',
      type: 'image',
    }),
  ],
})