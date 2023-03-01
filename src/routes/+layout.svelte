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
            console.log('Light')
            import('../style/light.css')
        } else {
            console.log('Dark')
            import('../style/dark.css')
        }
    })

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

<div class="main-container" style={`cursor: ${cursor}`}>
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
