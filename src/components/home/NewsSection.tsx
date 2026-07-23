import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsService } from '../../services/newsService';
import { NewsArticle } from '../../types';

export const NewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await newsService.getLatest(3);
      setArticles(data);
    };
    load();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-gov-yellow rounded-full" />
              <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Fique por dentro</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gov-blue-900">Últimas Notícias</h2>
          </div>
          <Link
            to="/noticias"
            className="group inline-flex items-center gap-2 text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700 hover:text-gov-blue-900 transition-colors"
          >
            Ver Todas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
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
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-lg font-bold text-gov-blue-900 mb-2 group-hover:text-gov-blue-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
