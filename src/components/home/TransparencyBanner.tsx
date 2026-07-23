import React from 'react';
import { ArrowUpRight, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const TransparencyBanner = () => {
  return (
    <section id="transparency" className="bg-[#FBF137] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#f7f7f7] lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative p-8 md:p-16 lg:p-20">
          <span className="text-xs font-semibold uppercase tracking-[.22em] text-[#DE5121]">Compromisso público</span>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-.05em] text-[#2A2368] md:text-6xl">Transparência não é uma seção. É um valor.</h2>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#2A2368]/65 md:text-base">Acompanhe documentos, registros, parcerias e prestações de contas de cada iniciativa realizada pelo ICDI.</p>
          <Link to="/transparencia" className="mt-9 inline-flex items-center gap-3 bg-[#2A2368] px-7 py-4 text-xs font-semibold uppercase tracking-[.14em] text-white transition-transform hover:-translate-y-1">Acessar documentos <ArrowUpRight className="h-4 w-4"/></Link>
        </div>
        <div className="relative grid min-h-[360px] place-items-center overflow-hidden bg-[#3B58AF] p-10 text-white">
          <motion.div className="absolute h-72 w-72 rounded-full border-[52px] border-[#2A2368]/45" animate={{rotate:360}} transition={{duration:36,repeat:Infinity,ease:'linear'}} />
          <div className="relative z-10 grid gap-4">
            <div className="flex items-center gap-4 border border-white/20 bg-white/10 p-5 backdrop-blur"><ShieldCheck className="text-[#FBF137]"/><span className="font-semibold">Gestão responsável</span></div>
            <div className="flex items-center gap-4 border border-white/20 bg-white/10 p-5 backdrop-blur"><FileCheck2 className="text-[#FBF137]"/><span className="font-semibold">Documentos acessíveis</span></div>
            <div className="flex items-center gap-4 border border-white/20 bg-white/10 p-5 backdrop-blur"><BookOpen className="text-[#FBF137]"/><span className="font-semibold">Prestação de contas</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
