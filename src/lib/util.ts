export const isVideo = (url: string) => {
    const types = ['mp4', 'mkv', 'webm', 'mov']

    for (const type in types) {
        if (new URL(url).pathname.toLowerCase().endsWith(type)) return true
    }

    return false
}