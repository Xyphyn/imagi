<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Comments from '$lib/posts/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'
    import Likes from '$lib/posts/Likes.svelte'

    let loading = true

    export let data: any
    let post: PostsResponse<any> = data.post
</script>

<title>Imagi: {post.description}</title>
<meta content={`Imagi: ${post.description}`} property="og:title" />
<meta
    content={`View this post on Imagi, a real-time social app.`}
    property="og:description"
/>
<meta content={pb.getFileUrl(post, post.image)} property="og:image" />
<meta content={`#72efdd`} data-react-helmet="true" name="theme-color" />
<meta name="twitter:card" content="summary_large_image" />
<div
    class="popin w-max mx-auto flex flex-col justify-center items-center p-4 gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg outline-none max-w-[95vw] z-10"
>
    <div class="inline-flex justify-between self-start w-full">
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
        class="w-96 rounded-lg shadow-md"
        on:load={() => (loading = false)}
    />
    <Likes {post} />
    <Comments {post} />
</div>
