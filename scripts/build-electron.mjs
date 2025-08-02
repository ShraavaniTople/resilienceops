import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const common = {
  bundle: true,
  platform: 'node',
  sourcemap: true,
  external: ['electron'],
  format: 'esm',
}

await build({
  ...common,
  entryPoints: [path.join(root, 'app/main/main.ts')],
  outfile: path.join(root, 'dist-electron/main.mjs'),
})

await build({
  ...common,
  entryPoints: [path.join(root, 'app/preload/preload.ts')],
  outfile: path.join(root, 'dist-electron/preload.mjs'),
})

console.log('✅ Built dist-electron/main.mjs and preload.mjs')
