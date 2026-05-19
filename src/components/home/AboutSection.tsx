import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="bg-gov-blue-900 p-8 md:p-20 rounded-3xl relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 md:mb-12 italic serif">Sobre a Instituicao</h2>
          <div className="space-y-8 md:space-y-10">
            {[
              {
                title: 'Sobre Nos',
                text: 'O ICDI nasceu com o proposito de transformar vidas por meio da cultura, da educacao e da inovacao, com foco em criancas, adolescentes e jovens em situacao de vulnerabilidade social.'
              },
              {
                title: 'Direito ao Acesso',
                text: 'Acreditamos que o acesso ao conhecimento, a arte e ao desenvolvimento pessoal e um direito de todos. Por isso, criamos pontes entre a comunidade e ferramentas que impulsionam mudancas reais.'
              },
              {
                title: 'Atuacao Integrada',
                text: 'Com uma equipe comprometida e acoes que integram cultura, capacitacao e inclusao, o ICDI atua para construir um futuro mais justo, criativo e cheio de possibilidades.'
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
            Cultura, cidadania e <span className="text-gov-blue-600">inovacao social</span> como motores de transformacao.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Defesa dos Direitos e Cidadania',
              'Inovacao e Tecnologia na Infancia',
              'Inclusao Social e Desenvolvimento',
              'Formacao Ludica e Criativa',
              'Experiencias que Transformam',
              'Cultura como Ferramenta de Transformacao'
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
