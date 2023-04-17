<script lang="ts">
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'
    import Setting from '../Setting.svelte'
    import { locales, locale, _ } from 'svelte-i18n'
    import { browser } from '$app/environment'
    import { Color } from '$lib/ui/colors'

    const names: Map<string, string> = new Map([
        ['en', '🇬🇧 English'],
        ['es', '🇪🇸 Español'],
        ['he', '🇮🇱 עִברִית'],
    ])

    $: {
        if (browser) {
            localStorage.locale = selectedLocale
        }

        locale.set(selectedLocale)
    }

    const getLocale = () => {
        if (!browser) return $locale

        if (localStorage.locale) return localStorage.locale
        else if (window.navigator.language) return window.navigator.language
        else return $locale
    }

    let selectedLocale = getLocale()
</script>

<title>Settings | General</title>
<Setting>
    <span slot="title">{$_('settings.general.grid.title')}</span>
    <p slot="description">{$_('settings.general.grid.description')}</p>
    <SwitchInput bind:enabled={$userSettings.grid} />
    <span class="text-sm">
        {$userSettings.grid ? $_('settings.enabled') : $_('settings.disabled')}
    </span>
</Setting>
<Setting>
    <span slot="title">{$_('settings.general.thumbSize.title')}</span>
    <p slot="description">
        {$_('settings.general.thumbSize.description')}.
    </p>
    <MultiSelect
        separate={false}
        options={['256x256', '128x128', '64x64']}
        bind:selected={$userSettings.thumbSize}
    />
</Setting>
<Setting>
    <span slot="title">
        {$_('settings.general.language.title')}
        <span
            class="px-2 py-1 ml-2 text-sm text-white bg-black rounded-md dark:bg-white dark:text-black"
        >
            {$_('settings.general.language.beta')}
        </span>
    </span>
    <p slot="description">
        {$_('settings.general.language.description')}
    </p>
    <select
        bind:value={selectedLocale}
        class="p-2 py-1 rounded-md dark:bg-zinc-700"
    >
        {#each $locales as locale}
            <option value={locale}>
                {names.get(locale) || locale}
            </option>
        {/each}
    </select>
    <Button
        color={Color.ghost}
        class="justify-center w-full md:max-w-[8rem] h-10 ml-auto"
        onclick={() => {
            localStorage.removeItem('locale')
            locale.set(window.navigator.language)
        }}
    >
        Reset
    </Button>
</Setting>
