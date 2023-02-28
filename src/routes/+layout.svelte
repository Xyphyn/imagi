<script lang="ts">
    import '../style/default.css'
    import nprogress from 'nprogress'
    import { navigating } from '$app/stores'
    import Navbar from './Navbar.svelte'
    import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'

    let cursor = 'auto'

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
    <ToastContainer placement={'top-right'} showProgress={true} duration={1000}
        >te</ToastContainer
    >
    <slot />
</div>

<style>
    .main-container {
        margin: 0;
        padding: 0;
    }
</style>
