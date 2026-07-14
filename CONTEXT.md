# Contexto do repositorio

## Identidade

- **Repositorio:** `portifolioweb`
- **Produto:** portfolio profissional JelleWeb/JGS
- **Responsavel apresentado no site:** Joao Gabriel Sales
- **Branch auditada:** `main`
- **Hospedagem inferida:** GitHub Pages, com links para `jgabrieldev1.github.io/portifolioweb/`
- **Stack efetiva:** HTML5, CSS e JavaScript sem framework
- **Data de referencia:** 13/07/2026

## Objetivo do produto

Apresentar servicos de desenvolvimento web, explicar o processo de trabalho, exibir projetos demonstrativos e converter visitantes em contatos pelo WhatsApp. Os projetos de segmentos funcionam como amostras independentes do portfolio.

## Escopo da Fase 0

Esta fase e exclusivamente documental. Foram analisados a arvore do repositorio, os arquivos rastreados, as dependencias entre HTML/CSS/JavaScript, os caminhos de navegacao e o historico recente do Git.

Foram criados ou preenchidos somente:

- `README.md`
- `CONTEXT.md`
- `CHANGELOG.md`
- `docs/ARCHITECTURE.md`
- `docs/REFACTORING-PLAN.md`

Nenhum HTML de execucao, CSS, JavaScript, ativo ou configuracao de deploy foi alterado.

## Restricoes vigentes

1. Preservar o codigo de execucao ate autorizacao expressa.
2. Nao criar commit nem executar push sem autorizacao.
3. Nao fazer reorganizacao ampla de diretorios nesta fase.
4. Manter URLs publicas e caminhos relativos como contratos de compatibilidade em fases futuras.
5. Tratar o conteudo comercial, contatos e identidade visual como dados que precisam de confirmacao do proprietario.

## Premissas e incertezas

- Nao existe manifesto de dependencias, configuracao de build, CI ou teste automatizado no repositorio.
- A publicacao por GitHub Pages e uma inferencia baseada nos links existentes; nao ha workflow de deploy versionado.
- `pages/`, `components/` e `templates/` expressam uma intencao arquitetural, mas hoje nao participam do runtime.
- Os projetos de odontologia e imobiliaria sao anunciados na home, embora seus arquivos estejam vazios.
- O nome pedido pelo proprietario e "JelleWeb", enquanto a interface usa principalmente "JGS" e o repositorio nao declara formalmente a marca. A nomenclatura deve ser confirmada antes de uma revisao de conteudo.
- A verificacao foi estatica. Nao ha suite automatizada ou baseline visual versionada para comprovar comportamento em navegadores.

## Contratos atuais a preservar

- Entrada principal em `/index.html`.
- Demos em `/projects/<segmento>/index.html`.
- Navegacao por ancoras (`#sobre`, `#servicos`, `#processo`, `#projetos`, `#contato`).
- Contato principal por WhatsApp.
- Ausencia de requisito de backend para servir o portfolio.
- Separacao visual entre o portfolio e cada demonstracao de cliente.

## Criterio de saida da Fase 0

A fase termina com diagnostico e plano documentados, `git diff` apresentado e nenhuma mudanca funcional. A proxima fase depende de autorizacao explicita.
