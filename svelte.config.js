import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  extensions: ['.svelte', '.md'],
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: sequence([vitePreprocess(), preprocessMeltUI(), mdsvex({ extensions: ['.md'] })]),
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: ''
    },
    alias: {
      '$models': 'src/lib/assets/models', // Alias for the 'src/components' directory
    },
  }
};
export default config;
