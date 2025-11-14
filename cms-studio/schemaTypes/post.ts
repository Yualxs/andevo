// EN: cms-studio/schemaTypes/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // --- 1. ¡CAMPO NUEVO AÑADIDO! ---
    // Este campo es requerido por el plugin
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true, // Lo hacemos de solo lectura, el plugin lo gestionará
      hidden: true,   // Lo ocultamos (el plugin pone su propio selector)
    }),
    // --- FIN DEL CAMPO NUEVO ---
    defineField({
      name: 'title',
      title: 'Name', 
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal', 
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // ... (El resto de tus campos: category, author, summary, body... 
    // ... no necesitan cambiar) ...
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Marketing', value: 'marketing'},
          {title: 'Branding', value: 'branding'},
          {title: 'Desarrollo Web', value: 'web'},
          {title: 'SEO', value: 'seo'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor', 
      type: 'reference', 
      to: {type: 'author'}, 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen', 
      type: 'text', 
    }),
    defineField({
      name: 'body',
      title: 'Contenido', 
      type: 'blockContent', 
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})