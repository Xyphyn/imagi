import { expoInOut, expoOut } from 'svelte/easing'

export function popIn(
    node: Node,
    {
        duration,
        height = 64,
        easing = expoInOut,
    }: { duration: number; height?: number; easing?: (t: number) => number }
) {
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
