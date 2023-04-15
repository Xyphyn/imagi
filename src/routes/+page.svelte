<script lang="ts">
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import InfiniteScroll from 'svelte-infinite-scroll'
    import { userSettings } from '$lib/settings'
    import RecordList from '$lib/backend/RecordList.svelte'
    import {
        Collections,
        type CommunitiesResponse,
        type PostsResponse,
    } from '$lib/backend/schema'
    import CommunityAvatar from '$lib/ui/profile/CommunityAvatar.svelte'
    import { user } from '$lib/backend/pocketbase'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'

    interface Sort {
        filterFunction: (
            t: PostsResponse<{ community: CommunitiesResponse }>
        ) => boolean
        filterString: string
    }

    const sorts: Map<string, Sort> = new Map([
        [
            'recent',
            {
                filterFunction: (t) => true,
                filterString: '',
            },
        ],
        [
            'followed',
            {
                filterFunction: (t) => {
                    if (!$user) return true
                    else
                        return $user.communities.includes(
                            t.expand?.community.id
                        )
                },
                filterString: `${($user?.communities || [])
                    .map((c: string) => `community.id = "${c}"`)
                    .join(' || ')}`,
            },
        ],
    ])

    let sort: Sort = sorts.get('recent')!

    let selectedSort = 'recent'
</script>

<title>Imagi</title>
<div
    class="flex flex-col gap-4 items-center {$userSettings.grid
        ? ''
        : 'max-w-xl mx-auto'}"
>
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
    <PostFetch
        let:posts
        let:fetchPosts
        let:hasMore
        let:addPosts
        filter={sort.filterFunction}
        filterString={sort.filterString}
    >
        <div class="self-start">
            <MultiSelect
                class="capitalize"
                options={Array.from(sorts.keys())}
                bind:selected={selectedSort}
                on:select={async (selected) => {
                    const sel = sorts.get(selected.detail)

                    if (!sel) return
                    sort = sel

                    addPosts(
                        await fetchPosts(false, true, sort.filterString),
                        true
                    )
                }}
            />
        </div>
        <PostList grid={$userSettings.grid} {posts} />
        <InfiniteScroll
            threshold={800}
            on:loadMore={async () => {
                addPosts(
                    await fetchPosts(true, false, sort.filterString),
                    false
                )
            }}
            window={true}
            {hasMore}
        />
    </PostFetch>
</div>
