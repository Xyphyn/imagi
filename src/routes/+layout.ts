import { browser } from '$app/environment'
import '$lib/i18n/i18n'
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
    if (browser) {
        if (localStorage.locale) {
            locale.set(localStorage.locale)
        } else {
            locale.set(window.navigator.language)
        }
    }
    await waitLocale()
}
