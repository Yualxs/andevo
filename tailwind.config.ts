import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // ... (tu config de content)
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'quint': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      skew: {
        '7': '7deg',
      },

      // --- AÑADE ESTO PARA LA ANIMACIÓN DEL BOTÓN ---
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        }
      }
      // --- FIN DE LO AÑADIDO ---
    },
  },
  plugins: [],
}
export default config