import React from 'react';
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { Project } from '../../types';
import { getSafeImageUrl, handleImageError } from '../../lib/imageUtils';

interface ProjectGalleryProps {
  project: Project;
  onSelectMedia: (media: { url: string; title: string; index: number }) => void;
}

export const ProjectGallery = ({ project, onSelectMedia }: ProjectGalleryProps) => {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gov-blue-900 mb-8 md:mb-12 flex items-center gap-3">
          <span className="w-8 h-px bg-gov-yellow"></span> Galeria do Projeto
        </h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 cursor-pointer"
              onClick={() => onSelectMedia({ url: img, title: `${project.title} - Imagem ${i + 1}`, index: i })}
            >
              <img
                src={getSafeImageUrl(img)}
                alt={`${project.title} - Imagem ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gov-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <Eye className="w-8 h-8 text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                <p className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Visualizar Ampliado
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
