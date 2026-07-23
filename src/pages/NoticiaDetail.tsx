import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react';
import { newsService } from '../services/newsService';
import { NewsArticle } from '../types';

export const NoticiaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (slug) {
        const data = await newsService.getBySlug(slug);
        setArticle(data);
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <h2 className="text-2xl font-bold text-gov-blue-900 mb-4">Notícia não encontrada</h2>
        <Link to="/noticias" className="text-gov-blue-700 hover:underline">Voltar para notícias</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-40 pb-24 md:pb-32">
      <article className="max-w-4xl mx-auto px-6">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gov-blue-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para notícias
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gov-yellow rounded-full" />
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Notícia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gov-blue-900 mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString('pt-BR')}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {article.author}
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" /> {article.tags.join(', ')}
              </span>
            )}
          </div>
        </div>

        <div className="h-80 md:h-96 rounded-[2rem] overflow-hidden mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-6">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};
