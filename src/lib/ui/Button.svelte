<script lang="ts">
    import { Color } from '$lib/ui/colors'
    import DotsLoad from './loaders/DotsLoad.svelte'

    export let color: Color = Color.secondary
    export let onclick: () => any = () => {}
    export let href = ''
    export let link = false
    export let label = ''
    export let disabled = false
    export let loading = false
    export let pill = false
    export let submit = false

    let clazz = ''
    export { clazz as class }
</script>

{#if !link}
    <button
        on:click={onclick}
        class="flex flex-row items-center gap-2 text-sm
          px-3 py-1.5 transition-all {loading ? 'bg-transparent' : ''} {disabled
            ? 'opacity-50 pointer-events-none cursor-default'
            : ''} {pill ? 'rounded-full' : 'rounded-md'} {color} {clazz}"
        aria-label={label}
        type={submit ? 'submit' : 'button'}
    >
        {#if !loading}
            <slot />
        {:else}
            <DotsLoad />
        {/if}
    </button>
{:else}
    <a
        {href}
        class="flex flex-row items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-all no-underline {disabled
            ? 'opacity-50 pointer-events-none cursor-default'
            : ''} {pill ? 'rounded-full' : ''} {color} {clazz}"
        aria-label={label}
        on:click={onclick}
    >
        <slot />
    </a>
{/if}
