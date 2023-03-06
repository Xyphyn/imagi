<script lang="ts">
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'

    export let data: any
    let post: PostsResponse<any> = data.post
</script>

<div
    class="w-max mx-auto flex flex-col justify-center items-center p-4 gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
>
    <div class="self-start inline-flex justify-between w-full">
        <span>{post.description}</span><a
            href={`/user/${post.expand?.user.username}`}
            class="opacity-30">@{post.expand?.user.username}</a
        >
    </div>
    <img
        src={pb.getFileUrl(post, post.image)}
        alt={post.description}
        class="rounded-lg shadow-md w-96"
    />
</div>
