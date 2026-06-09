import fs from 'node:fs';

const targets = [
  'README.md',
  'metadata.json',
  'deploy/icdi_hostinger.sql',
  'src/constants.tsx',
  'src/components/home/AboutSection.tsx',
  'src/pages/Admin.tsx',
  'src/pages/Projects.tsx'
];

const replacements = [
  ['Capacitao', 'Capacitação'],
  ['Inovao', 'Inovação'],
  ['educao', 'educação'],
  ['inclusao', 'inclusão'],
  ['apresentao', 'apresentação'],
  ['transparncia', 'transparência'],
  ['gestao', 'gestão'],
  ['conteudo', 'conteúdo'],
  ['Viso', 'Visão'],
  ['pblicos', 'públicos'],
  ['aplicao', 'aplicação'],
  ['configurao', 'configuração'],
  ['dependencias', 'dependências'],
  ['producao', 'produção'],
  ['repositorio', 'repositório'],
  ['construido', 'construído'],
  ['Observaes', 'Observações'],
  ['migrao', 'migração'],
  ['extraidos', 'extraídos'],
  ['sugestao', 'sugestão'],
  ['Usuario', 'Usuário'],
  ['invalidos', 'inválidos'],
  ['Configuracao', 'Configuração'],
  ['Teatro Vai a Escola - 2 Edição', 'Teatro Vai à Escola - 2ª Edição'],
  ['Teatro Vai a Escola', 'Teatro Vai à Escola'],
  ['Arraiï¿½', 'Arraiá'],
  ['Candangï¿½o', 'Candangão'],
  ['Varjï¿½o', 'Varjão'],
  ['Mï¿½sica', 'Música'],
  ['pï¿½blico', 'público'],
  ['pï¿½blicos', 'públicos'],
  ['pï¿½blicas', 'públicas'],
  ['pï¿½blica', 'pública'],
  ['espaï¿½os', 'espaços'],
  ['programaï¿½ï¿½o', 'programação'],
  ['formaï¿½ï¿½o', 'formação'],
  ['Coordenaï¿½ï¿½o', 'Coordenação'],
  ['apresentaï¿½ï¿½es', 'apresentações'],
  ['inclusï¿½o', 'inclusão'],
  ['convivï¿½ncia', 'convivência'],
  ['ediï¿½ï¿½o', 'edição'],
  ['celebraï¿½ï¿½o', 'celebração'],
  ['artï¿½sticas', 'artísticas'],
  ['artï¿½stica', 'artística'],
  ['histï¿½rias', 'histórias'],
  ['mï¿½sica', 'música'],
  ['imaginaï¿½ï¿½o', 'imaginação'],
  ['contaï¿½ï¿½o', 'contação'],
  ['voltado a valorizao', 'voltado à valorização'],
  ['voltada a valorizao', 'voltada à valorização'],
  ['concvio', 'convívio'],
  ['convvio', 'convívio'],
  ['comunitrio', 'comunitário'],
  ['calendrio', 'calendário'],
  ['acesso a cultura', 'acesso à cultura'],
  ['ocupao', 'ocupação'],
  ['experincias', 'experiências'],
  ['crianas', 'crianças'],
  ['famlias', 'famílias'],
  ['comunitria', 'comunitária'],
  ['Ceilndia', 'Ceilândia'],
  ['participao', 'participação'],
  ['manifestaes', 'manifestações'],
  ['Ncleo', 'Núcleo'],
  ['pblica', 'pública'],
  ['cnicas', 'cênicas'],
  ['regies', 'regiões'],
  ['celebrao', 'celebração'],
  ['histria', 'história'],
  ['repertrio', 'repertório'],
  ['atraes', 'atrações'],
  ['vinculos', 'vínculos'],
  ['aniversario', 'aniversário'],
  ['Espacos', 'Espaços'],
  ['Ampliao', 'Ampliação'],
  ['territorios', 'territórios'],
  ['servios', 'serviços'],
  ['Ola!', 'Olá!'],
  ['comecarmos', 'começarmos'],
  ['voce', 'você']
];

const protectedPatterns = [
  /\/eventos_v2\/fotos\/[^'"\]\s]+/g,
  /\/content\/transparency\/[^'"\]\s]+/g,
  /\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g
];

function protectTechnicalTokens(text) {
  const tokens = [];
  const protectedText = protectedPatterns.reduce((current, pattern) => {
    return current.replace(pattern, match => {
      const key = `__ICDI_TOKEN_${tokens.length}__`;
      tokens.push(match);
      return key;
    });
  }, text);

  return {
    text: protectedText,
    restore(value) {
      return tokens.reduce((current, token, index) => {
        return current.replaceAll(`__ICDI_TOKEN_${index}__`, token);
      }, value);
    }
  };
}

for (const target of targets) {
  if (!fs.existsSync(target)) continue;

  const original = fs.readFileSync(target, 'utf8');
  const protectedContent = protectTechnicalTokens(original);
  let content = protectedContent.text;

  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }

  content = content.replace(/^\uFEFF?ï¿½ï¿½/, '');
  fs.writeFileSync(target, protectedContent.restore(content), 'utf8');
}
