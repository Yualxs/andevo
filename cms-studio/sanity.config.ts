// EN: cms-studio/sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes' 

// 1. Importa el plugin de internacionalización (el correcto)
import {documentInternationalization} from '@sanity/document-internationalization'

// 2. Importa el plugin de código (el correcto)
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Andevo Website',

  projectId: 'g03oumwp', // (Esto está correcto)
  dataset: 'production', // (Esto está correcto)

  plugins: [
    structureTool(), 
    visionTool(), 
    
    // 3. Añade el plugin de internacionalización
    documentInternationalization({
      supportedLanguages: [
        {id: 'es', title: 'Español'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['post'], // Tipos que se pueden traducir
    }),
    
    // 4. Añade el plugin de código
    codeInput(),
  ],

  schema: {
    types: schemaTypes, 
  },
})