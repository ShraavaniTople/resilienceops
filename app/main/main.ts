import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
process.on('uncaughtException', (err) => console.error('[uncaughtException]', err))
process.on('unhandledRejection', (reason) => console.error('[unhandledRejection]', reason))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USE_STATIC = process.env.STATIC === '1'
const DEV_URL = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173'

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#0b1220' : '#ffffff',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 12, y: 12 },
    webPreferences: { preload: path.join(__dirname, 'preload.mjs') },
    show: false,
  })

  const load = async () => {
    try {
      if (USE_STATIC) {
        const indexPath = path.resolve(__dirname, '../dist/index.html')
        if (!fs.existsSync(indexPath)) throw new Error('dist/index.html not found')
        await win.loadFile(indexPath)
      } else {
        await win.loadURL(DEV_URL)
      }
    } catch (e) {
      console.error('Load failed:', e)
    } finally {
      win.show()
    }
  }
  load()
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
