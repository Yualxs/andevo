// EN: cms-studio/schemaTypes/service.ts
import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  icon: DocumentTextIcon,
  // Pestañas para organizar el editor
  groups: [
    {name: 'card', title: 'Tarjeta (Home/Listados)', default: true},
    {name: 'page', title: 'Contenido de la Página'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Pestaña: Tarjeta ---
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      group: 'card',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Solución General', value: 'general'},
          {title: 'Solución en Cusco', value: 'cusco'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'card',
    }),
    defineField({
      name: 'title',
      title: 'Título del Servicio (ej. Marketing Digital)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'card',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo (ej. Estrategia y Creatividad)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'card',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
      group: 'card',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal (Poster)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      group: 'card',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del Video (Hover)',
      description: '(Opcional) Pega la URL del video de la tarjeta (MP4/WebM).',
      type: 'string',
      group: 'card',
    }),

    // --- Pestaña: Contenido de la Página ---
    defineField({
      name: 'pageBuilder',
      title: 'Constructor de la Página',
      type: 'array',
      group: 'page',
      of: [
        // Aquí referenciamos todos los bloques que construiremos
        {type: 'serviceHero'},
        {type: 'videoBlock'},
        {type: 'problemSolutionBlock'},
        {type: 'andevoBlock'},
        {type: 'resultsBlock'},
        {type: 'processBlock'},
        {type: 'logoCarouselBlock'},
        {type: 'garantiaBlock'},
        {type: 'faqBlock'},
      ],
    }),
    
    // --- Pestaña: SEO (¡ACTUALIZADA!) ---
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (Title Tag)',
      type: 'string',
      description: 'El título que se muestra en Google. (Recomendado: 50-60 caracteres)',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      type: 'text',
      rows: 3,
      description: 'La descripción que se muestra en Google. (Recomendado: 150-160 caracteres)',
      group: 'seo',
    }),

    // --- ¡NUEVO! Campo de Título para Redes Sociales ---
    defineField({
      name: 'ogTitle',
      title: 'Título para Redes Sociales (Open Graph)',
      type: 'string',
      description: '(Opcional) Si está vacío, usará el "Título SEO" de arriba.',
      group: 'seo',
    }),

    // --- ¡NUEVO! Campo de Descripción para Redes Sociales ---
    defineField({
      name: 'ogDescription',
      title: 'Descripción para Redes Sociales (Open Graph)',
      type: 'text',
      rows: 3,
      description: '(Opcional) Si está vacío, usará la "Descripción SEO" de arriba.',
      group: 'seo',
    }),

    // --- ¡NUEVO! Campo de Imagen para Redes Sociales ---
    defineField({
      name: 'ogImage',
      title: 'Imagen para Redes Sociales (Open Graph)',
      type: 'image',
      description: 'La imagen que se muestra al compartir en WhatsApp, Facebook, etc. (Recomendado: 1200x630px)',
      options: {hotspot: true},
      // Lo hacemos requerido porque es vital para el branding en redes
      validation: (Rule) => Rule.required(), 
      group: 'seo',
    }),

    // --- ¡NUEVO! Campo de Control de Rastreo ---
    defineField({
      name: 'noIndex',
      title: 'Ocultar esta página de Google (no-index)',
      type: 'boolean',
      description: 'Activa esto (ON) si NO quieres que esta página aparezca en los resultados de Google.',
      initialValue: false,
      group: 'seo',
    }),
  ],
  
  // --- Preview (sin cambios) ---
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mainImage',
    },
    prepare({title, subtitle, media}) {
      return {title, subtitle, media}
    },
  },
})