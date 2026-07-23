import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from '../LucideIcon';

const pillars = [
  {
    title: 'Inclusão Social e Desenvolvimento',
    text: 'Promovemos ações que ampliam oportunidades, fortalecem comunidades e contribuem para o desenvolvimento humano e a inclusão social.',
    icon: 'Globe'
  },
  {
    title: 'Inovação e Tecnologia',
    text: 'Utilizamos a tecnologia como ferramenta de transformação, incentivando o acesso ao conhecimento, à criatividade e às novas oportunidades.',
    icon: 'Lightbulb'
  },
  {
    title: 'Defesa dos Direitos e Cidadania',
    text: 'Desenvolvemos projetos que fortalecem a cidadania, promovem a participação social e incentivam o respeito aos direitos fundamentais.',
    icon: 'Shield'
  },
  {
    title: 'Formação Lúdica e Criativa',
    text: 'Valorizamos metodologias que estimulam a criatividade, a aprendizagem, a convivência e o desenvolvimento de habilidades por meio de experiências educativas e culturais.',
    icon: 'Palette'
  },
  {
    title: 'Cultura como Ferramenta de Transformação',
    text: 'Acreditamos na cultura como instrumento de inclusão, valorização da identidade e fortalecimento dos vínculos comunitários, promovendo acesso à arte em suas diversas expressões.',
    icon: 'BookOpen'
  },
  {
    title: 'Experiências que Transformam',
    text: 'Criamos vivências que inspiram, desenvolvem talentos e deixam impactos positivos duradouros na vida das pessoas e das comunidades.',
    icon: 'Star'
  }
];

export const PilaresSection = () => (
  <section className="overflow-hidden bg-white px-6 py-20 md:py-32">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[.24em] text-[#DE5121]">
          Nossos Pilares
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.055em] text-[#2A2368] md:text-5xl">
          O que sustenta nossa atuação
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group cursor-default rounded-2xl border border-[#2A2368]/10 bg-[#f7f7f7] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#DE5121]/30 hover:shadow-lg hover:shadow-[#DE5121]/5"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2A2368] text-white transition-colors duration-300 group-hover:bg-[#DE5121]">
              <LucideIcon name={pillar.icon} className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[#2A2368]">
              {pillar.title}
            </h3>
            <p className="text-sm leading-6 text-[#2A2368]/60">
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
