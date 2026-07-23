import { NewsArticle } from '../types';

const STORAGE_KEY = 'icdi.news.v1';

const INITIAL_NEWS: NewsArticle[] = [
  {
    slug: 'icdi-lanca-projeto-arraia-das-cidades',
    title: 'ICDI Lança Projeto Arraiá das Cidades no Distrito Federal',
    excerpt: 'Circuito cultural percorre cinco cidades do DF com programação gratuita, fortalecendo economia local e tradições juninas.',
    content: `O Instituto de Capacitação, Desenvolvimento e Inovação (ICDI) lançou o projeto Arraiá das Cidades, um circuito cultural que percorre Park Way, Vila Planalto, Candangolândia, Núcleo Bandeirante e Riacho Fundo I.

O evento reúne 35 artistas locais e conta com a participação de mais de 75 microempreendedores na praça de alimentação. A iniciativa tem como objetivo valorizar a cultura popular, fortalecer a economia criativa e levar programação cultural gratuita para diferentes territórios do DF.

Realizado com recursos do Termo de Fomento nº 64/2025, em parceria com a Secretaria de Cultura e Economia Criativa, o projeto representa um marco na atuação do ICDI no fomento à cultura regional.`,
    image: '/eventos_v2/fotos/foto_01_pagina_14.jpg',
    date: '2026-03-15',
    tags: ['cultura', 'eventos', 'circuito cultural'],
    author: 'ICDI',
    published: true
  },
  {
    slug: 'feirao-do-trabalhador-icdi-bate-recordes',
    title: 'Feirão do Trabalhador do ICDI Bate Recorde com Mais de 9 Mil Atendimentos',
    excerpt: 'Evento realizado ao lado da Biblioteca Nacional reuniu 90 empresas e mais de 5 mil vagas de emprego.',
    content: `O Feirão do Trabalhador, realizado pelo ICDI em parceria com a Secretaria de Desenvolvimento Econômico, Trabalho e Renda, bateu recorde de público e atendimentos.

Realizado ao lado da Biblioteca Nacional de Brasília, o evento contou com 90 empresas participantes, disponibilizou mais de 5 mil vagas de emprego e realizou mais de 9 mil atendimentos, resultando em mais de 5 mil encaminhamentos para processos seletivos.

A iniciativa reforça o compromisso do ICDI com a geração de oportunidades, renda e articulação com políticas públicas de empregabilidade no Distrito Federal.`,
    image: '/eventos_v2/fotos/foto_01_pagina_15.jpg',
    date: '2026-02-20',
    tags: ['emprego', 'trabalho', 'feirão', 'oportunidades'],
    author: 'ICDI',
    published: true
  },
  {
    slug: 'teatro-vai-a-escola-2-edicao-leva-cultura',
    title: 'Teatro Vai à Escola - 2ª Edição Leva Cultura a 18 Escolas Públicas',
    excerpt: 'Projeto do ICDI em parceria com a Secretaria de Cultura atende escolas da rede pública de Samambaia.',
    content: `O projeto Teatro Vai à Escola, uma iniciativa do ICDI em parceria com a Secretaria de Cultura, chegou à sua segunda edição em 2025, ampliando o alcance e o impacto da iniciativa.

Nesta edição, o projeto atendeu 18 escolas públicas da Coordenação Regional de Ensino de Samambaia, levando apresentações teatrais de qualidade para estudantes da rede pública.

A ação reafirma o teatro como ferramenta de transformação social, acesso à cultura e desenvolvimento educacional, valores fundamentais para o ICDI.`,
    image: '/eventos_v2/fotos/foto_01_pagina_12.jpg',
    date: '2026-01-10',
    tags: ['teatro', 'educação', 'cultura', 'escolas'],
    author: 'ICDI',
    published: true
  }
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const newsService = {
  async getAll(): Promise<NewsArticle[]> {
    if (!canUseStorage()) return INITIAL_NEWS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...INITIAL_NEWS];
      const stored = JSON.parse(raw) as NewsArticle[];
      const storedMap = new Map(stored.map(n => [n.slug, n]));
      const merged = INITIAL_NEWS.map(n => storedMap.get(n.slug) ? { ...n, ...storedMap.get(n.slug)! } : n);
      const extras = stored.filter(n => !INITIAL_NEWS.find(i => i.slug === n.slug));
      return [...merged, ...extras].filter(n => n.published);
    } catch {
      return [...INITIAL_NEWS];
    }
  },

  async getAllAdmin(): Promise<NewsArticle[]> {
    if (!canUseStorage()) return INITIAL_NEWS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...INITIAL_NEWS];
      const stored = JSON.parse(raw) as NewsArticle[];
      const storedMap = new Map(stored.map(n => [n.slug, n]));
      const merged = INITIAL_NEWS.map(n => storedMap.get(n.slug) ? { ...n, ...storedMap.get(n.slug)! } : n);
      const extras = stored.filter(n => !INITIAL_NEWS.find(i => i.slug === n.slug));
      return [...merged, ...extras];
    } catch {
      return [...INITIAL_NEWS];
    }
  },

  async getBySlug(slug: string): Promise<NewsArticle | null> {
    const all = await this.getAll();
    return all.find(n => n.slug === slug) || null;
  },

  async getLatest(limit = 3): Promise<NewsArticle[]> {
    const all = await this.getAll();
    return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
  },

  async create(article: Omit<NewsArticle, 'id'>): Promise<string> {
    const all = await this.getAllAdmin();
    all.push({ ...article, id: article.slug });
    writeArticles(all);
    return article.slug;
  },

  async update(slug: string, article: Partial<NewsArticle>): Promise<void> {
    const all = await this.getAllAdmin();
    const index = all.findIndex(n => n.slug === slug);
    if (index >= 0) {
      all[index] = { ...all[index], ...article };
      writeArticles(all);
    }
  },

  async delete(slug: string): Promise<void> {
    const all = await this.getAllAdmin();
    const filtered = all.filter(n => n.slug !== slug);
    writeArticles(filtered);
  },

  async seed() {
    writeArticles([]);
  }
};

function writeArticles(articles: NewsArticle[]) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch {
    // ignore
  }
}
