import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export const TransparencyHero = () => {
  return (
    <section className="bg-gov-blue-900 pt-28 md:pt-40 pb-16 md:pb-24 px-6 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gov-yellow/10 skew-x-12 translate-x-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-px bg-gov-yellow" />
              <span className="text-gov-yellow font-bold tracking-[0.2em] uppercase text-xs">Portal da Transparência</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 md:mb-8">
              Documentação e <br />
              <span className="text-white/60">Prestação de Contas</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              Acesso público aos documentos, relatórios e registros fotográficos que comprovam a execução e o impacto de cada projeto do ICDI.
            </p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 w-fit"
          >
            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-gov-yellow mb-3 md:mb-4" />
            <div className="text-2xl md:text-3xl font-bold mb-1">100%</div>
            <div className="text-[0.625rem] md:text-sm text-white/60 uppercase tracking-wider">Transparência Ativa</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
