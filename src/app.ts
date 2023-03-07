import { toasts } from 'svelte-toasts'
import type { ToastType } from 'svelte-toasts/types/common'

export function toast(title: string, body: string, type: ToastType) {
    toasts.add({
        title: title,
        description: body,
        type: type,
        placement: 'top-right',
    })
}
