<script lang="ts">
    import { Color } from '$lib/ui/colors'

    export let color: Color = Color.secondary
    export let onclick: () => any = () => {}
    export let href = ''
    export let link = false
    export let label = ''
    export let disabled = false

    let clazz = ''
    export { clazz as class }
</script>

{#if !link}
    <button
        on:click={onclick}
        class="flex flex-row items-center gap-2 text-sm
         rounded-md px-3 py-1.5 transition-all {disabled
            ? 'opacity-50 pointer-events-none cursor-default'
            : ''} {color} {clazz}"
        aria-label={label}
    >
        <slot />
    </button>
{:else}
    <a
        {href}
        class="flex flex-row items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-all no-underline {disabled
            ? 'opacity-50 pointer-events-none cursor-default'
            : ''} {color} {clazz}"
        aria-label={label}
        on:click={onclick}
    >
        <slot />
    </a>
{/if}
