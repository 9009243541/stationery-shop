// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [tailwindcss()],
//   server: {
//     host: 'localhost', // or '0.0.0.0' if you're accessing from mobile or another device
//     port: 5173,
//     hmr: {
//       protocol: 'ws',
//       host: 'localhost',
//       port: 5173,
//     },
//   },
// })
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "localhost",
    port: 5173,
    hmr: {
      overlay: false, 
    },
  },
});
