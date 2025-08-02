# ResilienceOps

A pastel, clean Electron + React + Tailwind shell for an “Incident to Impact Orchestrator”. This is a demo UI showing incidents, API spec change placeholders, fix plan placeholders, and executions. It includes a “New Mock Incident” button and an auto-seeded mock incident on startup.

## Prerequisites
macOS, Node.js 18+ and npm installed. Verify with:
node -v
npm -v

## How to Run
1. Clone the repository:
git clone https://github.com/ShraavaniTople/resilienceops.git
cd resilienceops
2. Install dependencies:
npm install
3. Build Electron main & preload (ESM output to dist-electron/):
npm run build:electron
4. Build the React renderer (output to dist/):
npm run build
5. Run in static, no-reload demo mode:
STATIC=1 npx electron .
You should now see:
- Pastel header and cards
- One mock incident on startup
- “New Mock Incident” button to add more
- “Run Health Check” showing a toast

## One-liner build & run
npm run build:electron && npm run build && STATIC=1 npx electron .

## Notes
Do not commit dist/ or dist-electron/ to git. To create a macOS .app or .dmg later, integrate electron builder and codesigning. If electron is not found, run:
STATIC=1 ./node_modules/.bin/electron .
Do not commit dist/ or dist-electron/ to git. To create a macOS .app or .dmg later, integrate electron-builder and codesigning. If electron is not found, run:
STATIC=1 ./node_modules/.bin/electron .
