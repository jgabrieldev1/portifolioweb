# Deploy no GitHub Pages

O site é estático e não possui etapa de build. A publicação deve usar a branch `main` e a raiz do repositório.

## Configuração inicial

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch `main`, a pasta `/ (root)` e salve.
4. Em **Settings > Branches**, proteja `main` e exija a verificação `check` do workflow **Quality** antes do merge.

## Fluxo de publicação

1. Crie uma branch e abra um pull request para `main`.
2. Execute `npm run check` localmente.
3. Aguarde o workflow **Quality** concluir sem falhas.
4. Faça merge do pull request. O GitHub Pages publicará o conteúdo da raiz automaticamente.

## Reprodução local

Requisitos: Node.js 24 LTS e dependências instaladas com `npm ci`.

```powershell
npm run check
```

Na primeira execução dos smoke tests, instale o navegador isolado:

```powershell
npx playwright install chromium
```
