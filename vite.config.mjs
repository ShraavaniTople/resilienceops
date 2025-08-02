import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // Serve the renderer from app/renderer
  root: path.resolve(__dirname, 'app/renderer'),
  plugins: [
    react(),
    electron({
      main: {
        entry: path.resolve(__dirname, 'app/main/main.ts'),
        vite: {
          build: {
            outDir: path.resolve(__dirname, 'dist-electron'),
            minify: false,
            rollupOptions: {
              output: { entryFileNames: 'main.js' }
            }
          }
        },
        // Ensure Electron starts after main bundle is ready
        onstart({ startup }) { startup() }
      },
      preload: {
        input: {
          preload: path.resolve(__dirname, 'app/preload/preload.ts'),
        },
        vite: {
          build: {
            outDir: path.resolve(__dirname, 'dist-electron'),
            minify: false,
            rollupOptions: {
              output: { entryFileNames: 'preload.js' }
            }
          }
        }
      }
    }),
    electronRenderer(),
  ],
  server: { port: 5173 },
  build: {
    // Put built web assets in project-root/dist
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  }
})
