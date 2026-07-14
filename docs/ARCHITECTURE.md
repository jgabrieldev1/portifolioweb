# Auditoria arquitetural - Fase 0

## Resumo executivo

O repositorio e um conjunto de sites estaticos independentes, nao uma aplicacao modular. A home do portfolio possui CSS dividido por responsabilidade e JavaScript pequeno, enquanto cada demo mantem seu proprio HTML, CSS e JavaScript. Essa independencia favorece publicacao simples e isolamento visual, mas a arvore mistura codigo funcional, placeholders vazios e uma arquitetura de componentes que ainda nao existe.

O principal risco atual e de integridade do produto: a home anuncia projetos vazios; o HTML de advocacia e invalido; CTAs e imagens de demos permanecem como placeholders; nao existem validacoes automatizadas. A recomendacao e estabilizar o site estatico antes de introduzir gerador de paginas, bundler ou framework.

## Metodo e inventario

A auditoria cobriu todos os arquivos rastreados relevantes, referencias de recursos, seletores JavaScript e historico recente. O repositorio tem 96 arquivos rastreados. Entre 71 arquivos HTML, CSS e JavaScript, 36 estao vazios e 35 possuem conteudo.

### Areas efetivas

| Area | Papel | Implementacao |
|---|---|---|
| `/index.html` | Portfolio e conversao | Implementado |
| `/assets/css/` | Design system local da home | 10 folhas usadas e `style.css` reservado |
| `/assets/js/` | Progresso, header, glow, cards, menu ativo e reveal | `main.js` e `animation.js` usados; 3 arquivos vazios |
| `/projects/advocacia/` | Demo juridico autonomo | HTML/CSS/JS implementados com defeito estrutural no HTML |
| `/projects/personal-trainer/` | Demo fitness autonomo | HTML/JS e CSS modular implementados parcialmente |
| `/projects/odontologia/` | Destino anunciado | Vazio |
| `/projects/imobiliaria/` | Destino anunciado | Vazio |
| `/pages/`, `/components/`, `/templates/` | Estrutura pretendida | Vazio e fora do runtime |

## Arquitetura existente

```text
Navegador
  |
  +-- /index.html
  |     +-- /assets/css/*.css (ordem explicita de cascade)
  |     +-- /assets/js/main.js
  |     `-- /assets/js/animation.js
  |
  `-- /projects/<segmento>/index.html
        `-- assets locais do proprio projeto
