<script lang="ts">
    export let expanded: boolean // boolean

    let dialog: HTMLDialogElement // HTMLDialogElement

    $: if (dialog && expanded) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    bind:this={dialog}
    on:close={() => (expanded = false)}
    on:click|self={() => dialog.close()}
>
    <div on:click|stopPropagation class="dialog-container">
        <slot />
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()}>Close</button>
    </div>
</dialog>

<style>
    dialog {
        max-width: 70%;
        max-height: 70%;
        border-radius: 8px;
        border: none;
        padding: 0;
        background-color: var(--card-color);
        color: #fff;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .dialog-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }

    dialog > div {
        padding: 1em;
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    dialog[open]::backdrop {
        animation: fade 250ms;
    }
</style>
