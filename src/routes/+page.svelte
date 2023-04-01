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
    import PostFetch from '$lib/posts/PostFetch.svelte'

    let communities: CommunitiesResponse<any>[] | undefined

    const sortStrings = {
        recent: {
            string: '',
            filter: (record: any) => true,
        },
        following: {
            string:
                $currentUser?.communities
                    .map((community: string) => `community.id = "${community}"`)
                    .join(' || ') ?? '',
            filter: (record: any) =>
                $currentUser?.communities.includes(record.community),
        },
    }

    let sort = sortStrings.recent

    onMount(async () => {
        pb.collection('communities')
            .getList<CommunitiesResponse>(1, 50, {
                sort: '-created',
            })
            .then((data) => {
                communities = data.items
            })
    })
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

<PostFetch
    let:posts
    let:fetchPosts
    let:hasMore
    let:addPosts
    filter={sort.filter}
>
    <div class="flex flex-row gap-4 mb-4 ml-4">
        <Button
            major={sort == sortStrings.recent}
            onclick={async () => {
                sort = sortStrings.recent
                addPosts(await fetchPosts(undefined, true, sort.string), true)
            }}
        >
            Recent
        </Button>
        <Button
            major={sort == sortStrings.following}
            onclick={async () => {
                sort = sortStrings.following
                addPosts(await fetchPosts(undefined, true, sort.string), true)
            }}
        >
            Following
        </Button>
    </div>
    <Live live={true} />
    <PostList {posts} />
    <InfiniteScroll
        threshold={400}
        on:loadMore={async () =>
            addPosts(await fetchPosts(true, false, sort.string), false)}
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
</PostFetch>
