import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'www');

const files = [
  'index.html',
  'manifest.webmanifest',
  'sw.js'
];

const assets = [
  ['resources/icon.svg', 'icons/icon.svg'],
  ['resources/icon.svg', 'icons/icon-192.png'],
  ['resources/icon.svg', 'icons/icon-512.png']
];

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let copied = 0;
for (const rel of files) {
  const src = resolve(root, rel);
  if (!existsSync(src)) {
    console.warn('[build-web] пропуск (нет файла):', rel);
    continue;
  }
  cpSync(src, resolve(out, rel));
  copied++;
}

for (const [from, to] of assets) {
  const src = resolve(root, from);
  if (!existsSync(src)) continue;
  const dest = resolve(out, to);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
}

// React-компонент карты восстановления (react-body-highlighter) → IIFE-бандл
const recEntry = resolve(root, 'src/recovery-map.jsx');
if (existsSync(recEntry)) {
  await build({
    entryPoints: [recEntry],
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'GymMindRecovery',
    target: ['es2019'],
    outfile: resolve(out, 'recovery-map.js'),
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.js': 'jsx' },
    logLevel: 'info'
  });
  console.log('[build-web] recovery-map.js собран');
}

console.log('[build-web] готово: www/ (' + copied + ' файлов + иконки)');