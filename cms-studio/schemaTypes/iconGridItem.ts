// EN: cms-studio/schemaTypes/iconGridItem.ts
import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export default defineType({
  name: 'iconGridItem',
  title: 'Item de Grid (Icono)',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icono (Símbolo Andevo)',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
  ],
})