import React from 'react';
import { CheckCircle2, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';

interface ProjectContentProps {
  project: Project;
}

export const ProjectContent = ({ project }: ProjectContentProps) => {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-7 space-y-10 md:space-y-12">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gov-blue-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gov-yellow"></span> Sobre a Iniciativa
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gov-blue-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-gov-blue-700" /> Objetivos Principais
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-4 p-4 md:p-5 bg-slate-50 border border-slate-100 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gov-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm font-medium text-slate-700">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gov-blue-900 p-8 md:p-10 rounded-3xl text-white shadow-xl lg:sticky lg:top-32">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3 italic serif">
                <BarChart3 className="w-6 h-6 text-gov-yellow" /> Indicadores de Sucesso
              </h2>
              <div className="space-y-6 md:space-y-8">
                {project.results.map((res, i) => (
                  <div key={i} className="border-l-2 border-white/20 pl-4 md:pl-6 group">
                    <p className="text-[0.625rem] font-bold text-gov-yellow uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">Resultado {i + 1}</p>
                    <p className="text-base md:text-lg font-medium text-white/90 leading-tight">
                      {res}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
                 <p className="text-[0.625rem] font-bold uppercase tracking-widest text-white/40 mb-4">Deseja saber mais?</p>
                 <Link 
                   to="/#contact" 
                   className="w-full py-4 bg-white text-gov-blue-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gov-yellow transition-all flex items-center justify-center gap-2"
                 >
                   Entrar em contato
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
