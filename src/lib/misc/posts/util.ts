export const isVideo = (url: string) => {
    const types = ['mp4', 'mkv', 'webm', 'mov']

    for (const type of types) {
        if (new URL(url).pathname.toLowerCase().endsWith(type)) return true
    }

    return false
}
