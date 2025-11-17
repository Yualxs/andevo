// EN: cms-studio/schemaTypes/garantiaBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'garantiaBlock',
  title: 'Bloque: Garantía Andevo',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
      description: 'Ej. "Invierte con tranquilidad: Garantía Andevo"',
    }),
    defineField({
      name: 'stickyTitle',
      title: 'Subtítulo Fijo (H3)',
      type: 'string',
      description: 'Ej. "Confiamos en nuestro proceso y lo respaldamos..."',
    }),
    defineField({
      name: 'content',
      title: 'Contenido (Viñetas de la garantía)',
      type: 'blockContent', // Reutilizamos el editor de texto
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Garantía Andevo'
      }
    }
  }
})