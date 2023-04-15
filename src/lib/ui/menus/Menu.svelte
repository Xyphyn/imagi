<script lang="ts">
    import { expoOut } from 'svelte/easing'
    import { scale } from 'svelte/transition'

    export let open = false

    let clazz = ''
    export { clazz as class }

    export let itemsClass = ''

    export let absolute = false
    export let rtl = true
</script>

<button
    class="overflow-visible z-30 {absolute
        ? 'absolute'
        : 'relative'} cursor-auto {clazz}"
    on:click={() => (open = !open)}
>
    <slot name="button" />
    {#if open}
        <div
            transition:scale|local={{
                duration: 200,
                start: 0.95,
                easing: expoOut,
            }}
            class="absolute {rtl
                ? 'origin-top-right top-[100%] right-0'
                : 'origin-top-left top-[100%] left-0'}
            rounded-md py-2 min-w-[16rem] my-2 flex flex-col shadow-lg {itemsClass
                ? itemsClass
                : 'bg-white dark:bg-zinc-900'}"
        >
            {#if open}
                <slot />
            {/if}
        </div>
    {/if}
</button>
