import React from 'react';
import { motion } from 'motion/react';

export const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 px-6 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { n: '25', t: 'Escolas Públicas' },
            { n: '90', t: 'Empresas Parceiras' },
            { n: '5k+', t: 'Vagas de Emprego' },
            { n: 'DF', t: 'Presença Regional' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 md:p-8 border-l border-slate-100"
            >
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-gov-blue-700 serif italic">{stat.n}</h3>
              <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-500">{stat.t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
