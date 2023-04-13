<script lang="ts">
    import type { ListQueryParams } from 'pocketbase'
    import type { Collections } from './schema'
    import { onMount } from 'svelte'
    import { pb } from './pocketbase'

    export let query: ListQueryParams = {}
    export let collection: Collections
    export let page = 1
    export let perPage = 1

    let items: Promise<any[]>

    onMount(() => {
        items = pb
            .collection(collection)
            .getList(page, perPage, query)
            .then((items) => items.items)
    })
</script>

<slot {items} />
