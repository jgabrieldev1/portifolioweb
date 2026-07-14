# Plano de refatoracao

## Principios

- Nenhuma etapa abaixo foi executada na Fase 0.
- Cada fase requer aprovacao antes de alterar o runtime.
- Mudancas devem ser pequenas, testaveis e reversiveis.
- URLs, conteudo e aparencia atuais formam a baseline, salvo defeitos aprovados.
- Ferramentas serao adotadas somente com beneficio verificavel.

## Priorizacao

| Prioridade | Tema | Risco tratado |
|---|---|---|
| P0 | Integridade de rotas e HTML | Paginas em branco e parsing imprevisivel |
| P1 | Contatos, acessibilidade e resiliencia | Conversao quebrada e barreiras de uso |
| P2 | Qualidade automatizada | Regressoes silenciosas |
| P3 | Organizacao e reutilizacao | Custo de manutencao |
| P4 | Performance, SEO e conteudo | Descoberta e experiencia |

## Fase 1 - Estabilizacao funcional

**Objetivo:** eliminar defeitos publicos sem reorganizar a arquitetura.

**Status:** concluida em 13/07/2026. Odontologia e imobiliaria mantiveram seus URLs com paginas de status; contatos usam o canal confirmado do portfolio.

1. Validar manualmente todas as rotas e ancoras publicadas.
2. Corrigir a ordem estrutural do HTML de advocacia.
3. Definir o destino dos cards de odontologia e imobiliaria: implementar, ocultar ou marcar como indisponivel sem link.
4. Substituir `55SEUNUMERO` e `href="#"` por contatos confirmados.
5. Adicionar protecoes `null` e caso de pagina sem scroll ao JavaScript da home.
6. Garantir conteudo visivel quando JavaScript ou `IntersectionObserver` nao estiver disponivel.

**Aceite:** nenhuma rota publica vazia, HTML valido, CTAs reais, console sem erros e navegacao principal preservada.

## Fase 2 - Identidade JelleWeb

**Objetivo:** consolidar a marca publica e comunicar com clareza a proposta comercial do estudio.

**Status:** em andamento desde 14/07/2026. Logotipos oficiais foram incorporados; wordmark, paleta, linguagem institucional, hero, servicos e chamadas comerciais foram aplicados na home.

1. Substituir JGS por JelleWeb nos pontos publicos da home.
2. Aplicar o logotipo oficial e suas variacoes conforme o contraste do fundo.
3. Extrair e centralizar a paleta azul, ciano, violeta e magenta da marca.
4. Definir tipografia e hierarquia visual coerentes com a identidade digital.
5. Revisar textos institucionais, proposta de valor, servicos e CTAs.
6. Preservar as identidades independentes das demonstracoes de clientes.

**Aceite:** marca JelleWeb consistente em desktop e mobile, textos comerciais claros, contraste acessivel e demos preservadas.

## Fase 2A - Acessibilidade e navegacao

**Objetivo:** oferecer operacao completa por teclado, toque e tecnologias assistivas.

**Status:** em andamento desde 14/07/2026. Menu mobile, skip link, foco visivel, protecoes para efeitos de ponteiro, links externos e movimento reduzido foram implementados; faltam auditoria automatica e teste manual final.

1. Implementar menu mobile com botao, estado expandido e controle de foco.
2. Adicionar skip link e foco visivel consistente.
3. Revisar hierarquia de titulos, nomes acessiveis e contraste.
4. Condicionar glow e efeitos de ponteiro a dispositivos compativeis.
5. Aplicar `rel="noopener noreferrer"` a links externos com nova aba.
6. Respeitar movimento reduzido em todos os demos.

**Aceite:** fluxo completo por teclado, sem conteudo inacessivel em mobile, auditoria automatica sem erros criticos e teste manual com movimento reduzido.

## Fase 3 - Guardrails de qualidade

**Objetivo:** detectar regressao antes da publicacao.

