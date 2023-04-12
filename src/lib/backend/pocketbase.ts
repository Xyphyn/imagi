import Pocketbase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new Pocketbase(
    import.meta.env.VITE_POCKETBASE || 'https://pocketbase.xylight.us'
)

export const user = writable(pb.authStore.model)

pb.authStore.onChange((auth) => user.set(pb.authStore.model))
