import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getSafeImageUrl, handleImageError } from '../../lib/imageUtils';

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 bg-gov-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <Link
          to="/#projects"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gov-blue-700 mb-6 md:mb-8 hover:text-gov-blue-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar aos Projetos
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-10 h-1 bg-gov-yellow rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-blue-700">
                Projeto Institucional
              </span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gov-blue-900 mb-6 md:mb-8">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 md:mb-8">
              {project.description}
            </p>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${project.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <LucideIcon name={project.iconName} className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                Iniciativa ICDI • Brasília - DF
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[16/10] bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={getSafeImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
