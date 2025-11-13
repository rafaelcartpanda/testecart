Cartpanda Redesign — Full Project (No sound)
===========================================

Conteúdo principal:
- package.json, vite.config.js
- src/index.html (home), src/features.html, src/pricing.html, src/blog.html, src/support.html, src/signup.html
- src/css/* (base, layout, components)
- src/js/* (main.js, panda.js, hero.js, carousel.js, animations.js)
- public/ (assets: hero-fallback.webp, hero-video.mp4 placeholder, products/p1..p5.webp)

Observações importantes:
- O panda 3D foi criado proceduralmente com Three.js (não precisa de arquivo .glb).
- O arquivo public/hero-video.mp4 é um PLACEHOLDER: substitua por seu vídeo real para o efeito de hero. Uso de WebM recomendado.
- Para rodar localmente:
  1. Instale dependências: `npm install`
  2. Rode em dev: `npm run dev`
  3. Build: `npm run build` e deploy para GitHub Pages (ex.: usando gh-pages ou GitHub Actions)

Deploy:
- Já inclui estrutura pronta para deploy com Vite. Recomendo configurar GitHub repo e GitHub Actions para CI/CD.

Se quiser, eu:
- gero o repositório Git com commits simulados,
- adiciono GitHub Actions workflow para deploy automático no GitHub Pages,
- substituo o placeholder hero-video.mp4 por um WebM gerado (se fornecer conteúdo ou permitir eu criar animação em canvas convertida).
