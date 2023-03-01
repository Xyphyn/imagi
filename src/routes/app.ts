import { pb } from "$lib/pocketbase"
import { toasts } from "svelte-toasts"
import type { ToastType } from "svelte-toasts/types/common"

export function getFile(post: any, fullQuality: boolean) {
    const firstFilename = post.image
    if (fullQuality) {
        return pb.getFileUrl(post, firstFilename)
    } else {
        return pb.getFileUrl(post, firstFilename, { thumb: '256x256' })
    }
}

export function isVideo(url: string) {
    const content = new URL(url)
    return (
        content.pathname.endsWith('webm') ||
        content.pathname.endsWith('mp4')
    )
}

export function showToast(title: string, description: string, type: ToastType) {
    toasts.add({
        title,
        description,
        type,
        duration: 5000,
        theme: 'dark',
    })
}

export function getProfilePicture(user: any): string {
    const firstFilename = user.avatar
    return pb.getFileUrl(user, firstFilename, { thumb: '128x128' })
}