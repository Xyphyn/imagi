<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/pocketbase'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'

    export let post: PostsResponse<any>
</script>

<div
    class="relative bg-slate-50 dark:bg-slate-900 shadow-xl aspect-square rounded-lg hover:-translate-y-2 transition-transform ease-out duration-250 cursor-pointer"
    on:click={() => goto(`/post/${post.id}`)}
    on:keypress={() => goto(`/post/${post.id}`)}
>
    <img
        src={pb.getFileUrl(post, post.image, { thumb: '128x128' })}
        alt={post.description}
        class="w-full h-full object-cover aspect-square rounded-lg"
    />
    <span
        class="absolute bottom-0 left-0 w-full py-2 px-4 bg-white text-black dark:bg-slate-800 dark:text-white rounded-b-lg flex flex-row justify-between"
        >{post.description}
        <span class="opacity-30">@{post.expand?.user.username}</span></span
    >
</div>
