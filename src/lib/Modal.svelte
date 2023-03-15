<script lang="ts">
    import { Icon, ChevronLeft } from 'svelte-hero-icons'

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
     shadow-lg bg-slate-50 dark:bg-slate-800 text-inherit scalein`}
>
    <button
        class="inline-flex relative top-0 left-0 flex-row gap-1 items-center w-min opacity-50 transition-opacity hover:opacity-75 focus:border-none"
        on:click={() => dialog.close()}
    >
        <Icon src={ChevronLeft} size="20" /> Back
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation>
        <slot />
    </div>
</dialog>
