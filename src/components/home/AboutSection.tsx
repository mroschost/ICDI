import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="bg-gov-blue-900 p-8 md:p-20 rounded-3xl relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 md:mb-12 italic serif">Nossa Essencia</h2>
          <div className="space-y-8 md:space-y-10">
            {[
              {
                title: 'Nossa Missao',
                text: 'Promover inclusao social, capacitacao profissional e desenvolvimento sustentavel por meio de acoes educativas, culturais e de apoio voltadas a comunidades em situacao de vulnerabilidade.'
              },
              {
                title: 'Nossa Visao',
                text: 'Ser referencia no desenvolvimento de projetos de impacto social, cultural e educacional no Distrito Federal e em todo o Brasil.'
              },
              {
                title: 'Nossos Valores',
                text: 'Compromisso social, etica e transparencia, inclusao e diversidade, inovacao, valorizacao humana e responsabilidade com resultados.'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 md:gap-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gov-yellow flex items-center justify-center text-gov-blue-900 shrink-0 text-xs md:text-sm font-black">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-gov-blue-100 text-xs md:text-sm leading-relaxed opacity-90">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="gov-section-stripe mb-6 md:mb-8 w-16"></div>
          <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-gov-blue-900 mb-8 md:mb-10 serif italic">
            ICDI: Promovendo <span className="text-gov-blue-600">inclusao e transformacao social</span>.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10 max-w-2xl">
            O ICDI - Instituto de Capacitacao, Desenvolvimento e Inovacao e uma organizacao comprometida com a transformacao social por meio da cultura, da educacao, da inovacao e da geracao de oportunidades. Atuamos no Distrito Federal desenvolvendo projetos que impactam criancas, adolescentes, jovens e comunidades.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Compromisso Social',
              'Etica e Transparencia',
              'Inclusao e Diversidade',
              'Inovacao',
              'Valorizacao Humana',
              'Responsabilidade com Resultados'
            ].map((val, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-gov-yellow"></div>
                <span className="text-[0.625rem] font-bold uppercase tracking-widest text-slate-600">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
