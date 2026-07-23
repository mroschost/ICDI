import React from 'react';
import { motion } from 'motion/react';
import { getSafeImageUrl } from '../../lib/imageUtils';

const pillars = [
  { n: '01', title: 'Missão', text: 'Promover inclusão social, capacitação e desenvolvimento por meio da cultura, educação e inovação.' },
  { n: '02', title: 'Visão', text: 'Ser referência em projetos de impacto social, cultural e educacional no Distrito Federal e no Brasil.' },
  { n: '03', title: 'Valores', text: 'Ética, diversidade, inovação, valorização humana, transparência e responsabilidade com resultados.' },
];

export const AboutSection = () => (
  <section id="about" className="overflow-hidden bg-[#f7f7f7] py-20 md:py-32">
    <div className="mx-auto grid max-w-[1500px] items-stretch lg:grid-cols-[.92fr_1.08fr]">
      <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="relative min-h-[580px] overflow-hidden lg:min-h-[820px]">
        <img src={getSafeImageUrl('/eventos_v2/fotos/foto_02_pagina_05.jpg')} alt="Cultura e comunidade em projeto do ICDI" className="absolute inset-0 h-full w-full object-cover object-center" style={{ aspectRatio: '492 / 463' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2368]/85 via-transparent to-transparent" />
        <motion.div className="absolute -right-16 top-16 h-44 w-44 rounded-full border-[32px] border-[#FBF137]" animate={{rotate:360}} transition={{duration:28,repeat:Infinity,ease:'linear'}} />
        <div className="absolute bottom-0 left-0 max-w-lg bg-[#2A2368] p-8 text-white md:p-12">
          <span className="text-xs font-semibold uppercase tracking-[.22em] text-[#FBF137]">Desde o território</span>
          <p className="mt-5 text-2xl font-medium leading-snug md:text-3xl">Criamos oportunidades para que pessoas e comunidades protagonizem suas próprias transformações.</p>
        </div>
      </motion.div>

      <div className="relative bg-white px-7 py-16 md:px-16 md:py-24 lg:px-20">
        <div className="absolute right-0 top-0 h-3 w-1/3 bg-[#DE5121]" />
        <span className="text-xs font-semibold uppercase tracking-[.24em] text-[#DE5121]">Quem somos</span>
        <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-.055em] text-[#2A2368] md:text-6xl">A cultura abre caminhos. O ICDI transforma esses caminhos em futuro.</h2>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-[#2A2368]/65 md:text-base">O Instituto de Capacitação, Desenvolvimento e Inovação atua no Distrito Federal conectando cultura, educação e geração de oportunidades. Cada projeto nasce da escuta e se realiza junto às comunidades.</p>

        <div className="mt-14 border-t border-[#2A2368]/15">
          {pillars.map((item, i) => (
            <motion.div key={item.n} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}} className="grid gap-3 border-b border-[#2A2368]/15 py-7 md:grid-cols-[64px_130px_1fr] md:items-start">
              <span className="text-xs font-semibold text-[#DE5121]">{item.n}</span>
              <h3 className="text-lg font-semibold text-[#2A2368]">{item.title}</h3>
              <p className="text-sm leading-6 text-[#2A2368]/60">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {['Compromisso social','Inclusão','Diversidade','Inovação','Transparência'].map((v,i)=><span key={v} className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[.15em] ${i===1?'bg-[#FBF137]':'bg-[#2A2368] text-white'}`}>{v}</span>)}
        </div>
      </div>
    </div>
  </section>
);
