<script lang="ts">
    import { Icon, XMark } from 'svelte-hero-icons'
    import { fade } from 'svelte/transition'
    import { scaleIn } from '$lib/easing'
    import { cubicOut } from 'svelte/easing'

    export let open: boolean = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if open}
    <div
        class="fixed z-30 top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-30 bg-black"
        on:click={() => (open = false)}
        transition:fade={{ duration: 100 }}
    >
        <div
            in:scaleIn={{ duration: 300 }}
            out:scaleIn={{ duration: 100, easing: cubicOut }}
            class={`min-h-[30vh] min-w-[30vw] open:flex flex-col max-w-full backdrop:bg-black backdrop:bg-opacity-30 open:backdrop:animate-fade-in align-middle rounded-lg
     shadow-lg bg-white dark:bg-slate-800 text-inherit p-4 m-2 md:m-4 overflow-y-auto`}
        >
            <button
                class="flex w-min relative self-end ml-auto top-0 right-0 flex-row gap-1 items-center bg-opacity-0 dark:bg-opacity-0 transition-colors
         hover:bg-opacity-50 dark:hover:bg-opacity-50 bg-slate-200 dark:bg-slate-700 p-2 rounded-lg focus:border-none"
            >
                <Icon src={XMark} size="24" class="text-slate-400" />
            </button>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click|stopPropagation>
                <slot />
            </div>
        </div>
    </div>
{/if}
