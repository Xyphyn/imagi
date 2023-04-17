import { browser } from '$app/environment'
import { init, locale, register } from 'svelte-i18n'

const defaultLocale = 'en'

register('en', () => import('../../locale/en/button.json'))
register('en', () => import('../../locale/en/common.json'))
register('en', () => import('../../locale/en/input.json'))
register('en', () => import('../../locale/en/settings.json'))

register('es', () => import('../../locale/es/button.json'))
register('es', () => import('../../locale/es/common.json'))
register('es', () => import('../../locale/es/input.json'))
register('es', () => import('../../locale/es/settings.json'))

register('he', () => import('../../locale/he/button.json'))
register('he', () => import('../../locale/he/common.json'))
register('he', () => import('../../locale/he/input.json'))
register('he', () => import('../../locale/he/settings.json'))

await init({
    fallbackLocale: defaultLocale,
    initialLocale: browser ? window.navigator.language : defaultLocale,
})
