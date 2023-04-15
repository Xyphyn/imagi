import { user } from '$lib/backend/pocketbase'
import { redirect } from '@sveltejs/kit'

export async function load() {
    if (!user) {
        throw redirect(300, '/settings/general')
    }
}
