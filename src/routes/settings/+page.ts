import { redirect } from '@sveltejs/kit'

export async function load() {
    // why
    throw redirect(300, '/settings/general')
}
