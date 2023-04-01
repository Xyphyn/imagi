<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import { Collections, type PostsResponse } from '$lib/types/pb-types'
    import { onDestroy, onMount } from 'svelte'

    /**
     * The filter for new items (from subscriptions) to be filtered by.
     */
    export let filter: (record: any) => boolean = () => true

    export let filterString: string = ''

    export let batchSize: number = 20

    let posts: PostsResponse<any>[] | undefined

    let page: number = 1

    let hasMore: boolean = true

    const fetchPosts = async (
        increment: boolean | undefined,
        reset: boolean,
        filterString?: string
    ) => {
        if (reset) page = 1
        hasMore = true
        if (!hasMore) return

        if (increment == true) page++
        else if (increment == false) page--

        const data = await pb
            .collection(Collections.Posts)
            .getList<PostsResponse<any>>(page, batchSize, {
                filter: filterString ?? '',
                expand: 'community,user,postCounts(post)',
                sort: '-created',
            })

        if (posts)
            if (posts?.length + batchSize >= data.totalItems) hasMore = false

        return data.items!
    }

    const addPosts = (
        newPosts: PostsResponse<any>[] | undefined,
        replace: boolean
    ) => {
        if (!newPosts) return

        if (replace) posts = newPosts
        else posts = [...posts!, ...newPosts]
    }

    let unsubscribe: () => void

    onMount(async () => {
        posts = await fetchPosts(undefined, false, filterString)

        unsubscribe = await pb
            .collection(Collections.Posts)
            .subscribe<PostsResponse<any>>('*', async ({ record, action }) => {
                if (!filter(record)) return

                switch (action) {
                    case 'create': {
                        const user = await pb
                            .collection('users')
                            .getOne(record.user)

                        let stats = await pb
                            .collection('postCounts')
                            .getOne(record.id)

                        if (record.community) {
                            const community = await pb
                                .collection('communities')
                                .getOne(record.community)

                            record.expand = {
                                user,
                                community,
                                'postCounts(post)': [stats],
                            }
                        } else {
                            record.expand = {
                                user,
                                'postCounts(post)': [stats],
                            }
                        }

                        posts = [record, ...posts!]
                    }
                }
            })
    })

    onDestroy(() => {
        unsubscribe?.()
    })
</script>

<slot {posts} {fetchPosts} {page} {hasMore} {addPosts} />
