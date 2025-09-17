import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',   // 👈 this is the fix
  plugins: [
    tailwindcss(),
  ],
})
