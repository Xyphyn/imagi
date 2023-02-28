import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

process.env = {...process.env, ...loadEnv('dev', process.cwd())}

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// Freak you, svelte-fa!
		noExternal: ['@fortawesome/free-solid-svg-icons']
	}
});
