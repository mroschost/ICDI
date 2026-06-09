import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getSafeImageUrl } from '../../lib/imageUtils';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section id="projects" className="py-12 md:py-24 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
        <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-600 mb-4 md:mb-6 block">Atuação Institucional</span>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-8 text-gov-blue-900">Eixos de Impacto</h2>
        <p className="text-sm md:text-lg text-slate-600 leading-relaxed px-2 md:px-0">Desenvolvemos estrategias solidas para o desenvolvimento humano e social no DF. Clique para ver detalhes.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="gov-card overflow-hidden flex flex-col group h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <Link
                to={`/projeto/${project.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Abrir projeto: ${project.title}`}
                title="Abrir projeto"
              />
              <img
                src={getSafeImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-white shadow-lg z-10`}>
                <LucideIcon name={project.iconName} className="w-6 h-6" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gov-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="text-[0.625rem] md:text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  PRO-0{i + 1}
                </div>
              </div>

              <Link to={`/projeto/${project.slug}`} className="block">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gov-blue-900 group-hover:text-gov-blue-700 transition-colors leading-tight">
                  {project.title}
                </h3>
              </Link>

              <Link to={`/projeto/${project.slug}`} className="block">
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3">
                  {project.description}
                </p>
              </Link>

              <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100">
                <Link
                  to={`/projeto/${project.slug}`}
                  className="flex items-center gap-2 text-[0.625rem] font-black text-gov-blue-700 hover:text-gov-blue-900 transition-colors uppercase tracking-widest group-hover:gap-3"
                >
                  Explorar Projeto <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
