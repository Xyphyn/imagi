import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'

register('en', () => import('../../locale/en/button.json'))
register('es', () => import('../../locale/es/button.json'))
register('he', () => import('../../locale/he/button.json'))

init({
    fallbackLocale: defaultLocale,
    initialLocale: browser ? window.navigator.language : defaultLocale,
})
