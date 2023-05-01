<script lang="ts">
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'
    import Setting from '../Setting.svelte'
    import { locales, locale, _ } from 'svelte-i18n'
    import { browser } from '$app/environment'
    import { Color } from '$lib/ui/colors'
    import SelectMenu from '$lib/ui/input/SelectMenu.svelte'

    const names: Map<string, string> = new Map([
        ['en', '🇬🇧 English'],
        ['he', '🇮🇱 עִברִית'],
        ['es', '🇪🇸 Español'],
        ['de', '🇩🇪 Deutsch'],
        ['fr', '🥖 french'],
        ['ar', '🇸🇦 Arabic'],
        ['ru', '🇷🇺 Русский'],
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
        options={['0x0', '256x256', '128x128', '64x64']}
        optionNames={[
            $_('settings.general.thumbSize.fullQuality'),
            '256x256',
            '128x128',
            '64x64',
        ]}
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
    <div class="flex flex-row items-center w-full">
        <SelectMenu
            bind:selected={selectedLocale}
            options={$locales}
            optionNames={names}
        />
        <Button
            color={Color.ghost}
            class="justify-center top-12 w-full max-w-[8rem] md:top-0 h-10 ml-auto"
            onclick={() => {
                localStorage.removeItem('locale')
                locale.set(window.navigator.language)
            }}
        >
            Reset
        </Button>
    </div>
</Setting>
