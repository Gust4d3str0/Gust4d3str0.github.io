# Gustavo.dev

Portfólio de Gustavo Henrique Femiano — React, TypeScript, Vite, Tailwind CSS 4 e Motion, com identidade visual Dark Fantasy original.

## Rodar localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm test         # testes (Vitest + Testing Library)
npm run build    # type-check + build em dist/
npm run preview  # visualizar o build
```

## Estrutura

```
src/
  components/  Header, ProjectCard/Dialog, SkillTree/List/Detail, Timeline...
  sections/    Hero, About, Projects, Skills, Journey, Contact
  data/        profile, projects, skills, journey (conteúdo separado da UI)
  hooks/       useActiveSection
  utils/       layout da árvore de habilidades
  styles/      Tailwind + design tokens (index.css)
  types/       tipos compartilhados
  test/        testes
```

O conteúdo é editado em `src/data/`. Pendências de conteúdo estão em [TODO.md](TODO.md).

## Publicar no GitHub Pages

1. Crie o repositório de usuário **`Gust4d3str0.github.io`** (não o repositório de perfil `Gust4d3str0`).
2. Envie este projeto para a branch `main`.
3. Em *Settings → Pages*, escolha *Source: GitHub Actions*.
4. O workflow `.github/workflows/deploy.yml` roda testes, build e publica em https://gust4d3str0.github.io/.

O Vite usa `base: '/'`, adequado para o repositório de usuário.
