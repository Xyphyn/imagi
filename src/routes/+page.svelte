<script lang="ts">
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import InfiniteScroll from 'svelte-infinite-scroll'
    import { userSettings } from '$lib/settings'
    import RecordList from '$lib/backend/RecordList.svelte'
    import { Collections, type CollectionResponses } from '$lib/backend/schema'
    import CommunityAvatar from '$lib/ui/profile/CommunityAvatar.svelte'
    import Live from '$lib/misc/Live.svelte'
</script>

<title>Imagi</title>
<div class="flex flex-col gap-4 items-center">
    <h1 class="self-start text-3xl font-bold">Communities</h1>

    <div class="flex overflow-x-auto flex-row gap-4 pb-4 w-full">
        <RecordList
            collection={Collections.Communities}
            let:items
            query={{ sort: '-created' }}
        >
            {#if items}
                {#each items as item}
                    <a
                        class="flex z-10 flex-row flex-shrink-0 gap-2 items-center px-4 py-2 bg-white rounded-lg shadow-md transition-transform transform-gpu dark:bg-zinc-900 hover:-translate-y-1"
                        href={`/community/${item.name}`}
                    >
                        <CommunityAvatar
                            width={32}
                            thumb="32x32"
                            community={item}
                        />
                        <span>
                            {item.name}
                        </span>
                    </a>
                {/each}
            {:else}
                {#each new Array(10) as item}
                    <div
                        class="flex z-10 flex-row flex-shrink-0 gap-2 items-center px-4 py-2 bg-white rounded-lg shadow-md transition-transform transform-gpu dark:bg-zinc-900 hover:-translate-y-1"
                    >
                        <div
                            class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animatepulse"
                        />
                        <div
                            class="w-24 h-4 rounded-full animate-pulse bg-zinc-100 dark:bg-zinc-800"
                        />
                    </div>
                {/each}
            {/if}
        </RecordList>
    </div>
    <h1 class="flex flex-row gap-2 items-center self-start text-3xl font-bold">
        Posts
    </h1>
    <PostFetch let:posts let:fetchPosts let:hasMore let:addPosts>
        <PostList grid={$userSettings.grid} {posts} />
        <InfiniteScroll
            threshold={800}
            on:loadMore={async () =>
                addPosts(await fetchPosts(true, false), false)}
            window={true}
            {hasMore}
        />
    </PostFetch>
</div>
