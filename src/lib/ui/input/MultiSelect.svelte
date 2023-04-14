<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    type T = $$Generic
    export let options: T[]
    export let selected: T

    let clazz = ''
    export { clazz as class }

    const dispatcher = createEventDispatcher<{ select: T }>()

    $: {
        dispatcher('select', selected)
    }
</script>

<div class="flex overflow-hidden flex-row items-center w-max rounded-md">
    {#each options as option}
        <button
            class="px-3 py-2 text-sm
             transition-colors
            {selected == option
                ? 'bg-black text-white dark:bg-white dark:text-black\
                hover:bg-zinc-900 hover:dark:bg-zinc-300'
                : 'bg-slate-200 dark:bg-zinc-700 hover:bg-slate-100 hover:dark:bg-zinc-600'} {clazz}
            "
            on:click={() => (selected = option)}
        >
            {option}
        </button>
    {/each}
</div>
