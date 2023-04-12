<script lang="ts">
    import { fade, scale } from 'svelte/transition'

    export let open = false
</script>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="fixed top-0 left-0 bg-black/30 w-screen h-screen overflow-hidden flex-col flex justify-center items-center z-20"
        transition:fade={{ duration: 200 }}
        on:click={() => (open = false)}
    >
        <div
            class="bg-white dark:bg-slate-800 z-30 rounded-lg flex flex-col min-w-[30vw] gap-4 overflow-hidden"
            transition:scale={{ duration: 200, start: 0.9 }}
        >
            <div class="p-8 flex flex-col gap-2">
                <h1 class="font-bold text-lg"><slot name="title" /></h1>
                <p class="opacity-70 text-sm">
                    <slot name="content" />
                </p>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-800 flex flex-row w-full px-4 py-2"
            >
                <button on:click={() => (open = false)} class="ml-auto">
                    <slot name="button" />
                </button>
            </div>
        </div>
    </div>
{/if}
