import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Ensure process CWD is the project root so PostCSS/Tailwind resolves
// content paths correctly regardless of where the dev server was launched from.
const __dirname = dirname(fileURLToPath(import.meta.url))
process.chdir(__dirname)

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true,
  },
})
