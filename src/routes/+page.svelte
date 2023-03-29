<script lang="ts">
    import Live from '$lib/misc/Live.svelte'
    import type {
        CommunitiesResponse,
        PostCountsResponse,
        PostsResponse,
    } from '$lib/types/pb-types'
    import { onDestroy, onMount } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/posts/PostList.svelte'
    import Button from '$lib/Button.svelte'
    import nProgress from 'nprogress'
    import Colored from '$lib/misc/Colored.svelte'
    import Loader from '$lib/Loader.svelte'
    import Avatar from '$lib/Avatar.svelte'
    import RowSkeleton from '$lib/skeletons/RowSkeleton.svelte'
    import { ChevronLeft, ChevronRight, Icon } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'

    let posts: PostsResponse<any>[] | undefined
    let communities: CommunitiesResponse<any>[] | undefined

    let sort: 'recent' | 'following' | 'popular' = 'recent'
    let page = 1

    async function fetchPage(p: number) {
        nProgress.start()

        if (p < 1) {
            page = 1
        }

        let filterString = ''
        if ($currentUser?.communities) {
            filterString = $currentUser?.communities
                .map((community: string) => `community.id = "${community}"`)
                .join(' || ')
        }

        if (sort == 'recent' || sort == 'following') {
            const results = await pb
                .collection('posts')
                .getList<PostsResponse<any>>(p, 50, {
                    expand: 'user,postCounts(post),community',
                    sort: '-created',
                    filter: sort == 'following' ? filterString : '',
                })

            if (p > Math.ceil(results.totalItems / 50)) {
                page--
                hasMore = false
            }

            if (!posts) posts = results.items
            else posts = [...posts, ...results.items]
        } else if (sort == 'popular') {
            const results = await pb
                .collection('postCounts')
                .getList<PostCountsResponse<any>>(p, 50, {
                    expand: 'post.user,post.community,post.postCounts(post)',
                    sort: '-likes',
                })
            if (p > Math.ceil(results.totalItems / 50)) {
                page--
                hasMore = false
            }

            const mapped = results.items.map((item) => item.expand['post'])

            //@ts-ignore i hate typescript
            if (!posts) posts = mapped
            else posts = [...posts, ...mapped]
        }

        nProgress.done()
    }

    onMount(async () => {
        fetchPage(page)

        pb.collection('communities')
            .getList<CommunitiesResponse>(1, 50, {
                sort: '-created',
            })
            .then((data) => {
                communities = data.items
            })

        pb.collection('posts').subscribe<PostsResponse<any>>(
            '*',
            async ({ record, action }) => {
                if (sort == 'popular') return
                if (action == 'create') {
                    if (sort == 'following') {
                        if (
                            !$currentUser?.communities.includes(
                                record.community
                            )
                        ) {
                            return
                        }
                    }

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
                        record.expand = { user, 'postCounts(post)': [stats] }
                    }

                    posts = [record, ...posts!]
                }

                if (action == 'delete') {
                    posts = posts?.filter((post) => post.id != record.id)
                }
            }
        )
    })

    // infinite scroll
    let listing: any
    let hasMore = true
</script>

<title>Imagi</title>
<h1 class="m-4 mt-0 text-4xl font-bold"><Colored>Communities</Colored></h1>
<div class="flex overflow-auto flex-row gap-4 m-4 h-12">
    {#if communities}
        {#each communities as community}
            <div class="flex flex-row flex-shrink-0 gap-2 items-center h-8">
                <Avatar
                    user={community}
                    type="community"
                    width={32}
                    thumbnail="32x32"
                />
                <a href={`/community/${community.name}`}>{community.name}</a>
            </div>
        {/each}
    {:else}
        {#each new Array(15) as items}
            <RowSkeleton />
        {/each}
    {/if}
</div>
<h1 class="m-4 mt-0 text-4xl font-bold">
    <Colored>Posts</Colored>
</h1>
<div class="flex flex-row gap-4 mb-4 ml-4">
    <Button
        major={sort == 'recent'}
        onclick={() => {
            sort = 'recent'
            fetchPage(page)
        }}
    >
        Recent
    </Button>
    <Button
        major={sort == 'following'}
        onclick={() => {
            sort = 'following'
            fetchPage(page)
        }}
    >
        Following
    </Button>
    <Button
        major={sort == 'popular'}
        onclick={() => {
            sort = 'popular'
            fetchPage(page)
        }}
    >
        Popular
    </Button>
</div>

<Live live={sort != 'popular'} />
<PostList {posts} bind:this={listing} />
<InfiniteScroll
    threshold={50}
    on:loadMore={() => {
        fetchPage(++page)
        console.log('hi')
    }}
    window={true}
    {hasMore}
/>
{#if !hasMore}
    <span
        class="text-xl font-bold w-full flex flex-row justify-center items-center"
    >
        🎉 Congrats, you reached the end!
    </span>
{/if}
