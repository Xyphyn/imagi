<script lang="ts">
    import { fade, scale } from 'svelte/transition'

    export let open = false
</script>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="flex overflow-hidden fixed top-0 left-0 z-20 flex-col justify-center items-center w-screen h-screen bg-black/30"
        transition:fade={{ duration: 200 }}
        on:click={() => (open = false)}
    >
        <div
            class="bg-white dark:bg-zinc-800 z-30 rounded-lg flex flex-col min-w-[30vw] gap-4 overflow-hidden"
            transition:scale={{ duration: 200, start: 0.9 }}
        >
            <div class="flex flex-col gap-2 p-8">
                <h1 class="text-lg font-bold"><slot name="title" /></h1>
                <p class="text-sm opacity-70">
                    <slot name="content" />
                </p>
            </div>
            <div
                class="flex flex-row px-4 py-2 w-full bg-zinc-50 dark:bg-zinc-800"
            >
                <button on:click={() => (open = false)} class="ml-auto">
                    <slot name="button" />
                </button>
            </div>
        </div>
    </div>
{/if}
