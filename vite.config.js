import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Carrental/' : '/',
  plugins: [
    tailwindcss(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
      exclude: /node_modules/,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
