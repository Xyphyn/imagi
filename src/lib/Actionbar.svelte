<script lang="ts">
    import { onMount } from 'svelte'
    import { expoInOut } from 'svelte/easing'

    let open = false

    /**
     * How far you can scroll before the actionbar appears
     */
    export let threshold = 300

    onMount(() => {
        window.addEventListener('scroll', (event) => {
            open = window.scrollY > threshold
        })
    })

    // @ts-ignore
    function popIn(node: Node, { duration }) {
        return {
            duration,
            css: (t: number) => {
                const eased = expoInOut(t)

                return `
					transform: translateY(calc(-4rem + ${eased * 4}rem));
                `
            },
        }
    }
</script>

{#if open}
    <div
        class="fixed top-0 w-full backdrop-blur-2xl bg-white dark:bg-slate-800 bg-opacity-90 h-16 p-4 flex flex-row items-center z-20 m-0 left-0"
        transition:popIn={{ duration: 750 }}
    >
        <div class="mr-auto rounded-full w-12 h-12">
            <slot name="image" />
        </div>
        <slot name="button" />
    </div>
{/if}
