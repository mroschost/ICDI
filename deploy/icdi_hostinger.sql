ï¿½ï¿½-- ICDI Hostinger import
-- Import this file into a MySQL database on Hostinger.
-- The content mirrors the current static site data and the WhatsApp widget defaults.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS projects (
  slug VARCHAR(120) NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  full_description LONGTEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  gallery_json LONGTEXT NOT NULL,
  transparency_json LONGTEXT NOT NULL,
  objectives_json LONGTEXT NOT NULL,
  results_json LONGTEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  sort_order INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS whatsapp_config (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  photo_url VARCHAR(255) NOT NULL,
  chat_name VARCHAR(120) NOT NULL,
  welcome_message TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  phone_number VARCHAR(32) NOT NULL,
  questions_json LONGTEXT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(80) NOT NULL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  answers_json LONGTEXT NOT NULL,
  completed TINYINT(1) NOT NULL DEFAULT 0,
  phone_number VARCHAR(32) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_forms (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message LONGTEXT NOT NULL,
  source_page VARCHAR(100) NOT NULL DEFAULT 'home',
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_forms_email (email),
  INDEX idx_contact_forms_status (status),
  INDEX idx_contact_forms_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  full_name VARCHAR(200) NOT NULL,
  password_salt VARCHAR(80) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO projects
  (slug, title, description, full_description, image, gallery_json, transparency_json, objectives_json, results_json, icon_name, color, sort_order)
VALUES
  (
    'arraia-do-cerrado',
    'Arraiï¿½ do Cerrado',
    'Projeto cultural realizado na Escola Parque da Natureza e Esporte, celebrando a cultura popular em ambiente educativo.',
    'O Arraiï¿½ do Cerrado foi realizado na Escola Parque da Natureza e Esporte como uma ao cultural voltada a valorizao das tradies populares e ao fortalecimento do convvio comunitrio. A iniciativa integra o calendrio de eventos do ICDI com foco em acesso a cultura, ocupao qualificada de espaï¿½os pï¿½blicos e experincias coletivas para crianas, jovens e famlias do Distrito Federal.',
    '/eventos_v2/fotos/foto_01_pagina_05.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_05.jpg","/eventos_v2/fotos/foto_02_pagina_05.jpg","/eventos_v2/fotos/foto_03_pagina_05.jpg"]',
    '[]',
    '["Valorizar as tradies juninas e a cultura popular do Distrito Federal","Promover convivï¿½ncia comunitria em espaco educativo e cultural","Ampliar o acesso do pï¿½blico a programaï¿½ï¿½o artstica gratuita"]',
    '["Evento inserido no portflio institucional de 2026","Programao cultural em espao de referncia educativa","Fortalecimento da presena territorial do ICDI"]',
    'Music',
    'bg-amber-500',
    1
  ),
  (
    'candangao-de-quadrilha-junina',
    'Candangï¿½o de Quadrilha Junina',
    'Um projeto cultural realizado em Ceilndia voltado a valorizao das tradies juninas e da cultura popular do Distrito Federal.',
    'Um projeto cultural realizado em Ceilndia voltado a valorizao das tradies juninas e da cultura popular do Distrito Federal. A iniciativa reuniu grupos de quadrilha, artistas locais e a comunidade em uma programaï¿½ï¿½o festiva que fortaleceu a identidade cultural, incentivou a participao popular e promoveu o acesso as manifestaes tradicionais brasileiras.',
    '/eventos_v2/fotos/foto_01_pagina_06.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_06.jpg","/eventos_v2/fotos/foto_02_pagina_06.jpg"]',
    '[]',
    '["Valorizar as tradies juninas do Distrito Federal","Incentivar a participao comunitria","Promover artistas e grupos culturais locais","Preservar manifestaes populares brasileiras"]',
    '["Fortalecimento da cultura regional","Grande participao popular","Incentivo  economia criativa local"]',
    'Users',
    'bg-red-500',
    2
  ),
  (
    'teatro-vai-a-escola',
    'Teatro Vai a Escola',
    'Projeto cultural desenvolvido em parceria com a Secretaria de Cultura, levando apresentaï¿½ï¿½es teatrais para 25 escolas pï¿½blicas do Ncleo Bandeirante.',
    'Projeto cultural desenvolvido em parceria com a Secretaria de Cultura, levando apresentaï¿½ï¿½es teatrais para 25 escolas pï¿½blicas da Coordenaï¿½ï¿½o Regional de Ensino do Ncleo Bandeirante. A ao aproximou estudantes da rede pblica das artes cnicas e ampliou o acesso a cultura dentro do ambiente escolar.',
    '/eventos_v2/fotos/foto_01_pagina_07.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_07.jpg","/eventos_v2/fotos/foto_02_pagina_07.jpg"]',
    '["/content/transparency/teatro-vai-a-escola/saveclip.app-459320446-17903781414033896-5790567167841414622-n.jpg"]',
    '["Democratizar o acesso ao teatro","Levar cultura ao ambiente escolar","Estimular o interesse artstico dos estudantes","Valorizar grupos teatrais locais"]',
    '["25 escolas atendidas","Ampliao do repertrio cultural estudantil","Fortalecimento da educao cultural"]',
    'Theater',
    'bg-blue-500',
    3
  ),
  (
    'mï¿½sica-teatro-e-cidadania',
    'Mï¿½sica, Teatro e Cidadania',
    'Projeto realizado nas regies do Cruzeiro e Agua Quente, promovendo apresentaï¿½ï¿½es artï¿½sticas e atividades culturais abertas a comunidade.',
    'Projeto realizado nas regies do Cruzeiro e Agua Quente, promovendo apresentaï¿½ï¿½es artï¿½sticas e atividades culturais abertas a comunidade. A iniciativa utilizou a arte como ferramenta de inclusï¿½o social, convivï¿½ncia comunitria e fortalecimento da cidadania.',
    '/eventos_v2/fotos/foto_01_pagina_08.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_08.jpg","/eventos_v2/fotos/foto_02_pagina_08.jpg"]',
    '["/content/transparency/mï¿½sica-teatro-e-cidadania/saveclip.app-428645559-17878332906033896-7526550558968735316-n.jpg"]',
    '["Promover inclusï¿½o social por meio da cultura","Incentivar participao comunitria","Levar mï¿½sica e teatro a espaï¿½os pï¿½blicos","Estimular cidadania e convivï¿½ncia social"]',
    '["Maior acesso cultural nas regies atendidas","Engajamento comunitrio","Valorizao da arte local"]',
    'Music',
    'bg-teal-500',
    4
  ),
  (
    'estrutural-20-anos-de-cultura',
    'Estrutural - 20 Anos de Cultura',
    'Projeto comemorativo realizado na cidade Estrutural em celebrao aos 20 anos da regio administrativa.',
    'Projeto comemorativo realizado na cidade Estrutural em celebrao aos 20 anos da regio administrativa. Com apresentaï¿½ï¿½es musicais e atividades culturais, o evento valorizou a histria local, promoveu lazer e fortaleceu a ocupao positiva dos espaï¿½os pï¿½blicos.',
    '/eventos_v2/fotos/foto_01_pagina_09.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_09.jpg","/eventos_v2/fotos/foto_02_pagina_09.jpg","/eventos_v2/fotos/foto_03_pagina_09.jpg"]',
    '["/content/transparency/estrutural-20-de-cultura/saveclip.app-433336629-17882799939033896-1055833069955455790-n.jpg"]',
    '["Celebrar a histria da cidade","Valorizar identidade cultural local","Oferecer programaï¿½ï¿½o gratuita a populao","Fortalecer espaï¿½os pï¿½blicos por meio da cultura"]',
    '["Grande participao popular","Fortalecimento do sentimento de pertencimento","Acesso gratuito  cultura"]',
    'MapPin',
    'bg-yellow-500',
    5
  ),
  (
    'anima-escola',
    'Anima Escola',
    'Projeto educacional e cultural realizado no CEF 15 de Taguatinga, com atividades criativas e aÃ§Ãµes voltadas ao desenvolvimento estudantil.',
    'Projeto educacional e cultural realizado no CEF 15 de Taguatinga, com atividades criativas e aÃ§Ãµes voltadas ao desenvolvimento estudantil. A iniciativa incentivou expressÃ£o artÃ­stica, integraï¿½ï¿½o social e experiÃªncias educativas complementares.',
    '/eventos_v2/fotos/foto_01_pagina_10.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_10.jpg","/eventos_v2/fotos/foto_02_pagina_10.jpg","/eventos_v2/fotos/foto_03_pagina_10.jpg"]',
    '[]',
    '["Incentivar criatividade estudantil","Promover atividades culturais na escola","Estimular integraï¿½ï¿½o entre alunos","Complementar a formaï¿½ï¿½o educacional"]',
    '["Participao ativa dos estudantes","Ambiente escolar mais dinmico","Desenvolvimento criativo e social"]',
    'BookOpen',
    'bg-violet-500',
    6
  ),
  (
    'varjao-21-anos-de-cultura',
    'Varjï¿½o - 21 Anos de Cultura',
    'Evento comemorativo realizado no Varjï¿½o em celebraï¿½ï¿½o aos 21 anos da cidade.',
    'Evento comemorativo realizado no Varjï¿½o em celebraï¿½ï¿½o aos 21 anos da cidade. A programaï¿½ï¿½o reuniu atraes musicais, apresentaï¿½ï¿½es artï¿½sticas e atividades abertas ao pï¿½blico, valorizando a cultura popular e fortalecendo os vinculos comunitrios.',
    '/eventos_v2/fotos/foto_01_pagina_11.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_11.jpg","/eventos_v2/fotos/foto_02_pagina_11.jpg","/eventos_v2/fotos/foto_03_pagina_11.jpg"]',
    '[]',
    '["Celebrar o aniversario da cidade","Valorizar artistas locais e regionais","Promover convivï¿½ncia comunitria","Incentivar ocupao cultural urbana"]',
    '["Participao popular expressiva","Fortalecimento cultural local","Integrao comunitria"]',
    'MapPin',
    'bg-orange-500',
    7
  ),
  (
    'teatro-vai-a-escola-2-edio',
    'Teatro Vai a Escola - 2 Edição',
    'Segunda ediï¿½ï¿½o do projeto realizada em 18 escolas pï¿½blicas da Coordenaï¿½ï¿½o Regional de Ensino de Samambaia.',
    'Segunda ediï¿½ï¿½o do projeto realizada em 18 escolas pï¿½blicas da Coordenaï¿½ï¿½o Regional de Ensino de Samambaia. A iniciativa levou apresentaï¿½ï¿½es teatrais ao ambiente escolar, incentivando cultura, imaginaï¿½ï¿½o e desenvolvimento educacional.',
    '/eventos_v2/fotos/foto_01_pagina_12.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_12.jpg","/eventos_v2/fotos/foto_02_pagina_12.jpg"]',
    '["/content/transparency/teatro-vai-a-escola-2-edio/saveclip.app-655568301-18090463583145684-6680947092755261239-n.jpg"]',
    '["Expandir acesso ao teatro nas escolas pï¿½blicas","Incentivar formaï¿½ï¿½o cultural estudantil","Levar arte ao cotidiano escolar","Apoiar artistas e grupos locais"]',
    '["18 escolas atendidas","Maior acesso  cultura estudantil","Impacto positivo no ambiente escolar"]',
    'Theater',
    'bg-indigo-500',
    8
  ),
  (
    'festival-da-crianca',
    'Festival da Crianca',
    'Projeto cultural voltado ao pï¿½blico infantil e as famlias, com atividades artï¿½sticas gratuitas em espaï¿½os pï¿½blicos.',
    'Um projeto cultural voltado ao pï¿½blico infantil e as famlias, que promove o acesso a cultura por meio de atividades artï¿½sticas gratuitas em espaï¿½os pï¿½blicos. Com programaï¿½ï¿½o de teatro, mï¿½sica, circo e contaï¿½ï¿½o de histï¿½rias, o projeto estimula criatividade, convivï¿½ncia comunitria e inclusï¿½o social.',
    '/eventos_v2/fotos/foto_01_pagina_13.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_13.jpg","/eventos_v2/fotos/foto_02_pagina_13.jpg","/eventos_v2/fotos/foto_03_pagina_13.jpg"]',
    '["/content/transparency/festival-da-crianca/saveclip.app-467355060-17912305977033896-4844606768554122691-n.jpg"]',
    '["Promover acesso a cultura para crianas e famlias","Oferecer atividades artï¿½sticas gratuitas","Valorizar artistas locais","Estimular criatividade infantil"]',
    '["Espacos pï¿½blicos transformados em areas culturais","Fortalecimento comunitrio","Ampliao do acesso infantil a cultura"]',
    'Heart',
    'bg-pink-500',
    9
  ),
  (
    'arraia-das-cidades',
    'Arraiï¿½ das Cidades',
    'Circuito cultural que percorreu cinco cidades do Distrito Federal, fortalecendo a economia local e as tradições juninas.',
    'O projeto percorreu Park Way, Vila Planalto, Candangolândia, Núcleo Bandeirante e Riacho Fundo I, promovendo uma grande celebração da cultura popular. O evento reuniu 35 artistas, contou com a participação de mais de 75 microempreendedores na praça de alimentação e recebeu milhares de pessoas, fortalecendo a economia local e valorizando as tradições juninas. Termo de Fomento n 64/2025, em parceria com a Secretaria de Cultura e Economia Criativa.',
    '/eventos_v2/fotos/foto_01_pagina_14.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_14.jpg"]',
    '["/content/transparency/arraia-das-cidades/saveclip.app-540630059-17851076157540593-4402759964842436811-n.jpg"]',
    '["Valorizar a cultura popular e as tradies juninas em cinco cidades do DF","Fortalecer a economia local com microempreendedores e artistas","Levar programaï¿½ï¿½o cultural gratuita para diferentes territorios"]',
    '["Circuito realizado em 5 cidades do Distrito Federal","Participao de 35 artistas e mais de 75 microempreendedores","Milhares de pessoas alcanadas pelo evento"]',
    'Music',
    'bg-orange-500',
    10
  ),
  (
    'feirao-do-trabalhador',
    'Feiro do Trabalhador',
    'Evento realizado ao lado da Biblioteca Nacional com 90 empresas, mais de 5 mil vagas e milhares de atendimentos.',
    'O Feiro do Trabalhador foi realizado ao lado da Biblioteca Nacional de Braslia e reuniu 90 empresas, disponibilizou mais de 5 mil vagas de emprego e realizou mais de 9 mil atendimentos, resultando em mais de 5 mil encaminhamentos para processos seletivos. A iniciativa refora a frente do ICDI voltada a oportunidades, renda e articulao com politicas pblicas de empregabilidade. Termo de Fomento n 09/2025, em parceria com a Secretaria de Desenvolvimento Econmico, Trabalho e Renda.',
    '/eventos_v2/fotos/foto_01_pagina_15.jpg',
    '["/eventos_v2/fotos/foto_01_pagina_15.jpg","/eventos_v2/fotos/foto_02_pagina_15.jpg"]',
    '["/content/transparency/feirao-do-trabalhador/whatsapp-image-2026-04-17-at-09.45.56.jpeg"]',
    '["Conectar trabalhadores a vagas de emprego e processos seletivos","Ampliar o acesso da populao a servios de empregabilidade","Articular empresas e poder pï¿½blico em uma grande ao de oportunidades"]',
    '["90 empresas participantes","Mais de 5 mil vagas de emprego disponibilizadas","Mais de 9 mil atendimentos e 5 mil encaminhamentos realizados"]',
    'Users',
    'bg-green-500',
    11
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  full_description = VALUES(full_description),
  image = VALUES(image),
  gallery_json = VALUES(gallery_json),
  transparency_json = VALUES(transparency_json),
  objectives_json = VALUES(objectives_json),
  results_json = VALUES(results_json),
  icon_name = VALUES(icon_name),
  color = VALUES(color),
  sort_order = VALUES(sort_order),
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO whatsapp_config
  (id, photo_url, chat_name, welcome_message, cta_text, phone_number, questions_json)
VALUES
  (
    'whatsapp',
    '/logo.png',
    'Atendimento ICDI',
    'Ola! Seja bem-vindo ao ICDI. Estamos aqui para ajudar!',
    'Fale com nossa equipe agora mesmo.',
    '5561999682497',
    '[{"text":"Ola! Para comecarmos, qual e o seu nome","options":[]},{"text":"Prazer em te conhecer, {nome}! Qual o motivo do seu contato hoje","options":["Duvida","Parceria","Projeto","Outro"]},{"text":"{nome}, em qual de nossos projetos voce tem interesse","options":["Projeto Mulheres","Mentoria","Inovao","Outro"]},{"text":"Por fim, deixe seu e-mail ou telefone para que possamos retornar.","options":[]}]'
  )
ON DUPLICATE KEY UPDATE
  photo_url = VALUES(photo_url),
  chat_name = VALUES(chat_name),
  welcome_message = VALUES(welcome_message),
  cta_text = VALUES(cta_text),
  phone_number = VALUES(phone_number),
  questions_json = VALUES(questions_json),
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO admin_users
  (username, full_name, password_salt, password_hash, role, is_active)
VALUES
  (
    'adminicdi',
    'Administrador ICDI',
    'icdi-admin-2026',
    '6eebb1a7f7de8c386a95493e1033c9ff959682f076a8c8d8ec50d5209522fa1e',
    'admin',
    1
  )
ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  password_salt = VALUES(password_salt),
  password_hash = VALUES(password_hash),
  role = VALUES(role),
  is_active = VALUES(is_active),
  updated_at = CURRENT_TIMESTAMP;





