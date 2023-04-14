<script>
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'
</script>

<title>Settings | General</title>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Grid</h1>
        <p class="text-sm opacity-70">
            Makes the post lists a grid rather than a column.
        </p>
    </div>
    <div
        class="flex flex-row gap-2 items-center px-8 py-4 w-full dark:bg-zinc-800 bg-slate-50"
    >
        <SwitchInput bind:enabled={$userSettings.grid} />
        <span class="text-sm">
            {$userSettings.grid ? 'Enabled' : 'Disabled'}
        </span>
    </div>
</div>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Thumbnail Size</h1>
        <p class="text-sm opacity-70">
            The resolution to make thumbnails. 64x64 will disable video
            thumbnails.
        </p>
    </div>
    <div
        class="flex flex-row gap-2 items-center px-8 py-4 w-full dark:bg-zinc-800 bg-slate-50"
    >
        <MultiSelect
            options={['256x256', '128x128', '64x64']}
            bind:selected={$userSettings.thumbSize}
        />
    </div>
</div>
