<script lang="ts">
    import { page } from '$app/stores'
    import Avatar from '$lib/Avatar.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import PostList from '$lib/posts/PostList.svelte'
    import type {
        CountsResponse,
        PostsResponse,
        UsersResponse,
    } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import {
        Calendar,
        ChatBubbleLeftEllipsis,
        Icon,
        PencilSquare,
    } from 'svelte-hero-icons'

    const userParam = $page.params.username

    let err: any

    let user: UsersResponse<any> | undefined
    let posts: PostsResponse<any>[] | undefined
    let counts: CountsResponse | undefined

    onMount(async () => {
        const results = await pb
            .collection('users')
            .getList<UsersResponse<any>>(1, 1, {
                filter: `username = "${userParam}"`,
                expand: `counts(user)`,
            })

        if (results.items.length == 0) {
            err = 'No user found'
            return
        }
        user = results.items[0]
        counts = user.expand['counts(user)'][0]

        const postResults = await pb
            .collection('posts')
            .getList<PostsResponse<any>>(1, 50, {
                filter: `user.id = "${user.id}"`,
                sort: '-created',
                expand: 'user, community',
            })

        posts = postResults.items
    })
</script>

<title>Imagi | User</title>
<div
    class="dark:bg-slate-800 bg-white max-w-xl min-h-[24rem] mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg"
>
    {#if err}
        <span>404 - Not found</span>
    {:else if user}
        <Avatar {user} width={128} />
        <h1 class="text-4xl font-bold"><Colored>{user.username}</Colored></h1>
        {#if user.bio}
            <p class="opacity-75">{user.bio}</p>
        {/if}
        <div class="flex flex-row gap-4 justify-center w-full">
            {#if counts}
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={ChatBubbleLeftEllipsis} size="20" />
                    {counts.comments}</span
                >
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={PencilSquare} size="20" />
                    {counts.posts}</span
                >
                <span class="flex flex-row gap-1 items-center"
                    ><Icon src={Calendar} size="20" />
                    {new Date(user.created).toLocaleDateString()}</span
                >
            {:else}
                <Loader />
            {/if}
        </div>
    {:else}
        <Loader />
    {/if}
</div>
<PostList {posts} />
