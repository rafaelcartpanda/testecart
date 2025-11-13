import { defineConfig } from 'vite'

// Base path para GitHub Pages
// Se o repositório for um site de usuário/organização (nome do repo = username.github.io), use '/'
// Caso contrário, use '/nome-do-repo/'
const repositoryName = process.env.REPOSITORY_NAME || 'testecart'
const isUserOrOrgSite = repositoryName.includes('.github.io')
const base = process.env.NODE_ENV === 'production' && !isUserOrOrgSite 
  ? `/${repositoryName}/` 
  : '/'

export default defineConfig({
  base: base,
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
