<script lang="ts">
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'
    import Setting from '../Setting.svelte'
    import { locales, locale } from 'svelte-i18n'
    import { browser } from '$app/environment'

    const names: Map<string, string> = new Map([
        ['en', '🇬🇧 English'],
        ['es', '🇪🇸 Spanish'],
        ['he', '🇮🇱 Hebrew'],
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
    <span slot="title">Grid</span>
    <p slot="description">Makes the post lists a grid rather than a column.</p>
    <SwitchInput bind:enabled={$userSettings.grid} />
    <span class="text-sm">
        {$userSettings.grid ? 'Enabled' : 'Disabled'}
    </span>
</Setting>
<Setting>
    <span slot="title">Thumbnail Size</span>
    <p slot="description">
        The resolution to make thumbnails. 64x64 will disable video thumbnails.
    </p>
    <MultiSelect
        separate={false}
        options={['256x256', '128x128', '64x64']}
        bind:selected={$userSettings.thumbSize}
    />
</Setting>
<Setting>
    <span slot="title">
        Language <span
            class="px-2 py-1 ml-2 text-sm text-white bg-black rounded-md dark:bg-white dark:text-black"
        >
            Beta
        </span>
    </span>
    <p slot="description">
        The language UI is in. See an inaccurate or missing translation? Make a
        pull request.
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
</Setting>
