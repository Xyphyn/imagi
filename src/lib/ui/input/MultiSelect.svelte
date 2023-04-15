<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    type T = $$Generic
    export let options: T[]
    export let selected: T
    export let separate = false

    let clazz = ''
    export { clazz as class }

    const dispatcher = createEventDispatcher<{ select: T }>()

    $: {
        dispatcher('select', selected)
    }
</script>

<div
    class="flex overflow-hidden flex-row items-center w-max rounded-md {separate
        ? 'gap-2'
        : ''}"
>
    {#each options as option}
        <button
            class="px-3 py-2 text-sm
             transition-colors {separate ? 'rounded-full' : ''}
            {selected == option
                ? 'bg-black text-white dark:bg-white dark:text-black\
                hover:bg-zinc-900 hover:dark:bg-zinc-300'
                : 'bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 hover:dark:bg-zinc-800'} {clazz}
            "
            on:click={() => (selected = option)}
        >
            {option}
        </button>
    {/each}
</div>
