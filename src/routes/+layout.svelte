<script>
    import Navbar from '../lib/Navbar.svelte'
    import '../style/default.css'
    import nprogress from 'nprogress'
    import 'nprogress/nprogress.css'
    import { navigating } from '$app/stores'

    nprogress.configure({
        showSpinner: false,
    })

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
    class="flex flex-col w-full h-screen dark:text-white text-slate-800 overflow-x-hidden transition-colors -z-20"
>
    <Navbar />
    <main>
        <slot />
    </main>
    <svg
        class="absolute w-[64rem] h-auto rotate-[30deg] overflow-hidden -top-96 -left-96 blur-3xl -z-10 pointer-events-none"
        viewBox="0 0 1155 678"
        xmlns="http://www.w3.org/2000/svg"
        ><path
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fill-opacity=".3"
        /><defs
            ><linearGradient
                gradientUnits="userSpaceOnUse"
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                ><stop stop-color="#9089FC" /><stop
                    stop-color="#FF80B5"
                    offset="1"
                /></linearGradient
            ></defs
        ></svg
    >
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
