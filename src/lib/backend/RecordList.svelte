<script lang="ts">
    import type { ListQueryParams } from 'pocketbase'
    import type { CollectionResponses, Collections } from './schema'
    import { onMount } from 'svelte'
    import { pb } from './pocketbase'

    export let query: ListQueryParams = {}
    type Collection = $$Generic<Collections>
    export let collection: Collections & Collection
    export let page = 1
    export let perPage = 20

    let items: CollectionResponses[typeof collection][] | undefined

    onMount(async () => {
        items = await pb
            .collection(collection)
            .getList<CollectionResponses[typeof collection]>(
                page,
                perPage,
                query
            )
            .then((items) => items.items)
    })
</script>

<slot {items} />
