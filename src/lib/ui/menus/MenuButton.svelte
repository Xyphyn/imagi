<script lang="ts">
    import { Color } from '../colors'

    export let onclick = () => {}
    export let color: Color = Color.secondary
    export let link = false
    export let href = ''
</script>

{#if link}
    <a
        {href}
        class="flex flex-row gap-2 items-center px-4 py-2 w-full text-sm transition-colors {color}"
    >
        <slot />
    </a>
{:else}
    <button
        on:click={onclick}
        type="button"
        class="flex flex-row gap-2 items-center px-4 py-2 w-full text-sm transition-colors {color}"
    >
        <slot />
    </button>
{/if}
