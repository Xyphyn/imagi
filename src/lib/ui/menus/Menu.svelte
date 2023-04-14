<script lang="ts">
    import { expoOut } from 'svelte/easing'
    import { scale } from 'svelte/transition'

    export let open = false

    let clazz = ''
    export { clazz as class }

    export let absolute = false
</script>

<button
    class="overflow-visible z-20 {absolute
        ? 'absolute'
        : 'relative'} cursor-auto {clazz}"
    on:click={() => (open = !open)}
>
    <slot name="button" />
    {#if open}
        <div
            transition:scale|local={{
                duration: 200,
                start: 0.95,
                easing: expoOut,
            }}
            class="absolute origin-top-right top-[100%] right-0 bg-white dark:bg-zinc-900 rounded-md py-2 min-w-[16rem] my-4 flex flex-col shadow-lg"
        >
            {#if open}
                <slot />
            {/if}
        </div>
    {/if}
</button>
