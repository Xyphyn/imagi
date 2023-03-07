<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/pocketbase'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'
    import { openPost, userSettings } from '../../stores'

    export let post: PostsResponse<any>
    export let open = false

    function postView() {
        openPost.set(post)
        open = true
    }
</script>

<div
    class="relative bg-slate-50 dark:bg-slate-900 shadow-xl aspect-square rounded-lg hover:-translate-y-2 transition-transform ease-out duration-250 cursor-pointer"
    on:click={() => {
        if (!$userSettings.nossr) goto(`/post/${post.id}`)
        else postView()
    }}
    on:keypress={() => {
        if (!$userSettings.nossr) goto(`/post/${post.id}`)
        else postView()
    }}
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
