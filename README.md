# ICDI

Site institucional do **ICDI - Instituto de Capacitacao, Desenvolvimento e Inovacao**, com apresentacao de projetos, pagina de transparencia e painel administrativo para gestao de conteudo.

## Visao Geral

O projeto foi construido com foco em:

- apresentacao institucional do ICDI
- vitrine de projetos e iniciativas
- area de transparencia com registros publicos
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
  codigo-fonte da aplicacao
- `public/eventos_v2/`:
  imagens usadas nas paginas de projetos
- `public/content/transparency/`:
  arquivos visuais usados na pagina de transparencia
- `firebase-applet-config.json`:
  configuracao do Firebase usada pela aplicacao
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

Aplicacao local:

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
- `/transparencia`: portal de transparencia
- `/admin`: painel administrativo

## Observacoes

- O repositorio foi enxugado para manter apenas os assets realmente usados pela aplicacao.
- Arquivos auxiliares de migracao, materiais extraidos, logs e fontes pesadas ficaram fora do versionamento.
- O projeto utiliza configuracao local do Firebase via `firebase-applet-config.json`.
