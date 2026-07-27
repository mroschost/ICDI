import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getSafeImageUrl, handleImageError } from '../../lib/imageUtils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="gov-card overflow-hidden flex flex-col group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <Link
          to={`/projeto/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Abrir projeto: ${project.title}`}
          title="Abrir projeto"
        />
        <img 
          src={getSafeImageUrl(project.image)} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
        />
        <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-white shadow-lg z-10`}>
          <LucideIcon name={project.iconName} className="w-6 h-6" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gov-blue-900/80 via-gov-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
           <span className="text-white text-[0.625rem] font-black uppercase tracking-widest">Ver Detalhes</span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <span className="text-[0.625rem] md:text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
            PRO-0{index + 1}
          </span>
          <span className="w-1 m-1 rounded-full bg-slate-200"></span>
          <span className="text-[0.625rem] md:text-xs font-bold text-gov-blue-600 uppercase tracking-widest">
            {project.slug.split('-')[0]}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gov-blue-900 group-hover:text-gov-blue-700 transition-colors leading-tight">
          <Link to={`/projeto/${project.slug}`} className="block">
            {project.title}
          </Link>
        </h3>
        
        <Link to={`/projeto/${project.slug}`} className="block">
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3">
            {project.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link 
            to={`/projeto/${project.slug}`} 
            className="flex items-center gap-2 text-[0.625rem] font-black text-gov-blue-700 hover:text-gov-blue-900 transition-colors uppercase tracking-widest"
          >
            Explorar <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex -space-x-2">
            {[1, 2, 3].map(item => (
              <div key={item} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 text-[0.5rem] flex items-center justify-center font-bold text-slate-400">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
