<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Comments from '$lib/comments/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'

    let loading = true

    export let data: any
    let post: PostsResponse<any> = data.post
</script>

<title>Imagi: {post.description}</title>

<div
    class="w-max mx-auto flex flex-col justify-center items-center p-4 gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg outline-none max-w-[95vw]"
>
    <div class="self-start inline-flex justify-between w-full">
        <span>{post.description}</span><a
            href={`/user/${post.expand?.user.username}`}
            class="opacity-30">@{post.expand?.user.username}</a
        >
    </div>
    {#if loading}
        <Loader />
    {/if}
    <img
        src={pb.getFileUrl(post, post.image)}
        alt={post.description}
        class="rounded-lg shadow-md w-96"
        on:load={() => (loading = false)}
    />
    <Comments {post} />
</div>
