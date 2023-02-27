import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// Freak you, svelte-fa!
		noExternal: ['@fortawesome/free-solid-svg-icons']
	}
});
