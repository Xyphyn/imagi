<script>
    import Navbar from '../lib/Navbar.svelte'
    import '../style/default.css'
    import nprogress from 'nprogress'
    import 'nprogress/nprogress.css'
    import { navigating } from '$app/stores'

    $: {
        if ($navigating) {
            nprogress.start()
        }
        if (!$navigating) {
            nprogress.done()
        }
    }
</script>

<div
    class="flex flex-col w-full h-full bg-slate-50 dark:bg-slate-900 dark:text-white text-slate-800"
>
    <Navbar />
    <main>
        <slot />
    </main>
</div>

<style>
    @font-face {
        font-family: 'Inter';
        src: url('/font/Inter.ttf');
        font-display: swap;
    }

    :root {
        font-family: 'Inter', sans-serif;
    }
</style>
