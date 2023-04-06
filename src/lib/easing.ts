import { expoOut } from 'svelte/easing'

export function scaleIn(
    node: Node,
    {
        duration,
        easing = expoOut,
    }: { duration: number; easing?: (t: number) => number }
) {
    return {
        duration,
        css: (t: number) => {
            const eased = easing(t)

            return `
                transform: scale(calc(85% + ${eased * 15}%));
                opacity: ${eased * 100}%;
            `
        },
    }
}
