<script lang="ts">
    // @ts-nocheck
    import { goto } from '$app/navigation'

    import { page } from '$app/stores'
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostFetch from '$lib/posts/PostFetch.svelte'
    import PostList from '$lib/posts/PostList.svelte'
    import type {
        CommunitiesResponse,
        CommunityCountsResponse,
        PostsResponse,
    } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import {
        Calendar,
        Icon,
        PencilSquare,
        UserCircle,
        UserGroup,
    } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'

    const communityParam = $page.params.name

    let err: any

    let community: CommunitiesResponse<any> | undefined
    let counts: CommunityCountsResponse | undefined

    onMount(async () => {
        const results = await pb
            .collection('communities')
            .getList<CommunitiesResponse<any>>(1, 1, {
                filter: `name = "${communityParam}"`,
                expand: 'owner,communityCounts(community)',
            })

        if (results.items.length == 0) {
            err = 'No user found'
            return
        }
        community = results.items[0]

        counts = community.expand['communityCounts(community)'][0]
    })

    function follow(community: CommunitiesResponse) {
        if (!$currentUser) {
            goto('/login')
        }
        if ($currentUser.communities.includes(community.id)) {
            $currentUser.communities = $currentUser.communities.filter(
                (c) => c != community.id
            )
        } else {
            $currentUser.communities.push(community.id)
        }

        pb.collection('users').update($currentUser.id, {
            communities: $currentUser!.communities,
        })
    }
</script>

<title>Imagi | Community</title>
<div
    class="dark:bg-slate-800 bg-white max-w-xl min-h-[24rem] mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg"
>
    {#if err}
        <span>404 - Not found</span>
    {:else if community}
        <Avatar user={community} type="community" width={128} />

        <h1 class="text-4xl font-bold"><Colored>{community.name}</Colored></h1>
        <p class="italic">{community.description}</p>
        <div class="flex flex-row gap-4 justify-center w-full">
            {#if counts}
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={UserGroup} size="20" />
                    {counts.members}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={PencilSquare} size="20" />
                    {counts.posts}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={Calendar} size="20" />
                    {new Date(community.created).toLocaleDateString()}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={UserCircle} size="20" />
                    <a href={`/user/${community.expand?.owner.username}`}>
                        @{community.expand?.owner.username}
                    </a>
                </span>
            {:else}
                <Loader />
            {/if}
        </div>
        {#if $currentUser}
            <Button
                major={$currentUser.communities.includes(community.id)}
                onclick={() => follow(community)}
            >
                {#if $currentUser.communities.includes(community.id)}
                    Followed
                {:else}
                    Follow
                {/if}
            </Button>
        {/if}
    {:else}
        <Loader />
    {/if}
</div>
{#if community}
    <PostFetch
        let:posts
        let:fetchPosts
        let:hasMore
        let:addPosts
        filter={(record) => record.community == community?.id}
        filterString={`community.id = "${community.id}"`}
    >
        <PostList {posts} />
        <InfiniteScroll
            threshold={400}
            on:loadMore={async () =>
                addPosts(
                    await fetchPosts(
                        true,
                        false,
                        `community.id = "${community?.id}"`
                    ),
                    false
                )}
            window={true}
            {hasMore}
        />
    </PostFetch>
{/if}
