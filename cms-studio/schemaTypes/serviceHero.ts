// EN: cms-studio/schemaTypes/serviceHero.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'serviceHero',
  title: 'Bloque: Hero de Servicio',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre-título (H5)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título (H1)',
      type: 'string',
      description: 'Usa <span></span> para itálicas si es necesario.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo (H2)',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Botón CTA',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Hero de Servicio'
      }
    }
  }
})