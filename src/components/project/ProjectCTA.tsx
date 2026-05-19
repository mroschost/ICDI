import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectCTA = () => {
  return (
    <section className="px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto bg-gov-blue-700 p-8 md:p-20 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8 serif italic">Impacto que transforma vidas.</h2>
        <p className="text-base md:text-lg text-gov-blue-50 max-w-2xl mx-auto mb-8 md:mb-10 opacity-80">Continuamos trabalhando para expandir nossas frentes de atuacao e levar dignidade a mais pessoas no Distrito Federal.</p>
        <Link
          to="/#projects"
          className="px-8 md:px-10 py-4 md:py-5 bg-gov-yellow text-gov-blue-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg inline-block"
        >
          Conheca outros projetos
        </Link>
      </div>
    </section>
  );
};
