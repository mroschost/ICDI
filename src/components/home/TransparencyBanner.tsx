import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransparencyBanner = () => {
  return (
    <section id="transparency" className="py-12 md:py-20 px-6 bg-gov-blue-50">
      <div className="max-w-7xl mx-auto bg-white p-8 md:p-20 rounded-3xl text-center relative overflow-hidden border border-slate-200 shadow-xl">
         <div className="gov-section-stripe absolute top-0 left-0"></div>
         <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8 text-gov-blue-900 serif italic">Portal da Transparência</h2>
         <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-8 md:mb-12">Consulte todos os relatórios de atividades, parcerias e prestação de contas de forma aberta e acessível.</p>
         <Link to="/transparencia" className="px-10 md:px-12 py-4 md:py-5 bg-gov-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all shadow-lg flex items-center gap-3 mx-auto w-fit">
            <BookOpen className="w-5 h-5" /> Acessar Documentos
         </Link>
      </div>
    </section>
  );
};
