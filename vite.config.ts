import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
    plugins: [sveltekit(), visualizer() as PluginOption],
    ssr: {
        noExternal: ['svelte-hero-icons'],
    },
})
