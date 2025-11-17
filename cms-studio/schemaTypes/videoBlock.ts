// EN: cms-studio/schemaTypes/videoBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Bloque: Video (Vimeo)',
  type: 'object',
  fields: [
    defineField({
      name: 'vimeoId',
      title: 'ID del Video de Vimeo',
      type: 'string',
      description: 'Pega solo el ID (ej. 1070433072)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Video (Vimeo)'
      }
    }
  }
})