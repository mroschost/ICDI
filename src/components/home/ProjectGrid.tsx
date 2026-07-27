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
    <section id="projects" className="bg-[#eceef1] px-6 py-20 md:py-28">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
        <div className="max-w-3xl"><span className="mb-5 block text-xs font-semibold uppercase tracking-[.22em] text-[#DE5121]">Atuação institucional</span><h2 className="text-4xl font-semibold leading-[1.04] tracking-[-.05em] text-[#2A2368] md:text-7xl">Projetos que deixam marcas reais.</h2></div>
        <p className="max-w-sm text-sm leading-7 text-[#2A2368]/60">Cultura, formação e oportunidade conectadas às pessoas e aos territórios do Distrito Federal.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-12 gap-5">
        {projects.slice(0,6).map((project, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`group relative overflow-hidden bg-white text-[#2A2368] shadow-[0_12px_40px_rgba(42,35,104,0.08)] ${i < 2 ? 'lg:col-span-6' : 'lg:col-span-3'}`}
          >
            <div className={`relative overflow-hidden ${i < 2 ? 'h-80' : 'h-64'}`}>
              <Link
                to={`/projeto/${project.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Abrir projeto: ${project.title}`}
                title="Abrir projeto"
              />
              <img
                src={getSafeImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2368] via-[#2A2368]/10 to-transparent"/><div className={`absolute top-4 left-4 w-10 h-10 ${project.color} flex items-center justify-center text-white z-10`}>
                <LucideIcon name={project.iconName} className="w-6 h-6" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gov-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 md:p-7 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="text-[0.625rem] md:text-xs font-bold text-[#3B58AF]/55 uppercase tracking-widest font-mono">
                  PRO-0{i + 1}
                </div>
              </div>

              <Link to={`/projeto/${project.slug}`} className="block">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#2A2368] transition-colors leading-tight group-hover:text-[#3B58AF]">
                  {project.title}
                </h3>
              </Link>

              <Link to={`/projeto/${project.slug}`} className="block">
                <p className="text-[#2A2368]/60 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
                  {project.description}
                </p>
              </Link>

              <div className="mt-auto pt-4 md:pt-6 border-t border-[#2A2368]/10">
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
