import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { newsService } from '../../services/newsService';
import { NewsArticle } from '../../types';
import { Save } from 'lucide-react';

const schema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  slug: z.string().min(3, 'Slug deve ter no mínimo 3 caracteres'),
  excerpt: z.string().min(10, 'Resumo deve ter no mínimo 10 caracteres'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  image: z.string().min(1, 'URL da imagem é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  tags: z.string(),
  author: z.string().optional(),
  published: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  article?: NewsArticle | null;
  onSuccess: () => void;
}

export const NewsForm = ({ article, onSuccess }: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      tags: '',
      author: 'ICDI',
      published: true,
    }
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        date: article.date,
        tags: article.tags?.join(', ') || '',
        author: article.author || 'ICDI',
        published: article.published,
      });
    }
  }, [article, reset]);

  const onSubmit = async (data: FormData) => {
    const tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    const newsData = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      date: data.date,
      tags,
      author: data.author || 'ICDI',
      published: data.published,
    };

    if (article) {
      await newsService.update(article.slug, newsData);
    } else {
      await newsService.create(newsData);
    }

    onSuccess();
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Título</label>
        <input {...register('title')} onChange={(e) => {
          if (!article) {
            const slugField = document.getElementsByName('slug')[0] as HTMLInputElement;
            if (slugField && !slugField.value.startsWith(e.target.value.slice(0, -1))) {
              // Only auto-generate if slug is empty or matches previous auto-generation
            }
          }
          register('title').onChange(e);
        }} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" placeholder="Título da notícia" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Slug (URL)</label>
        <input {...register('slug')} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none font-mono text-xs" placeholder="titulo-da-noticia" />
        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">URL da Imagem</label>
          <input {...register('image')} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" placeholder="/eventos_v2/fotos/..." />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>
        <div>
          <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Data</label>
          <input type="date" {...register('date')} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Resumo (excerpt)</label>
        <textarea {...register('excerpt')} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" placeholder="Breve resumo da notícia..." />
        {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Conteúdo</label>
        <textarea {...register('content')} rows={10} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none font-mono" placeholder="Conteúdo completo da notícia..." />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tags (separadas por vírgula)</label>
          <input {...register('tags')} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" placeholder="cultura, educação, evento" />
        </div>
        <div>
          <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">Autor</label>
          <input {...register('author')} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none" placeholder="ICDI" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register('published')} id="published" className="w-5 h-5 rounded-lg border-slate-300 text-gov-blue-700 focus:ring-gov-blue-700" />
        <label htmlFor="published" className="text-sm font-bold text-gov-blue-900">Publicado</label>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-gov-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {article ? 'Atualizar Notícia' : 'Criar Notícia'}
        </button>
      </div>
    </form>
  );
};
