# ICDI

Site institucional do **ICDI - Instituto de Capacitação, Desenvolvimento e Inovação**, com apresentação de projetos, página de transparência e painel administrativo para gestão de conteúdo.

## Visão Geral

O projeto foi constru?do com foco em:

- apresentação institucional do ICDI
- vitrine de projetos e iniciativas
- área de transparência com registros públicos
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
  código-fonte da aplicação
- `public/eventos_v2/`:
  imagens usadas nas páginas de projetos
- `public/content/transparency/`:
  arquivos visuais usados na página de transparência
- `firebase-applet-config.json`:
  configuração do Firebase usada pela aplicação
- `firestore.rules`:
  regras do Firestore

## Como Rodar Localmente

### Requisitos

- Node.js 18+
- npm

### Instalar dependências

```bash
npm install
```

### Iniciar ambiente de desenvolvimento

```bash
npm run dev
```

Aplica??o local:

- `http://localhost:3000`

### Gerar build de produção

```bash
npm run build
```

### Validar TypeScript

```bash
npm run lint
```

## Rotas Principais

- `/`: página inicial
- `/projetos`: listagem de projetos
- `/projeto/:slug`: detalhe de projeto
- `/transparência`: portal de transparência
- `/admin`: painel administrativo

## Observa??es

- O repositório foi enxugado para manter apenas os assets realmente usados pela aplicação.
- Arquivos auxiliares de migra??o, materiais extra?dos, logs e fontes pesadas ficaram fora do versionamento.
- O projeto utiliza configuração local do Firebase via `firebase-applet-config.json`.
