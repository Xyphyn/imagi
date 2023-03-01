<script lang="ts">
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import type { Community } from '$lib/types/post'
    import { onMount } from 'svelte'

    interface LoadData {
        name: string
    }

    export let data: LoadData

    const name = data.name
    let community: Community

    let error: any

    onMount(async () => {
        pb.collection('communities')
            .getList<Community>(1, 1, { filter: `name = "${name}"` })
            .then((list) => {
                if (list.totalItems == 0) {
                    error = 'No community'
                }
                community = list.items[0]
            })
            .catch((err) => {
                error = err
            })
    })
</script>

<h1>{name}</h1>
{#if !community}
    <Loader />
{:else if error}
    <span>No community exists with that name.</span>
{:else}
    <span>{community.description}</span>
{/if}

<style>
</style>
