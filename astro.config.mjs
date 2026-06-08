import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://mzhou3299.github.io',
  integrations: [tailwind()],
});
