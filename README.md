# JelleWeb - Portfolio Web

Portfolio estatico de Joao Gabriel Sales, usado para apresentar servicos de desenvolvimento web e demonstracoes de sites para diferentes segmentos.

> Estado da auditoria: Fase 0 concluida em 13/07/2026. Nenhum arquivo de execucao foi alterado nesta fase.

## Execucao atual

O projeto nao possui etapa de build nem dependencias de pacote. Para preservar o comportamento de caminhos relativos, sirva a raiz com um servidor HTTP estatico, por exemplo:

```powershell
python -m http.server 8000
```

Depois, acesse `http://localhost:8000/`.

## Estrutura

```text
.
|-- index.html                 # Portfolio principal (implementado)
|-- assets/                    # CSS, JavaScript e imagens do portfolio
|-- projects/                  # Demonstracoes independentes por segmento
|   |-- advocacia/             # Implementado, com problemas de HTML conhecidos
|   |-- personal-trainer/      # Implementado parcialmente
|   |-- imobiliaria/           # Reservado; arquivos vazios
|   `-- odontologia/           # Reservado; arquivos vazios
|-- pages/                     # Reservado; arquivos vazios
|-- components/                # Reservado; arquivos vazios
|-- templates/                 # Reservado; arquivos vazios
`-- docs/                      # Diagnostico e planejamento tecnico
```

Dos 71 arquivos HTML, CSS e JavaScript auditados, 36 estao vazios. A existencia de uma pasta nao significa que o recurso esteja funcional.

## Documentacao

- [`CONTEXT.md`](CONTEXT.md): contexto operacional, escopo e restricoes.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): arquitetura atual, pontos fortes, fragilidades e arquitetura proposta.
- [`docs/REFACTORING-PLAN.md`](docs/REFACTORING-PLAN.md): plano incremental sujeito a aprovacao.
- [`CHANGELOG.md`](CHANGELOG.md): historico documentado a partir da Fase 0.
- [`docs/planejamento.md`](docs/planejamento.md): arquivo legado vazio, preservado nesta fase.

## Estado funcional

| Area | Estado | Observacao |
|---|---|---|
| Portfolio principal | Funcional com ressalvas | Site one-page; sem menu movel, testes ou metadados completos |
| Advocacia | Parcial | Conteudo e estilos existem; documento HTML esta estruturalmente invalido |
| Personal trainer | Parcial | Conteudo amplo; CTAs finais e imagens sao placeholders |
| Odontologia | Nao implementado | Card da home aponta para pagina vazia |
| Imobiliaria | Nao implementado | Card da home aponta para pagina vazia |
| Pages, components e templates | Nao implementados | Apenas estrutura de diretorios e arquivos vazios |

## Regras para evolucao

1. Preservar a publicacao estatica e os URLs atuais durante a refatoracao.
2. Corrigir primeiro falhas funcionais e de acessibilidade, antes de adotar ferramentas.
3. Nao promover arquivos vazios a abstracoes sem um caso real de uso.
4. Validar cada etapa antes de remover ou consolidar codigo.
5. Exigir aprovacao antes de mudancas estruturais de grande alcance.

## Auditoria

O diagnostico completo esta em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). As mudancas propostas nao foram executadas; consulte [`docs/REFACTORING-PLAN.md`](docs/REFACTORING-PLAN.md).
