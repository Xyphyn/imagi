<script lang="ts">
    import { scale } from 'svelte/transition'

    export let open = false
</script>

<button
    class="relative overflow-visible cursor-auto"
    on:click={() => (open = !open)}
>
    <slot name="button" />
    {#if open}
        <div
            transition:scale={{ duration: 200, start: 0.9 }}
            class="absolute origin-top-right top-[100%] right-0 bg-white dark:bg-slate-700 rounded-md px-2 py-4 min-w-[16rem] my-4 gap-1 flex flex-col shadow-lg"
        >
            <div class="text-left text-xl mx-2 mb-1">
                <slot name="title" />
            </div>
            {#if open}
                <slot />
            {/if}
        </div>
    {/if}
</button>
