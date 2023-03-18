<script lang="ts">
    import { Icon, ChevronLeft, XMark } from 'svelte-hero-icons'

    export let open: boolean = false

    let dialog: HTMLDialogElement // HTMLDialogElement

    $: if (dialog && open) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    bind:this={dialog}
    on:close={() => (open = false)}
    on:click|self={() => dialog.close()}
    class={`min-h-[30vh] min-w-[30vw] open:flex flex-col backdrop:bg-black backdrop:bg-opacity-30 open:backdrop:animate-fade-in align-middle rounded-lg
     shadow-lg bg-white dark:bg-slate-800 text-inherit scalein`}
>
    <button
        class="flex relative top-0 right-0 flex-row gap-1 items-center w-min bg-opacity-0 transition-colors hover:bg-opacity-50 bg-slate-200 p-2 rounded-lg focus:border-none"
        on:click={() => dialog.close()}
    >
        <Icon src={XMark} size="24" class="text-slate-400" />
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation>
        <slot />
    </div>
</dialog>
