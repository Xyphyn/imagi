import { writable } from 'svelte/store'

interface Settings {
    grid: boolean
    thumbSize: '0x0' | '256x256' | '128x128' | '64x64'
}

const defaultSettings: Settings = {
    grid: true,
    thumbSize: '256x256',
}

export const userSettings = writable(defaultSettings)

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

    userSettings.set(mergeObjects<Settings>(oldUserSettings, defaultSettings))
}

userSettings.subscribe((settings) => {
    if (typeof window != 'undefined') {
        localStorage.setItem('settings', JSON.stringify(settings))
    }
})
