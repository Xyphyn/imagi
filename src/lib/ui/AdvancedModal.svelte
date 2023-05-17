<script lang="ts">
    import { Icon, XMark } from 'svelte-hero-icons'
    import { fade, scale } from 'svelte/transition'
    import { cubicOut } from 'svelte/easing'

    export let open: boolean = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if open}
    <div
        class="flex fixed top-0 left-0 z-30 flex-col justify-center items-center w-full h-full bg-black bg-opacity-30"
        on:click={() => (open = false)}
        transition:fade={{ duration: 100 }}
    >
        <div
            on:click|stopPropagation={() => {}}
            in:scale={{ duration: 300, start: 0.95 }}
            out:scale={{ duration: 100, easing: cubicOut, start: 0.95 }}
            class={`min-h-[30vh] min-w-[min(max(30rem,30vw),90%)] open:flex flex-col max-w-full backdrop:bg-black backdrop:bg-opacity-30 open:backdrop:animate-fade-in align-middle rounded-lg
     shadow-lg bg-white dark:bg-zinc-900 text-inherit p-6 m-2 md:m-4 overflow-y-auto`}
            style="overflow-y: overlay;"
        >
            <div class="flex flex-row items-center">
                <h1 class="mr-auto text-xl"><slot name="title" /></h1>
                <button
                    class="flex relative top-0 right-0 flex-row gap-1 items-center self-start p-2 ml-auto w-min bg-opacity-0 rounded-lg transition-colors dark:bg-opacity-0 hover:bg-opacity-50 dark:hover:bg-opacity-50 bg-zinc-200 dark:bg-zinc-800 focus:border-none"
                    on:click={() => (open = false)}
                >
                    <Icon src={XMark} size="24" class="text-zinc-400" />
                </button>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click|stopPropagation>
                <slot />
            </div>
        </div>
    </div>
{/if}
