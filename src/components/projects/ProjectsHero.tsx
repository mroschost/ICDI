import React from 'react';
import { motion } from 'motion/react';

export const ProjectsHero = () => {
  return (
    <section className="px-6 mb-8 md:mb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-10 h-1 bg-gov-yellow rounded-full"></span>
            <span className="text-[0.625rem] font-black uppercase tracking-[0.2em] text-gov-blue-700">
              Portfólio Institucional
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-8 text-gov-blue-900 leading-tight">
            Nossos <span className="text-gov-blue-600 italic serif">Projetos</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Conheça as iniciativas que transformam a realidade do Distrito Federal. Atuamos em diversas áreas, da cultura à empregabilidade, sempre com foco no desenvolvimento humano.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
