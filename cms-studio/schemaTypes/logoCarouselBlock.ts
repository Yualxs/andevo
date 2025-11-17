// EN: cms-studio/schemaTypes/logoCarouselBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'logoCarouselBlock',
  title: 'Bloque: Carrusel de Casos de Éxito',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Título Principal (H2)',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineField({
          name: 'slide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({name: 'mainImage', title: 'Imagen de Fondo', type: 'image'}),
            defineField({name: 'clientLogo', title: 'Logo del Cliente', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloque: Carrusel de Casos de Éxito'
      }
    }
  }
})