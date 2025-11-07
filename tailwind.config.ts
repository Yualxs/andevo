import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // --- PERSONALIZACIÓN DE ANDEVO ---
      transitionTimingFunction: {
        'quint': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      skew: {
        '7': '7deg',
      }
      // --- FIN DE LA PERSONALIZACIÓN ---
    },
  },
  plugins: [],
}
export default config