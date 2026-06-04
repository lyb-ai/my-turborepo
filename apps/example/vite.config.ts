import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo/example': fileURLToPath(new URL('../../packages/example/src/index.ts', import.meta.url)),
    },
  },
})
