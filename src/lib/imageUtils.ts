import type React from 'react';
import logo from '../assets/brand/icdi-logo.png';
import heroInstitutional from '../assets/idv/hero-institutional.jpg';
import p0105 from '../assets/eventos_v2/fotos/foto_01_pagina_05.jpg';
import p0106 from '../assets/eventos_v2/fotos/foto_01_pagina_06.jpg';
import p0107 from '../assets/eventos_v2/fotos/foto_01_pagina_07.jpg';
import p0108 from '../assets/eventos_v2/fotos/foto_01_pagina_08.jpg';
import p0109 from '../assets/eventos_v2/fotos/foto_01_pagina_09.jpg';
import p0110 from '../assets/eventos_v2/fotos/foto_01_pagina_10.jpg';
import p0111 from '../assets/eventos_v2/fotos/foto_01_pagina_11.jpg';
import p0112 from '../assets/eventos_v2/fotos/foto_01_pagina_12.jpg';
import p0113 from '../assets/eventos_v2/fotos/foto_01_pagina_13.jpg';
import p0114 from '../assets/eventos_v2/fotos/foto_01_pagina_14.jpg';
import p0115 from '../assets/eventos_v2/fotos/foto_01_pagina_15.jpg';
import p0205 from '../assets/eventos_v2/fotos/foto_02_pagina_05.jpg';
import p0206 from '../assets/eventos_v2/fotos/foto_02_pagina_06.jpg';
import p0207 from '../assets/eventos_v2/fotos/foto_02_pagina_07.jpg';
import p0208 from '../assets/eventos_v2/fotos/foto_02_pagina_08.jpg';
import p0209 from '../assets/eventos_v2/fotos/foto_02_pagina_09.jpg';
import p0210 from '../assets/eventos_v2/fotos/foto_02_pagina_10.jpg';
import p0211 from '../assets/eventos_v2/fotos/foto_02_pagina_11.jpg';
import p0212 from '../assets/eventos_v2/fotos/foto_02_pagina_12.jpg';
import p0213 from '../assets/eventos_v2/fotos/foto_02_pagina_13.jpg';
import p0215 from '../assets/eventos_v2/fotos/foto_02_pagina_15.jpg';
import p0305 from '../assets/eventos_v2/fotos/foto_03_pagina_05.jpg';
import p0309 from '../assets/eventos_v2/fotos/foto_03_pagina_09.jpg';
import p0310 from '../assets/eventos_v2/fotos/foto_03_pagina_10.jpg';
import p0311 from '../assets/eventos_v2/fotos/foto_03_pagina_11.jpg';
import p0313 from '../assets/eventos_v2/fotos/foto_03_pagina_13.jpg';
import tArraia from '../assets/content/transparency/arraia-das-cidades/saveclip.app-540630059-17851076157540593-4402759964842436811-n.jpg';
import tEstrutural from '../assets/content/transparency/estrutural-20-de-cultura/saveclip.app-433336629-17882799939033896-1055833069955455790-n.jpg';
import tFeirao from '../assets/content/transparency/feirao-do-trabalhador/whatsapp-image-2026-04-17-at-09.45.56.jpeg';
import tFestival from '../assets/content/transparency/festival-da-crianca/saveclip.app-467355060-17912305977033896-4844606768554122691-n.jpg';
import tMusica from '../assets/content/transparency/musica-teatro-e-cidadania/saveclip.app-428645559-17878332906033896-7526550558968735316-n.jpg';
import tTeatro2 from '../assets/content/transparency/teatro-vai-a-escola-2-edicao/saveclip.app-655568301-18090463583145684-6680947092755261239-n.jpg';
import tTeatro from '../assets/content/transparency/teatro-vai-a-escola/saveclip.app-459320446-17903781414033896-5790567167841414622-n.jpg';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1200';

