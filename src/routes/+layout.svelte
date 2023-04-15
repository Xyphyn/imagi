<script lang="ts">
    import Navigation from '$lib/ui/Navigation.svelte'
    import '../style/app.css'
    import { navigating } from '$app/stores'
    import nprogress from 'nprogress'
    import 'nprogress/nprogress.css'
    import ToastContainer from '$lib/ui/toasts/ToastContainer.svelte'

    nprogress.configure({
        minimum: 0.4,
        trickleSpeed: 200,
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

<ToastContainer />
<Navigation />
<div class="m-4">
    <slot />
</div>
