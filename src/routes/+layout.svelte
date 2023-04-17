<script lang="ts">
    import Navigation from '$lib/ui/Navigation.svelte'
    import '../style/app.css'
    import { navigating } from '$app/stores'
    import nprogress from 'nprogress'
    import 'nprogress/nprogress.css'
    import ToastContainer from '$lib/ui/toasts/ToastContainer.svelte'
    import { browser } from '$app/environment'
    import { locale } from 'svelte-i18n'

    nprogress.configure({
        minimum: 0.4,
        trickleSpeed: 75,
        showSpinner: false,
    })

    $: {
        if ($navigating) {
            nprogress.start()
            if (typeof document != 'undefined') {
                document.body.classList.toggle('wait', true)
            }
        }
        if (!$navigating) {
            nprogress.done()
            if (typeof document != 'undefined') {
                document.body.classList.toggle('wait', false)
            }
        }
    }

    const getLocale = (locale: string | null | undefined) => {
        if (!browser) {
            return locale
        }

        if (localStorage.locale) return localStorage.locale
        else if (window.navigator.language) return window.navigator.language
        else return locale
    }

    locale.update((locale) => getLocale(locale))
</script>

<ToastContainer />
<Navigation />
<div class="m-4">
    <slot />
</div>
