# Translating

Thanks for taking your time to help translate imagi! Translation is really simple.

1. Fork the repo and clone it.

2. Create a new folder (with the country code of the language.) in `src/locale`. **I recommend that you just copy a folder and rename it.**

3. Translate each JSON file. **Only the values**.

4. Go into `src/lib/i18n/i18n.ts` and add the following code under:

```ts
register('he', () => import('../../locale/he/button.json'))
register('he', () => import('../../locale/he/common.json'))
register('he', () => import('../../locale/he/input.json'))
register('he', () => import('../../locale/he/settings.json'))

// Insert here.

register(
    '<country code>',
    () => import('../../locale/<country code>/button.json')
)
register(
    '<country code>',
    () => import('../../locale/<country code>/common.json')
)
register(
    '<country code>',
    () => import('../../locale/<country code>/input.json')
)
register(
    '<country code>',
    () => import('../../locale/<country code>/settings.json')
)
```

_Replace `<country code>` with the country code of the language._

5. Make a pull request.

6. Done! Thanks for helping translate Imagi!
