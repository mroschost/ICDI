import React from 'react';
import { motion } from 'motion/react';
import { getSafeImageUrl } from '../../lib/imageUtils';

const pillars = [
  { n: '01', title: 'Missão', text: 'Transformar vidas por meio da educação, cultura, inovação e inclusão social, criando oportunidades reais para comunidades e pessoas.' },
  { n: '02', title: 'Visão', text: 'Ser referência no desenvolvimento de projetos de impacto social, cultural e educacional no Distrito Federal e em todo o Brasil.' },
  { n: '03', title: 'Valores', text: 'Compromisso social, ética e transparência, inclusão e diversidade, inovação, valorização humana e responsabilidade com resultados.' },
];

const values = ['Compromisso Social', 'Ética e Transparência', 'Inclusão e Diversidade', 'Inovação', 'Valorização Humana', 'Responsabilidade com Resultados'];

export const AboutSection = () => {
  const [showHistory, setShowHistory] = React.useState(false);

  return (
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
          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#2A2368]/65 md:text-base">O ICDI - Instituto de Capacitação, Desenvolvimento e Inovação é uma organização comprometida com a transformação social por meio da cultura, da educação, da inovação e da geração de oportunidades. Atuamos no Distrito Federal desenvolvendo projetos que impactam crianças, adolescentes, jovens e comunidades, promovendo inclusão, cidadania e desenvolvimento humano.</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#2A2368]/65 md:text-base">Acreditamos que o acesso ao conhecimento, à arte e às oportunidades pode mudar realidades. Por isso, criamos iniciativas que fortalecem talentos, aproximam pessoas e constroem caminhos para um futuro mais justo, criativo e sustentável.</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#2A2368]/65 md:text-base">Com experiência na execução de projetos culturais, educacionais e sociais, o ICDI conecta propósito e resultado, sempre valorizando pessoas, territórios e parcerias.</p>

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
            {values.map((v,i)=><span key={v} className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[.15em] ${i%2===0?'bg-[#2A2368] text-white':'bg-[#FBF137]'}`}>{v}</span>)}
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center gap-2 border border-[#DE5121] px-6 py-3 text-xs font-semibold uppercase tracking-[.15em] text-[#DE5121] transition-colors hover:bg-[#DE5121] hover:text-white"
            >
              {showHistory ? 'Fechar' : 'Conheça nossa história'}
              <span className={`inline-block transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 overflow-hidden"
              >
                <p className="max-w-2xl text-sm leading-7 text-[#2A2368]/65 md:text-base">
                  O Instituto de Capacitação, Desenvolvimento e Inovação (ICDI) é uma organização da sociedade civil com sede no Riacho Fundo (DF), dedicada a transformar vidas por meio da educação, da cultura, da inovação, da capacitação profissional, da empregabilidade e do desenvolvimento social. Com uma equipe comprometida e uma gestão pautada na responsabilidade e na transparência, o Instituto desenvolve projetos que ampliam oportunidades, fortalecem comunidades e promovem impacto social em diversas regiões do Distrito Federal.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
