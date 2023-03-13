<script lang="ts">
    // @ts-nocheck
    import { goto } from '$app/navigation'

    import { page } from '$app/stores'
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
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

    const communityParam = $page.params.name

    let err: any

    let community: CommunitiesResponse<any> | undefined
    let posts: PostsResponse<any>[] | undefined
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

        const postResults = await pb
            .collection('posts')
            .getList<PostsResponse<any>>(1, 50, {
                filter: `community.id = "${community.id}"`,
                sort: '-created',
                expand: 'user',
            })

        posts = postResults.items
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
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={UserGroup} size="20" />
                    {counts.members}</span
                >
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={PencilSquare} size="20" />
                    {counts.posts}</span
                >
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={Calendar} size="20" />
                    {new Date(community.created).toLocaleDateString()}</span
                >
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={UserCircle} size="20" />
                    <a href={`/user/${community.expand?.owner.username}`}
                        >@{community.expand?.owner.username}</a
                    >
                </span>
            {:else}
                <Loader />
            {/if}
        </div>
        {#if $currentUser}
            <Button
                major={$currentUser.communities.includes(community.id)}
                onclick={() => follow(community)}
                >{#if $currentUser.communities.includes(community.id)}
                    Followed
                {:else}
                    Follow
                {/if}</Button
            >
        {/if}
    {:else}
        <Loader />
    {/if}
</div>
<PostList {posts} />
