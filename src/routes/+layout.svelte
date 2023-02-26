<script lang="ts">
    import '../style/default.css'
    import nprogress from 'nprogress'
    import { navigating } from '$app/stores'
    import Navbar from './Navbar.svelte'

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
    <slot />
</div>

<style>
    .main-container {
        margin: 0;
        padding: 0;
    }
</style>
