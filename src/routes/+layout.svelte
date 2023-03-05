<script>
    import Navbar from '../lib/Navbar.svelte'
    import '../style/default.css'
</script>

<div
    class="flex flex-col w-screen h-screen bg-white dark:bg-slate-900 dark:text-white text-slate-800"
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
