import { writable } from 'svelte/store'

export enum ToastType {
    'error' = 'from-red-400 to-red-500 text-red-400',
    'warning' = 'from-yellow-300 to-yellow-400 text-yellow-300',
    'success' = 'from-green-400 to-green-500 text-green-400',
    'info' = 'from-primary to-secondary text-primary',
}

export interface Toast {
    id: number
    title: string
    content: string
    type: ToastType
}

export const toasts = writable<Toast[]>([])

export function addToast(title: string, content: string, type: ToastType) {
    let id = 0

    toasts.update((toasts) => {
        id = Math.floor(Math.random() * 10000)

        return [
            ...toasts,
            {
                id: id,
                content: content,
                title: title,
                type: type,
            },
        ]
    })

    setTimeout(() => {
        toasts.update((toasts) => toasts.filter((toast) => toast.id != id))
    }, 5000)
}
