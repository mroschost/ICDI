# ICDI

Site institucional do **ICDI - Instituto de Capacitao, Desenvolvimento e Inovao**, com apresentao de projetos, pagina de transparncia e painel administrativo para gestao de conteudo.

## Viso Geral

O projeto foi construido com foco em:

- apresentao institucional do ICDI
- vitrine de projetos e iniciativas
- area de transparncia com registros pblicos
- painel administrativo para gerenciar projetos, widget do WhatsApp e contatos capturados

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Firebase
- Tailwind CSS

## Estrutura Principal

- `src/`:
  codigo-fonte da aplicao
- `public/eventos_v2/`:
  imagens usadas nas paginas de projetos
- `public/content/transparency/`:
  arquivos visuais usados na pagina de transparncia
- `firebase-applet-config.json`:
  configurao do Firebase usada pela aplicao
- `firestore.rules`:
  regras do Firestore

## Como Rodar Localmente

### Requisitos

- Node.js 18+
- npm

### Instalar dependencias

```bash
npm install
```

### Iniciar ambiente de desenvolvimento

```bash
npm run dev
```

Aplicao local:

- `http://localhost:3000`

### Gerar build de producao

```bash
npm run build
```

### Validar TypeScript

```bash
npm run lint
```

## Rotas Principais

- `/`: pagina inicial
- `/projetos`: listagem de projetos
- `/projeto/:slug`: detalhe de projeto
- `/transparncia`: portal de transparncia
- `/admin`: painel administrativo

## Observaes

- O repositorio foi enxugado para manter apenas os assets realmente usados pela aplicao.
- Arquivos auxiliares de migrao, materiais extraidos, logs e fontes pesadas ficaram fora do versionamento.
- O projeto utiliza configurao local do Firebase via `firebase-applet-config.json`.
