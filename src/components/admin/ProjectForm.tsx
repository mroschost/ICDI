import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, Image as ImageIcon, CheckCircle2, Save } from 'lucide-react';
import { LucideIcon } from '../LucideIcon';
import { MediaManager } from '../MediaManager';
import { Project } from '../../types';
import { projectService } from '../../services/projectService';
import { getSafeImageUrl } from '../../lib/imageUtils';

const projectSchema = z.object({
  title: z.string().min(3, 'Título é obrigatório'),
  slug: z.string().min(3, 'Slug é obrigatório'),
  description: z.string().min(10, 'Descrição curta é obrigatória'),
  fullDescription: z.string().min(20, 'Descrição completa é obrigatória'),
  image: z.string().min(1, 'Imagem é obrigatória'),
  color: z.string().min(3, 'Cor é obrigatória (ex: bg-blue-500)'),
  iconName: z.string().min(3, 'Nome do ícone Lucide é obrigatório'),
  objectives: z.array(z.string()).min(1, 'Pelo menos um objetivo'),
  results: z.array(z.string()).min(1, 'Pelo menos um resultado'),
  gallery: z.array(z.string()).optional(),
  transparency: z.array(z.string()).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project: Project | null;
  onSuccess: () => void;
}

const PREDEFINED_COLORS = [
  'bg-blue-500', 'bg-indigo-500', 'bg-green-500', 'bg-orange-500', 
  'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-teal-500', 
  'bg-yellow-500', 'bg-slate-500'
];

const PREDEFINED_ICONS = [
  'Theater', 'Users', 'Music', 'Heart', 'MapPin', 'BookOpen', 
  'GraduationCap', 'Sun', 'Star', 'Camera', 'Film', 'Mic',
  'Palette', 'Globe', 'Zap', 'Award'
];

export const ProjectForm = ({ project, onSuccess }: ProjectFormProps) => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      objectives: [''],
      results: [''],
      gallery: [],
      transparency: [],
      color: 'bg-blue-500',
      iconName: 'Theater'
    }
  });

  const { fields: objFields, append: appendObj, remove: removeObj } = useFieldArray({
    control: control as any,
    name: "objectives"
  });

  const { fields: resFields, append: appendRes, remove: removeRes } = useFieldArray({
    control: control as any,
    name: "results"
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (project?.id) {
        await projectService.update(project.id, data);
      } else {
        await projectService.create(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-4 block">Capa do Projeto (Hero)</label>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200 group">
                    {field.value ? (
                      <img 
                        src={getSafeImageUrl(field.value)} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                        <span className="text-[0.625rem] font-bold uppercase tracking-widest">Nenhuma imagem</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Cole a URL da imagem:');
                          if (url) field.onChange(url);
                        }}
                        className="px-4 py-2 bg-white text-gov-blue-700 rounded-xl font-bold text-[0.625rem] uppercase tracking-widest hover:bg-gov-blue-50 transition-all shadow-lg"
                      >
                        Alterar por URL
                      </button>
                    </div>
                  </div>

                  {/* Pick from Gallery */}
                  <div className="space-y-2">
                    <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-500">Selecionar da Galeria</p>
                    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
                      {watch('gallery')?.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => field.onChange(img)}
                          className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${field.value === img ? 'border-gov-blue-700 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img 
                            src={getSafeImageUrl(img)} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                          {field.value === img && (
                            <div className="absolute inset-0 bg-gov-blue-700/20 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                      {(!watch('gallery') || watch('gallery').length === 0) && (
                        <p className="text-[0.625rem] text-slate-300 italic py-2">Adicione fotos na galeria abaixo para selecioná-las como capa.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            />
            {errors.image && <span className="text-red-500 text-[0.625rem] mt-1 font-bold">{errors.image.message}</span>}
          </div>

          <div>
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Título do Projeto</label>
            <input 
              {...register('title')} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all"
              placeholder="Ex: Teatro Vai à Escola"
            />
            {errors.title && <p className="text-red-500 text-[0.625rem] mt-2 italic">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Slug (URL)</label>
            <input 
              {...register('slug')} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all"
              placeholder="ex: teatro-vai-a-escola"
            />
            {errors.slug && <p className="text-red-500 text-[0.625rem] mt-2 italic">{errors.slug.message}</p>}
          </div>
        </div>

        {/* Styling Info */}
        <div className="space-y-10">
          <div>
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-4 block">Cor do Projeto</label>
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <div className="grid grid-cols-5 gap-3">
                  {PREDEFINED_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => field.onChange(c)}
                      className={`h-10 rounded-xl transition-all border-2 ${field.value === c ? 'border-gov-blue-700 scale-110 shadow-lg' : 'border-transparent hover:scale-105'} ${c}`}
                    />
                  ))}
                </div>
              )}
            />
          </div>
          
          <div>
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-4 block">Ícone Representativo</label>
            <Controller
              control={control}
              name="iconName"
              render={({ field }) => (
                <div className="grid grid-cols-4 gap-3">
                  {PREDEFINED_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => field.onChange(icon)}
                      className={`h-12 rounded-xl flex items-center justify-center transition-all bg-slate-50 border-2 ${field.value === icon ? 'border-gov-blue-700 bg-white text-gov-blue-700 shadow-md' : 'border-slate-100 text-slate-400 hover:bg-white hover:text-gov-blue-700'}`}
                    >
                      <LucideIcon name={icon} className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
        </div>

        <div className="md:col-span-2">
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Descrição Curta</label>
            <textarea 
              {...register('description')} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm h-24 resize-none focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all"
            />
        </div>

        <div className="md:col-span-2">
            <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Descrição Completa</label>
            <textarea 
              {...register('fullDescription')} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm h-48 resize-none focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all"
            />
        </div>
      </div>

      {/* Dinamic Arrays */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Objectives */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gov-blue-900 uppercase tracking-widest">Objetivos</h3>
            <button type="button" onClick={() => appendObj('')} className="p-2 text-gov-blue-700 hover:bg-gov-blue-50 rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {objFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input 
                  {...register(`objectives.${index}` as const)} 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs outline-none focus:ring-2 focus:ring-gov-blue-700"
                />
                <button type="button" onClick={() => removeObj(index)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gov-blue-900 uppercase tracking-widest">Resultados</h3>
            <button type="button" onClick={() => appendRes('')} className="p-2 text-gov-blue-700 hover:bg-gov-blue-50 rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {resFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input 
                  {...register(`results.${index}` as const)} 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs outline-none focus:ring-2 focus:ring-gov-blue-700"
                />
                <button type="button" onClick={() => removeRes(index)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="md:col-span-2">
          <Controller
            control={control}
            name="gallery"
            render={({ field }) => (
              <MediaManager
                title="Galeria de Fotos"
                type="gallery"
                items={field.value || []}
                onChange={field.onChange}
                projectId={project?.id || 'new'}
              />
            )}
          />
        </section>

        {/* Transparency */}
        <section className="md:col-span-2">
          <Controller
            control={control}
            name="transparency"
            render={({ field }) => (
              <MediaManager
                title="Documentos de Transparência"
                type="transparency"
                items={field.value || []}
                onChange={field.onChange}
                projectId={project?.id || 'new'}
              />
            )}
          />
        </section>
      </div>

      <div className="pt-10 border-t border-slate-100 flex justify-end gap-4">
        <button 
          disabled={isSubmitting}
          type="submit" 
          className="px-12 py-5 bg-gov-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all shadow-xl disabled:opacity-50 flex items-center gap-3"
        >
          {isSubmitting ? 'Salvando...' : <><Save className="w-5 h-5" /> Salvar Projeto</>}
        </button>
      </div>
    </form>
  );
};
