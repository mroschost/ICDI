import React from 'react';
import { motion } from 'motion/react';

export const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#2A2368] px-6 py-16 text-white md:py-20">
      <motion.div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[42px] border-[#3B58AF]" animate={{rotate:360}} transition={{duration:40,repeat:Infinity,ease:'linear'}} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-xl"><span className="text-xs font-semibold uppercase tracking-[.24em] text-[#FBF137]">Impacto que se mede</span><h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Transformação presente em todo o Distrito Federal.</h2></div>
        <div className="grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
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
              className="relative bg-[#2A2368] p-6 md:p-9"
            >
              <span className="absolute right-4 top-4 h-2 w-2 bg-[#DE5121]" />
              <h3 className="mb-2 text-5xl font-semibold tracking-[-.06em] text-[#FBF137] md:text-6xl">{stat.n}</h3>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[.18em] text-white/55">{stat.t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
