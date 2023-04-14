<script>
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
</script>

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
        class="flex flex-row gap-2 items-center px-8 py-4 w-full dark:bg-zinc-800 bg-slate-100"
    >
        <SwitchInput bind:enabled={$userSettings.grid} />
        <span class="text-sm">
            {$userSettings.grid ? 'Enabled' : 'Disabled'}
        </span>
    </div>
</div>
