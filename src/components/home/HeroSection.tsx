import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { getSafeImageUrl, handleImageError } from '../../lib/imageUtils';

interface HeroSectionProps {
  projects: Project[];
  currentProjectIndex: number;
  setCurrentProjectIndex: (index: number) => void;
}

export const HeroSection = ({ projects, currentProjectIndex, setCurrentProjectIndex }: HeroSectionProps) => {
  return (
    <section id="home" className="pt-28 md:pt-40 pb-12 md:pb-32 px-6 bg-gov-blue-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gov-blue-100/50 -skew-x-12 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-10 h-1 bg-gov-yellow rounded-full"></span>
            <span className="text-[0.625rem] font-black uppercase tracking-[0.2em] text-gov-blue-700">
              Cultura - Inovação - Capacitação
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4 md:mb-8 text-gov-blue-900">
            Transformando vidas <br />
            <span className="text-gov-blue-600 underline decoration-gov-yellow decoration-8 underline-offset-8">atraves da cultura</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-10 max-w-lg leading-relaxed">
            Conheça nossa história e veja como planejamos construir um futuro mais justo e inclusivo para todos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projetos" className="px-8 py-4 bg-gov-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all flex items-center gap-3 group shadow-lg">
              Conheça os Projetos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#about" className="px-8 py-4 bg-white border border-slate-200 rounded-lg font-bold text-xs uppercase tracking-widest hover:border-gov-blue-700 hover:text-gov-blue-700 transition-all text-slate-600">
              Quem Somos
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative">
            <motion.div
              key={currentProjectIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={getSafeImageUrl(projects[currentProjectIndex].image)}
                alt={projects[currentProjectIndex].title}
                className="w-full h-full object-cover"
                decoding="async"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gov-blue-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gov-yellow font-black text-[0.625rem] uppercase tracking-widest mb-1">Destaque ICDI</p>
                <h3 className="text-white font-bold text-2xl tracking-tight">{projects[currentProjectIndex].title}</h3>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentProjectIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentProjectIndex ? 'bg-gov-yellow w-6' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>

          <div className="absolute -bottom-6 -left-6 bg-gov-yellow text-gov-blue-900 px-6 py-2 rounded-xl shadow-xl z-20 flex items-center gap-3">
            <span className="text-3xl font-black italic serif leading-none">20+</span>
            <span className="text-[0.625rem] font-black uppercase tracking-widest whitespace-nowrap block">Projetos Executados</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
