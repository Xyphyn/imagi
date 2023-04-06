<script lang="ts">
    import { popIn } from '$lib/easing'

    let open = false

    /**
     * How far you can scroll before the actionbar appears
     */
    export let threshold = 300

    let scroll = 0

    $: open = scroll > threshold
</script>

<svelte:window bind:scrollY={scroll} />
{#if open}
    <div
        class="fixed top-0 w-full backdrop-blur-2xl bg-white dark:bg-slate-800 bg-opacity-90 dark:bg-opacity-80 h-16 p-4 flex flex-row items-center z-20 m-0 left-0"
        transition:popIn|local={{ duration: 750 }}
    >
        <div class="mr-auto rounded-full w-12 h-12">
            <slot name="image" />
        </div>
        <slot name="buttons" />
    </div>
{/if}
