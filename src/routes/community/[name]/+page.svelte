<script lang="ts">
    import type {
        CommunitiesResponse,
        CommunityCountsResponse,
        UsersResponse,
    } from '$lib/backend/schema'
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import { userSettings } from '$lib/settings'
    import CommunityAvatar from '$lib/ui/profile/CommunityAvatar.svelte'
    import { Calendar, Icon, PencilSquare, UserGroup } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'

    export let data: {
        community: CommunitiesResponse<{
            'communityCounts(community)': CommunityCountsResponse[]
            owner: UsersResponse
        }>
    }
    //
</script>

<title>{data.community.name}</title>
<div
    class="flex flex-col gap-4 justify-center items-center p-8 mx-auto max-w-xl max-h-48 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="flex flex-row gap-4 items-center self-start">
        <CommunityAvatar
            community={data.community}
            width={64}
            thumb="128x128"
        />
        <div class="flex flex-col">
            <span class="text-xl font-bold">{data.community.name}</span>
            {#if data.community.description}
                <span class="text-sm">{data.community.description}</span>
            {/if}
        </div>
    </div>
    <div class="flex flex-row gap-4 self-start opacity-90">
        <div class="flex flex-row gap-1 items-center">
            <Icon src={Calendar} mini size="18" />
            {new Date(data.community.created).toLocaleDateString()}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={PencilSquare} mini size="18" />
            {data.community.expand?.['communityCounts(community)'][0].posts}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={UserGroup} size="18" />
            {data.community.expand?.['communityCounts(community)'][0].members}
        </div>
    </div>
</div>

<PostFetch
    let:posts
    let:fetchPosts
    let:hasMore
    let:addPosts
    filter={(record) => record.community == data.community?.id}
    filterString={`community.id = "${data.community.id}"`}
>
    <div class="flex flex-col items-center mt-4">
        <PostList grid={$userSettings.grid} {posts} />
    </div>
    <InfiniteScroll
        threshold={800}
        on:loadMore={async () =>
            addPosts(
                await fetchPosts(
                    true,
                    false,
                    `community.id = "${data.community?.id}"`
                ),
                false
            )}
        window={true}
        {hasMore}
    />
</PostFetch>
