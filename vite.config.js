// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    server: {
        open: true
    },
    base: './' // This helps with relative paths in deployment
})
