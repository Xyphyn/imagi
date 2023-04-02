<script lang="ts">
    // @ts-nocheck
    import { afterNavigate, goto } from '$app/navigation'

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

    export let data

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
    class="dark:bg-slate-800 bg-white max-w-xl min-h-[24rem] mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg popin"
>
    {#if data.community}
        <Avatar user={data.community} type="community" width={128} />

        <h1 class="text-4xl font-bold">
            <Colored>{data.community.name}</Colored>
        </h1>
        <p class="italic">{data.community.description}</p>
        <div class="flex flex-row gap-4 justify-center w-full">
            <span class="flex flex-row gap-1 items-center">
                <Icon src={UserGroup} size="20" />
                {data.community.expand['communityCounts(community)'][0].members}
            </span>
            <span class="flex flex-row gap-1 items-center">
                <Icon src={PencilSquare} size="20" />
                {data.community.expand['communityCounts(community)'][0].posts}
            </span>
            <span class="flex flex-row gap-1 items-center">
                <Icon src={Calendar} size="20" />
                {new Date(data.community.created).toLocaleDateString()}
            </span>
            <span class="flex flex-row gap-1 items-center">
                <Icon src={UserCircle} size="20" />
                <a href={`/user/${data.community.expand?.owner.username}`}>
                    @{data.community.expand?.owner.username}
                </a>
            </span>
        </div>
        {#if $currentUser}
            <Button
                major={$currentUser.communities.includes(data.community.id)}
                onclick={() => follow(data.community)}
            >
                {#if $currentUser.communities.includes(data.community.id)}
                    Followed
                {:else}
                    Follow
                {/if}
            </Button>
        {/if}
    {:else}
        <Loader width={24} />
    {/if}
</div>
{#if data.community}
    {#key data.community}
        <PostFetch
            let:posts
            let:fetchPosts
            let:hasMore
            let:addPosts
            filter={(record) => record.community == data.community?.id}
            filterString={`community.id = "${data.community.id}"`}
        >
            <PostList {posts} />
            <InfiniteScroll
                threshold={400}
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
    {/key}
{/if}
