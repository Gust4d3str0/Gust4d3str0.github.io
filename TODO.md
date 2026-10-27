# Pendências

Itens que dependem de informações ou arquivos que ainda não foram fornecidos.

- [ ] **Currículo**: colocar o PDF em `public/curriculo-gustavo-femiano.pdf` e definir `resumeAvailable: true` em `src/data/profile.ts`.
- [ ] **Imagens dos projetos**: Pre-Live, Ascenção RPG, chatbot e HydroPulseAI já usam capturas reais em `public/projects/`. Conferir se aparecem dados pessoais nas capturas antes de publicar.
- [ ] **Repositórios públicos**: preencher `repo` em cada projeto que tiver repositório público (Pre-Live, Ascenção RPG etc.).
- [ ] **HydroPulseAI**: o texto foi escrito a partir das capturas de tela (funcionalidades visíveis). Problema, solução e desafios são inferências; revisar com a documentação e informar as tecnologias usadas.
- [ ] **TCC**: revisar o texto do projeto (problema, solução, desafios) com o conteúdo real do trabalho.
- [ ] **Datas da jornada**: informar datas reais (ano de ingresso na graduação, Alura, Pre-Live, Ascenção RPG). Hoje só 2018 é data confirmada.
- [ ] **Habilidades**: conferir `context` e `usage` de cada tecnologia em `src/data/skills.ts` (ex.: onde Django/Flask/FastAPI/Docker/MySQL/MongoDB foram de fato usados).
- [ ] **Imagem de compartilhamento**: `public/og-image.svg` não é exibida por LinkedIn/WhatsApp; gerar um PNG 1200×630 e atualizar a meta `og:image`.
- [ ] **Publicação**: criar o repositório `Gust4d3str0/Gust4d3str0.github.io`, enviar o código e ativar Pages com fonte "GitHub Actions". Ainda não foi publicado nem verificado online.
- [ ] **Python no HydroPulseAI**: o site afirma que Python foi aplicado no HydroPulseAI (deduzido das capturas). Confirmar e informar qual framework foi usado; Django/Flask/FastAPI constam como aprendidos na formação Alura.