**Status:** em andamento desde 14/07/2026. Node.js 24 LTS foi escolhido como runtime unico; validacao HTML e de links, lint de CSS/JavaScript, formatacao da automacao, smoke tests desktop/mobile, baselines visuais e CI foram adicionados. A protecao obrigatoria de `main` deve ser ativada apos o primeiro workflow verde.

1. Escolher um runtime de desenvolvimento apenas se aprovado.
2. Adicionar validacao HTML e verificador de links internos.
3. Adicionar formatacao/lint para CSS e JavaScript.
4. Criar smoke tests das rotas e ancoras principais em desktop e mobile.
5. Registrar screenshots de baseline para home e demos publicados.
6. Executar as verificacoes em CI e documentar deploy do GitHub Pages.

**Aceite:** um comando local reproduz todas as verificacoes e a branch principal bloqueia falhas criticas.

## Fase 4 - Limpeza arquitetural

**Objetivo:** fazer a arvore representar o produto real.

1. Classificar cada arquivo vazio como backlog, scaffold necessario ou lixo.
2. Remover vazios sem uso somente apos aprovacao.
3. Consolidar os listeners de scroll e inicializadores DOM da home.
4. Remover `@import` vazios do personal trainer e avaliar um unico ponto de entrada CSS.
5. Padronizar nomenclatura de componentes e escopo de modificadores (`.btn--primary`, por exemplo) sem regressao visual.
6. Extrair tokens fundamentais compartilhados apenas onde os valores forem realmente comuns.

**Aceite:** nenhum arquivo publicado e acidentalmente vazio, mapa de dependencias claro e testes da Fase 3 verdes.

## Fase 5 - Conteudo, SEO e performance

**Objetivo:** melhorar descoberta e conversao apos estabilizacao.

1. Confirmar marca, textos, contatos e dados de cada projeto.
2. Substituir placeholders por assets finais otimizados com dimensoes declaradas.
3. Adicionar description, canonical, Open Graph, favicon, sitemap e robots conforme o dominio final.
4. Medir Core Web Vitals e custo de blur, scroll e mouse antes de otimizar.
5. Revisar CTA, analytics e consentimento somente com requisitos definidos.

**Aceite:** metadados validados, links compartilhados com preview correto, contatos confirmados e metas de performance acordadas.

## Fase 6 - Reavaliacao de geracao estatica

**Objetivo:** decidir com evidencia se uma ferramenta de templates e necessaria.

Adotar um gerador estatico apenas se pelo menos uma destas condicoes ocorrer:

- tres ou mais paginas reais repetem header, footer e metadados;
- projetos passam a ser cadastrados como dados estruturados;
- atualizacoes de conteudo frequentes geram divergencia;
- internacionalizacao, blog ou colecoes tornam HTML manual oneroso.

Se aprovado, fazer prova de conceito em uma rota, preservar URLs e comparar build, deploy, manutencao e output antes da migracao completa.

## Ordem sugerida de entregas

1. PR 1: correcoes P0, sem mudanca visual intencional.
2. PR 2: menu mobile, teclado e movimento reduzido.
3. PR 3: validadores, smoke tests e CI.
4. PR 4: limpeza de vazios e consolidacao pequena.
5. PRs posteriores: conteudo, SEO, performance e eventual gerador estatico.

## Fora de escopo sem decisao explicita

- Migracao para React, Vue, Angular ou SPA.
- Backend, CMS, banco de dados ou formulario proprio.
- Rebranding e redesign completo.
- Remocao de demos ou mudanca de URLs publicas.
- Inclusao de analytics, cookies ou integracoes comerciais.

## Proxima autorizacao recomendada

Autorizar apenas a Fase 1, depois de decidir:

1. Odontologia e imobiliaria devem ser implementados, ocultados ou exibidos como “em breve”?
2. Quais contatos reais substituem os placeholders nos demos?
3. A marca publica deve ser JelleWeb, JGS ou Joao Gabriel Sales?
