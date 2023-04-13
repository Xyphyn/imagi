<script lang="ts">
    import { expoOut } from 'svelte/easing'
    import { scale } from 'svelte/transition'

    export let open = false
</script>

<button
    class="overflow-visible relative z-20 cursor-auto"
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
            class="absolute origin-top-right top-[100%] right-0 bg-white dark:bg-gray-800 rounded-md py-2 min-w-[16rem] my-4 flex flex-col shadow-lg"
        >
            {#if open}
                <slot />
            {/if}
        </div>
    {/if}
</button>
