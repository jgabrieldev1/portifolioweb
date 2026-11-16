# João Gabriel — portfólio

Portfólio pessoal com identidade RPG, arte original em pixels e capa animada com partículas douradas. A animação pode ser pausada e respeita a preferência de movimento reduzido.

## Publicar na Hostinger pelo GitHub

No hPanel: **Sites → Adicionar site → Web app / Node.js → Importar repositório Git**.
Conecte sua conta GitHub, autorize este repositório e selecione a branch `main`.

Configurações:

| Campo | Valor |
|---|---|
| Framework | Vite (frontend estático) |
| Node.js | 22, versão 22.13 ou superior |
| Diretório raiz | `.` |
| Instalação | `npm ci` |
| Build | `npm run build` (executa `build:hostinger`) |
| Diretório de saída | `dist-hostinger` |
| Variáveis de ambiente | Nenhuma |

A opção GitHub pertence à hospedagem de Web apps. Não depende de importar código no editor Horizons.

Se o plano não oferecer importação GitHub/Web apps, execute `npm ci` e `npm run build:hostinger`. Envie **o conteúdo** de `dist-hostinger` para `public_html` de um site PHP/HTML. O site é estático e não precisa de servidor Node em produção.

Depois de validar o endereço temporário, conecte `jgabrieldev.com.br` pelo hPanel.

## Desenvolvimento

```sh
npm ci
npm run dev:hostinger
```

O código visual fica em `app/page.tsx`, a animação em `app/project-cover.tsx`, os estilos em `app/globals.css` e as imagens em `public/`.

O projeto também preserva a configuração da prévia OpenAI Sites (`npm run dev` e `npm run build:sites`). O comando padrão `npm run build` gera a versão estática para Hostinger em `dist-hostinger`. No hPanel, configure essa pasta como diretório de saída; não use `dist`, que pertence ao build de Sites.

## Tecnologias e créditos

React, TypeScript, CSS/Tailwind CSS, Vite e Lucide. Prévia Sites com Vinext/Cloudflare Workers. Desenvolvimento com apoio do Codex e ilustrações originais criadas com ImageGen. Claude Code aparece como ferramenta com a qual João Gabriel tem familiaridade; não foi usado na implementação desta versão.

## Conteúdo

Os contatos profissionais publicados fazem parte do portfólio. Nenhuma senha, token ou arquivo de currículo é necessário para publicar.
