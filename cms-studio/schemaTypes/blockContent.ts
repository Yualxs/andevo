import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  
  // Aquí definimos todos los "bloques" que puedes añadir:
  of: [
    // 1. El bloque de texto estándar (Párrafos, H2, etc.)
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    
    // 2. El bloque de Imagen (que ya teníamos)
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
    
    // --- ¡NUEVO! AÑADIDO PARA PDFS ---
    // 3. El bloque de Archivo (para subir PDFs)
    defineArrayMember({
      title: 'Subir PDF',
      name: 'pdfUpload',
      type: 'file',
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Descripción (texto del enlace)',
        },
      ],
    }),

    // --- ¡NUEVO! AÑADIDO PARA VIDEOS/EMBEDS ---
    // 4. El bloque de Código (para iframes, etc.)
    defineArrayMember({
      title: 'Embed HTML (Video, etc.)',
      name: 'htmlEmbed',
      type: 'code',
      options: {
        language: 'html', // Lo configuramos para HTML
      },
    }),
  ],
})