import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const distRoot = new URL('../dist/', import.meta.url);
const assetsRoot = new URL('_astro/', distRoot);
const compatibilityRoot = new URL('../dist/personal-website/', import.meta.url);
const compatibilityAssetsRoot = new URL('_astro/', compatibilityRoot);

await mkdir(compatibilityRoot, { recursive: true });
await cp(assetsRoot, compatibilityAssetsRoot, { recursive: true });
await cp(new URL('resume.pdf', distRoot), new URL('resume.pdf', compatibilityRoot));

const html = await readFile(new URL('index.html', distRoot), 'utf8');
const inlineStyles = [...html.matchAll(/<style>(.*?)<\/style>/gs)].map((match) => match[1]).join('\n');
const legacyStylesheet = 'index.C_I2WioW.css';

await writeFile(new URL(legacyStylesheet, assetsRoot), inlineStyles);
await writeFile(new URL(legacyStylesheet, compatibilityAssetsRoot), inlineStyles);

const assetNames = await readdir(assetsRoot);
const portraitName = assetNames.find((name) => name.startsWith('Mattformal suit copy.') && name.endsWith('.webp'));
const legacyPortraitNames = [
  'Mattformal suit copy.ChF28R1S_1FnHOG.webp',
  'Mattformal suit copy.ChF28R1S_1625ze.webp',
  'Mattformal suit copy.ChF28R1S_ZXoJkO.webp',
  'Mattformal suit copy.ChF28R1S_9m6d3.webp',
];

if (portraitName) {
  for (const legacyName of legacyPortraitNames) {
    await cp(new URL(portraitName, assetsRoot), new URL(legacyName, compatibilityAssetsRoot));
  }
}
