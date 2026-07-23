import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsService } from '../services/newsService';
import { NewsArticle } from '../types';

export const Noticias = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await newsService.getAll();
      setNews(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gov-yellow rounded-full" />
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">ICDI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gov-blue-900 mb-4">Notícias</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Acompanhe as últimas novidades, projetos e ações do Instituto de Capacitação, Desenvolvimento e Inovação.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Nenhuma notícia publicada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link
                key={article.slug}
                to={`/noticia/${article.slug}`}
                className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString('pt-BR')}
                  </div>
                  <h2 className="text-xl font-bold text-gov-blue-900 mb-2 group-hover:text-gov-blue-700 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-1 text-gov-blue-700 text-[0.625rem] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    Ler mais <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
