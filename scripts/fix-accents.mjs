import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'README.md',
  'metadata.json',
  'deploy/icdi_hostinger.sql',
  'src/constants.tsx',
  'src/components/home/AboutSection.tsx',
  'src/components/home/ContactSection.tsx'
];

const replacements = [
  ['ArraiÃ¡', 'Arraiá'],
  ['CandangÃ£o', 'Candangão'],
  ['MÃºsica', 'Música'],
  ['Festival da CrianÃ§a', 'Festival da Criança'],
  ['CandangolÃ¢ndia', 'Candangolândia'],
  ['CeilÃ¢ndia', 'Ceilândia'],
  ['NÃºcleo', 'Núcleo'],
  ['BrasÃ­lia', 'Brasília'],
  ['FeirÃ£o', 'Feirão'],
  ['VarjÃ£o', 'Varjão'],
  ['essencia', 'essência'],
  ['Essencia', 'Essência'],
  ['missao', 'missão'],
  ['Missao', 'Missão'],
  ['visao', 'visão'],
  ['Visao', 'Visão'],
  ['aÃ§Ãµes', 'ações'],
  ['aÃ§Ã£o', 'ação'],
  ['expressÃ£o', 'expressão'],
  ['integraï¿½ï¿½o', 'integração'],
  ['experiÃªncias', 'experiências'],
  ['artÃ­stica', 'artística'],
  ['artÃ­sticas', 'artísticas'],
  ['artÃ­stico', 'artístico'],
  ['convivÃªncia', 'convivência'],
  ['inclusÃ£o', 'inclusão'],
  ['programaÃ§Ã£o', 'programação'],
  ['participaÃ§Ã£o', 'participação'],
  ['ocupaÃ§Ã£o', 'ocupação'],
  ['espaÃ§os', 'espaços'],
  ['crianÃ§as', 'crianças'],
  ['famÃ­lias', 'famílias'],
  ['tradiÃ§Ãµes', 'tradições'],
  ['histÃ³ria', 'história'],
  ['alcanÃ§adas', 'alcançadas'],
  ['pÃºblico', 'público'],
  ['pÃºblicos', 'públicos'],
  ['pÃºblicas', 'públicas'],
  ['pÃºblica', 'pública'],
  ['serviÃ§os', 'serviços'],
  ['polÃ­ticas', 'políticas'],
  ['articulaÃ§Ã£o', 'articulação'],
  ['reforÃ§a', 'reforça'],
  ['EdiÃ§Ã£o', 'Edição'],
  ['EdiÃ§Ã£o', 'Edição'],
  ['ediÃ§Ã£o', 'edição'],
  ['transparÃªncia', 'transparência'],
  ['EducaÃ§Ã£o', 'Educação'],
  ['CapacitaÃ§Ã£o', 'Capacitação'],
  ['InovaÃ§Ã£o', 'Inovação'],
  ['GestÃ£o', 'Gestão'],
  ['Economico', 'Econômico'],
  ['tradies', 'tradições'],
  ['convivio', 'convívio'],
  ['calendario', 'calendário'],
  ['apoio voltadas a comunidades em situaÃ§Ã£o', 'apoio voltadas a comunidades em situação'],
  ['referÃªncia', 'referência'],
  ['presenÃ§a', 'presença'],
  ['populao', 'população'],
  ['espaco', 'espaço'],
  ['portolio', 'portfólio']
];

for (const target of targets) {
  const filePath = path.join(root, target);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }
  content = content.replace(/�/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
}

