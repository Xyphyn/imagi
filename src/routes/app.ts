import { pb } from "$lib/pocketbase"

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