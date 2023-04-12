<script lang="ts">
    import { expoOut } from 'svelte/easing'
    import { scale } from 'svelte/transition'

    export let open = false
</script>

<button
    class="relative overflow-visible cursor-auto z-20"
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
            class="absolute origin-top-right top-[100%] right-0 bg-white dark:bg-slate-700 rounded-md p-4 min-w-[16rem] my-4 gap-2 flex flex-col shadow-lg"
        >
            <div class="text-left text-xl mb-1">
                <slot name="title" />
            </div>
            {#if open}
                <slot />
            {/if}
        </div>
    {/if}
</button>
