# JelleWeb

Portfólio oficial da JelleWeb, um estúdio digital independente que cria landing pages, sites institucionais e experiências sob medida para negócios em movimento.

[Acessar o site publicado](https://jgabrieldev1.github.io/portifolioweb/)

## Estado do projeto

As fases de estabilização, identidade JelleWeb, acessibilidade e guardrails de qualidade estão concluídas. O projeto está preparado para iniciar a Fase 4: limpeza arquitetural e consolidação interna, sem alterar as URLs públicas.

## Identidade

- marca pública: JelleWeb;
- direção visual: azul, ciano, violeta e magenta sobre superfícies escuras;
- símbolo: jellyfish oficial e variante animada em pixel art;
- posicionamento: estratégia, design e desenvolvimento para transformar presença digital em oportunidades de negócio.

## Tecnologias

- HTML5, CSS e JavaScript nativos;
- Node.js 24 LTS para ferramentas de desenvolvimento;
- HTML Validate, ESLint, Stylelint e Prettier;
- Playwright para smoke tests e baselines visuais;
- GitHub Actions e GitHub Pages.

## Execução local

Requisitos: Node.js 24 LTS e npm.

```powershell
npm ci
npm run serve
```

O site estará disponível em `http://127.0.0.1:4173`.

## Qualidade

Para executar validação HTML, verificação de links, lint, formatação e testes desktop/mobile:

```powershell
npx playwright install chromium
npm run check
```

O mesmo comando é executado automaticamente nos pull requests e em atualizações da branch `main`.

## Estrutura publicada

```text
.
|-- index.html                 # Home JelleWeb
|-- assets/                    # Identidade, estilos, scripts e imagens
|-- projects/                  # Demonstrações independentes por segmento
|-- tests/                     # Smoke tests e baselines visuais
|-- scripts/                   # Verificações locais
|-- docs/                      # Roadmap e instruções de deploy
`-- .github/workflows/         # Integração contínua
```

## Segurança e privacidade

O repositório não deve armazenar senhas, tokens, chaves de API, dados privados de clientes ou arquivos de ambiente. Contatos presentes nas páginas são canais comerciais públicos e fazem parte dos fluxos de conversão do site.

Novas integrações que precisem de credenciais devem usar os secrets do GitHub ou variáveis de ambiente locais não versionadas.

## Deploy

O GitHub Pages publica automaticamente a raiz da branch `main`. O procedimento está documentado em [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
