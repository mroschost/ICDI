import React from 'react';
import { Target, TrendingUp, Heart, Users, BookOpen, Music } from 'lucide-react';

const areas = [
  {
    icon: Music,
    title: 'Cultura e Artes',
    description: 'Promoção de eventos culturais, festivais, apresentações teatrais e musicais que valorizam a cultura popular e o acesso à arte em comunidades do Distrito Federal.',
    color: 'bg-amber-500',
    items: ['Festivais culturais', 'Apresentações artísticas', 'Teatro nas escolas', 'Valorização da cultura popular']
  },
  {
    icon: TrendingUp,
    title: 'Desenvolvimento Econômico',
    description: 'Realização de feirões de emprego, capacitação profissional e ações que conectam trabalhadores a oportunidades de renda e crescimento profissional.',
    color: 'bg-green-500',
    items: ['Feirões de emprego', 'Geração de renda', 'Microempreendedorismo', 'Parcerias com empresas']
  },
  {
    icon: BookOpen,
    title: 'Educação e Capacitação',
    description: 'Projetos educacionais que complementam a formação de crianças, jovens e adultos, promovendo conhecimento e desenvolvimento pessoal.',
    color: 'bg-violet-500',
    items: ['Atividades extracurriculares', 'Oficinas educativas', 'Formação cidadã', 'Arte-educação']
  },
  {
    icon: Heart,
    title: 'Inclusão Social',
    description: 'Iniciativas que promovem a inclusão de comunidades em situação de vulnerabilidade por meio de ações culturais, educativas e de cidadania.',
    color: 'bg-pink-500',
    items: ['Inclusão comunitária', 'Acesso a direitos', 'Ocupação de espaços públicos', 'Fortalecimento de vínculos']
  },
  {
    icon: Users,
    title: 'Fortalecimento Comunitário',
    description: 'Ações que estimulam a participação popular, o associativismo e a construção coletiva de soluções para os desafios locais.',
    color: 'bg-blue-500',
    items: ['Participação popular', 'Eventos comunitários', 'Articulação local', 'Redes de colaboração']
  },
  {
    icon: Target,
    title: 'Políticas Públicas',
    description: 'Articulação com órgãos governamentais para implementação de políticas públicas de cultura, educação, trabalho e assistência social.',
    color: 'bg-teal-500',
    items: ['Parcerias institucionais', 'Termos de fomento', 'Gestão de projetos', 'Transparência pública']
  }
];

export const AreasDeAtuacao = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gov-yellow rounded-full" />
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">ICDI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gov-blue-900 mb-4">Áreas de Atuação</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Conheça as frentes de trabalho do ICDI e como atuamos para transformar realidades no Distrito Federal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${area.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gov-blue-900 mb-4">{area.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{area.description}</p>
                <ul className="space-y-2">
                  {area.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gov-blue-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
