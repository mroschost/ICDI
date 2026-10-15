// Export the exact HTML and browser assets built by vinext for Hostinger's
// Apache/PHP static hosting. The committed PHP files are HTML entry points.
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const workerPath = resolve(root, 'dist/server/index.js');
const worker = (await import(pathToFileURL(workerPath).href)).default;

if (typeof worker?.fetch !== 'function') {
  throw new Error('vinext worker entry missing: dist/server/index.js');
}

const destinations = [
  ['/', 'index.php'],
  ['/projetos', 'projetos/index.php'],
  ['/transparencia', 'transparencia/index.php'],
  ['/admin', 'admin/index.php'],
];

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

for (const [route, destination] of destinations) {
  const response = await worker.fetch(
    new Request(new URL(route, 'https://icdiinstituto.com.br'), {
      headers: { accept: 'text/html' },
    }),
    { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } },
    context,
  );
  const html = await response.text();

  if (!response.ok || !html.includes('<!DOCTYPE html>') || !html.includes('/assets/')) {
    throw new Error('Unable to render deployable HTML for ' + route + ': HTTP ' + response.status);
  }
  const target = resolve(root, destination);
  await mkdir(resolve(root, destination.split('/').slice(0, -1).join('/') || '.'), { recursive: true });
  await writeFile(target, html, 'utf8');
  console.log('Exported ' + route + ' -> ' + destination);
}

const compiledAssets = resolve(root, 'dist/client/assets');
const outputAssets = resolve(root, 'assets');
await cp(compiledAssets, outputAssets, { recursive: true, force: true });
const homepage = await readFile(resolve(root, 'index.php'), 'utf8');
if (!homepage.includes('/assets/')) throw new Error('Missing hashed assets in exported homepage');
console.log('Published compiled assets to assets/');
