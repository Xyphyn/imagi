import type { PostsResponse } from '$lib/types/pb-types'
import { writable } from 'svelte/store'

interface UserSettings {
    nossr: boolean
    thumbSize: '64x64' | '128x128' | '256x256'
    readUntil: Date
    batchSize: number
}

const defaultSettings: UserSettings = {
    nossr: true,
    thumbSize: '128x128',
    readUntil: new Date(),
    batchSize: 20,
}

export const userSettings = writable(defaultSettings)
export const openPost = writable<PostsResponse<any>>()

function mergeObjects<T>(obj1: any, obj2: any): T {
    for (let prop in obj2) {
        if (!(prop in obj1) || obj1[prop] == null || obj2[prop] == '') {
            obj1[prop] = obj2[prop]
        }
    }
    return obj1
}

if (typeof window != 'undefined') {
    let oldUserSettings = JSON.parse(
        localStorage.getItem('settings') ?? JSON.stringify(defaultSettings)
    )

    userSettings.set(
        mergeObjects<UserSettings>(oldUserSettings, defaultSettings)
    )
}

userSettings.subscribe((settings) => {
    if (typeof window != 'undefined') {
        localStorage.setItem('settings', JSON.stringify(settings))
    }
})
