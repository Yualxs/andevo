// EN: cms-studio/schemaTypes/faqItem.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqItem',
  title: 'Pregunta Frecuente (Item)',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'question', title: 'Pregunta', type: 'string'}),
    defineField({name: 'answer', title: 'Respuesta', type: 'text', rows: 4}),
  ],
})