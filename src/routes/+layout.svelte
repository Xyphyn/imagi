<script lang="ts">
    import '../style/default.css'
    import nprogress from 'nprogress'
    import { navigating } from '$app/stores'
    import Navbar from './Navbar.svelte'
    import { ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts'
    import { onMount } from 'svelte'

    let cursor = 'auto'

    onMount(() => {
        if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
            import('../style/light.css')
        } else {
            import('../style/dark.css')
        }

        let color = localStorage.getItem('color') ?? '#72efdd'

        const r: any = document.querySelector(':root')
        r.style.setProperty('--accent-color', color)
    })

    // function getRandomHexColor(): string {
    //     const hexChars = '0123456789ABCDEF'
    //     let color = '#'
    //     for (let i = 0; i < 3; i++) {
    //         const randomValue = Math.floor(127 + Math.random() * 128) // Generates a random value from 0 to 255
    //         const hexValue = randomValue.toString(16).padStart(2, '0') // Converts the random value to a two-digit hexadecimal string
    //         color += hexValue
    //     }
    //     return color
    // }

    $: {
        if ($navigating) {
            cursor = 'wait !important'
            nprogress.start()
        }
        if (!$navigating) {
            cursor = 'auto'
            nprogress.done()
        }
    }
</script>

<div class="main-container" style={`cursor: ${cursor};`}>
    <Navbar />
    <ToastContainer
        placement={'top-right'}
        showProgress={true}
        duration={1000}
        let:data><BootstrapToast {data} /></ToastContainer
    >
    <slot />
</div>

<style>
    .main-container {
        margin: 0;
        padding: 0;
    }
</style>
