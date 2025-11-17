// EN: cms-studio/schemaTypes/processBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'processBlock', // <-- 1. NOMBRE NUEVO
  title: 'Bloque: Proceso', // <-- 2. TÍTULO NUEVO
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
      description: 'Ej. "Nuestro proceso"',
    }),
    defineField({
      name: 'items',
      title: 'Pasos del Proceso',
      type: 'array',
      of: [{type: 'iconGridItem'}], // <-- Reutiliza el mismo "ladrillo"
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Proceso'
      }
    }
  }
})