```

Nao ha camada de dados, backend, compilacao ou renderizacao compartilhada. O DOM e a interface entre HTML, CSS e JavaScript. A reutilizacao ocorre por convencao e copia, nao por componentes executaveis.

### Fluxos principais

1. A home navega internamente por ancoras.
2. Cards abrem demos por caminhos relativos.
3. O CTA principal abre uma conversa no WhatsApp.
4. `main.js` reage a scroll e mouse para atualizar a interface.
5. `animation.js` usa `IntersectionObserver` para revelar elementos.
6. Os demos carregam apenas seus ativos locais e nao dependem dos ativos raiz.

## Pontos fortes

- **Baixa complexidade operacional:** o site pode ser publicado em hospedagem estatica sem build ou servidor de aplicacao.
- **Isolamento dos demos:** estilos de clientes nao vazam para a home nem entre projetos.
- **CSS da home organizado por responsabilidade:** reset, tokens, layout, header, hero, botoes, cards, secoes, animacoes e responsividade estao separados.
- **Tokens basicos:** cores, tipografia, container, raio e transicao possuem variaveis centrais.
- **Responsividade existente:** home e demo de personal trainer contem breakpoints explicitos.
- **Progressive enhancement parcial:** o conteudo principal e HTML e continua legivel sem JavaScript, exceto elementos inicialmente ocultos pela classe de reveal caso o script falhe.
- **Preferencia de movimento reduzido:** a home contempla `prefers-reduced-motion` nas animacoes de reveal.
- **JavaScript nativo e pequeno:** nao ha dependencias de terceiros nem custo de framework.
- **Separacao semantica basica:** uso de `header`, `nav`, `main`, `section`, `article` e `footer`.

## Pontos fracos e riscos

### Criticos

- **Navegacao para paginas vazias:** odontologia e imobiliaria sao links publicos da home, mas seus `index.html` tem zero bytes. O usuario recebe pagina em branco.
- **HTML invalido em advocacia:** ha `</head>`, `</body>` e `</html>` prematuros, um `</head>` duplicado e conteudo depois do fechamento do documento. A recuperacao fica a cargo do parser do navegador e pode variar.

### Altos

- **Estrutura enganosa:** 36 de 71 fontes estao vazias. Diretorios sugerem componentes, paginas e templates inexistentes, elevando custo de orientacao e risco de publicar placeholders.
- **Ausencia de verificacao:** nao existem testes, lint, formatacao, validador de links, validacao HTML, auditoria de acessibilidade ou CI.
- **CTAs incompletos:** advocacia usa `55SEUNUMERO`; personal trainer usa `href="#"` para contato e Instagram.
- **Assets de conteudo ausentes:** demos exibem placeholders textuais em vez de imagens finais.
- **Falha potencial sem JS:** `.reveal-item` inicia invisivel; erro ou bloqueio antes da ativacao pode esconder conteudo da home.

### Medios

- **Acessibilidade:** nao ha menu movel alternativo quando `.nav-menu`/`.menu` e ocultado; faltam skip link e estados de foco consistentes; links externos da home nao usam `rel="noopener noreferrer"`; movimento de cursor nao e condicionado ao tipo de ponteiro.
- **Robustez JavaScript:** `main.js` usa elementos consultados sem verificar `null`, registra dois listeners de scroll e nao trata pagina sem area rolavel.
- **SEO e compartilhamento:** faltam description, canonical, Open Graph, dados estruturados e favicon explicitamente ligado nas paginas.
- **Performance:** efeitos de blur, glow e listeners de mouse/scroll atualizam estilo continuamente; nao ha medicao ou baseline. O demo personal trainer encadeia 20 `@import`, incluindo 7 arquivos vazios.
- **Manutencao:** convencoes e tokens divergem entre home e demos; animacao por `IntersectionObserver` esta duplicada; conteudo, estrutura e configuracoes comerciais estao acoplados ao HTML.
- **CSS generico:** classes como `.primary` e `.secondary` nao sao restritas a botoes e podem colidir em futuras composicoes.
- **Navegacao mobile:** os menus desaparecem nos breakpoints sem controle substituto.

### Baixos

- `assets/css/style.css`, `docs/planejamento.md` e varios modulos reservados nao comunicam status por si mesmos.
- Nao ha politica documentada de browsers, convencoes de codigo, licenca ou processo de contribuicao.
- Nao ha `404.html`, sitemap ou robots versionados.

## O que preservar

1. Publicacao estatica e ausencia de backend como padrao.
2. URLs existentes da home e dos projetos.
3. Independencia tematica dos demos por segmento.
4. HTML semantico e conteudo acessivel no documento.
5. Organizacao do CSS da home por responsabilidade.
6. Variaveis CSS e escala visual ja adotadas, ate revisao visual aprovada.
7. Navegacao por ancoras e fluxo direto para contato.
8. `prefers-reduced-motion` e uso de APIs nativas do navegador.
9. Assets e alteracoes visuais existentes, sem regressao visual nao aprovada.
10. Historico Git e compatibilidade com GitHub Pages.

## O que refatorar

1. Corrigir documentos invalidos e destinos vazios antes de ampliar recursos.
2. Decidir se placeholders serao implementados, ocultados ou removidos da navegacao.
3. Consolidar comportamento DOM compartilhado em modulos tolerantes a elementos ausentes.
4. Adicionar menu acessivel para telas pequenas e navegacao por teclado.
5. Definir metadados, politica de links externos e configuracao de contatos.
6. Eliminar imports e arquivos vazios apos confirmar que nao representam trabalho planejado ativo.
7. Padronizar tokens e convencoes sem forcar a mesma identidade visual em todos os demos.
8. Introduzir verificacao automatica de HTML, links, CSS/JS e viewport.
9. Separar conteudo/configuracao repetitiva da marcacao somente se houver manutencao recorrente comprovada.
10. Documentar deploy, suporte de navegadores e criterios de qualidade.

## Arquitetura proposta

A arquitetura alvo recomendada continua estatica, com uma camada minima de ferramentas apenas para qualidade. A adocao de gerador estatico deve ocorrer somente se a duplicacao real justificar o custo.

```text
.
|-- index.html
|-- assets/
|   |-- css/                   # tokens, base, componentes e paginas
|   |-- js/                    # modulos pequenos e defensivos
|   `-- img/                   # assets otimizados e nomeados por dominio
|-- projects/
|   `-- <segmento>/            # demo autocontido, publicado ou explicitamente draft
|-- docs/                      # arquitetura, decisoes e operacao
|-- scripts/                   # validacao local, se aprovada
`-- .github/workflows/         # CI/deploy, se aprovado
```

### Regras da arquitetura alvo

- Cada rota publicada deve ter conteudo valido; rascunhos nao devem ser linkados.
- JavaScript deve inicializar recursos por elemento presente, sem assumir um DOM global fixo.
- Conteudo deve permanecer disponivel quando JavaScript falhar.
- Tokens compartilhados devem cobrir fundamentos; identidades visuais dos demos permanecem locais.
- Dependencias de desenvolvimento devem resolver uma verificacao concreta e ser fixadas por lockfile.
- Componentes devem surgir de repeticao comprovada. A pasta `components/` nao deve simular includes sem build.
- Toda mudanca estrutural deve manter redirects ou URLs compativeis.

### Opcoes futuras

**Opcao A - HTML estatico disciplinado (recomendada agora):** manter arquivos independentes, adicionar validadores e reduzir vazios. Menor risco e custo.

**Opcao B - gerador estatico leve:** adotar Eleventy/Astro apenas quando houver varias paginas reais compartilhando header, footer, metadados e dados de projetos. Melhora reutilizacao, mas introduz Node, build e deploy mais complexo.

Um framework client-side nao e recomendado para o estado atual: nao ha estado de aplicacao, dados dinamicos ou interacoes que justifiquem esse custo.

## Decisoes que exigem aprovacao

- Ocultar, remover ou implementar os projetos vazios.
- Corrigir a estrutura do demo de advocacia.
- Substituir placeholders de contato e imagens.
- Remover arquivos e diretorios vazios.
- Adicionar Node, gerador estatico, testes ou CI.
- Consolidar CSS/JavaScript entre demos.
- Alterar identidade visual, textos comerciais ou marca JGS/JelleWeb.

## Conclusao

A base e adequada para um portfolio pequeno e estatico, mas sua maturidade aparente e maior que a funcional. A prioridade arquitetural nao e uma migracao: e alinhar a arvore ao produto publicado, corrigir integridade e criar verificacoes simples. Depois disso, a necessidade de componentes ou gerador estatico pode ser reavaliada com dados.