const LOCAL_ASSETS_RAW = {
  'logo.png': logo,
  'brand/icdi-logo.png': logo,
  'idv/hero-institutional.jpg': heroInstitutional,
  'eventos_v2/fotos/foto_01_pagina_05.jpg': p0105,
  'eventos_v2/fotos/foto_01_pagina_06.jpg': p0106,
  'eventos_v2/fotos/foto_01_pagina_07.jpg': p0107,
  'eventos_v2/fotos/foto_01_pagina_08.jpg': p0108,
  'eventos_v2/fotos/foto_01_pagina_09.jpg': p0109,
  'eventos_v2/fotos/foto_01_pagina_10.jpg': p0110,
  'eventos_v2/fotos/foto_01_pagina_11.jpg': p0111,
  'eventos_v2/fotos/foto_01_pagina_12.jpg': p0112,
  'eventos_v2/fotos/foto_01_pagina_13.jpg': p0113,
  'eventos_v2/fotos/foto_01_pagina_14.jpg': p0114,
  'eventos_v2/fotos/foto_01_pagina_15.jpg': p0115,
  'eventos_v2/fotos/foto_02_pagina_05.jpg': p0205,
  'eventos_v2/fotos/foto_02_pagina_06.jpg': p0206,
  'eventos_v2/fotos/foto_02_pagina_07.jpg': p0207,
  'eventos_v2/fotos/foto_02_pagina_08.jpg': p0208,
  'eventos_v2/fotos/foto_02_pagina_09.jpg': p0209,
  'eventos_v2/fotos/foto_02_pagina_10.jpg': p0210,
  'eventos_v2/fotos/foto_02_pagina_11.jpg': p0211,
  'eventos_v2/fotos/foto_02_pagina_12.jpg': p0212,
  'eventos_v2/fotos/foto_02_pagina_13.jpg': p0213,
  'eventos_v2/fotos/foto_02_pagina_15.jpg': p0215,
  'eventos_v2/fotos/foto_03_pagina_05.jpg': p0305,
  'eventos_v2/fotos/foto_03_pagina_09.jpg': p0309,
  'eventos_v2/fotos/foto_03_pagina_10.jpg': p0310,
  'eventos_v2/fotos/foto_03_pagina_11.jpg': p0311,
  'eventos_v2/fotos/foto_03_pagina_13.jpg': p0313,
  'content/transparency/arraia-das-cidades/saveclip.app-540630059-17851076157540593-4402759964842436811-n.jpg': tArraia,
  'content/transparency/estrutural-20-de-cultura/saveclip.app-433336629-17882799939033896-1055833069955455790-n.jpg': tEstrutural,
  'content/transparency/feirao-do-trabalhador/whatsapp-image-2026-04-17-at-09.45.56.jpeg': tFeirao,
  'content/transparency/festival-da-crianca/saveclip.app-467355060-17912305977033896-4844606768554122691-n.jpg': tFestival,
  'content/transparency/musica-teatro-e-cidadania/saveclip.app-428645559-17878332906033896-7526550558968735316-n.jpg': tMusica,
  'content/transparency/teatro-vai-a-escola-2-edicao/saveclip.app-655568301-18090463583145684-6680947092755261239-n.jpg': tTeatro2,
  'content/transparency/teatro-vai-a-escola/saveclip.app-459320446-17903781414033896-5790567167841414622-n.jpg': tTeatro,
};

const resolveImportedAsset = (asset: unknown): string => {
  if (typeof asset === 'string') return asset;
  if (asset && typeof asset === 'object') {
    const record = asset as Record<string, unknown>;
    return resolveImportedAsset(record.src ?? record.default);
  }
  return '';
};

const LOCAL_ASSETS: Record<string, string> = Object.fromEntries(
  Object.entries(LOCAL_ASSETS_RAW).map(([path, asset]) => [path, resolveImportedAsset(asset)]),
);

export const getSafeImageUrl = (path: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return LOCAL_ASSETS[cleanPath] ?? `/${cleanPath}`;
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  if (!target.src.includes(FALLBACK_IMAGE)) target.src = FALLBACK_IMAGE;
};
