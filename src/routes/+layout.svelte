<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import '../style/default.css'
    import nprogress from 'nprogress'
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

<div class="main-container">
    <slot />
</div>

<style>
    .main-container {
        margin: 0;
        padding: 0;
    }
</style>
