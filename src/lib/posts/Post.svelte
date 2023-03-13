<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/pocketbase'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'
    import { openPost, userSettings } from '../../stores'
    import { ChatBubbleOvalLeftEllipsis, Heart, Icon } from 'svelte-hero-icons'

    export let post: PostsResponse<any>
    export let open = false

    let image = pb.getFileUrl(post, post.image, {
        thumb: $userSettings.thumbSize,
    })

    function postView() {
        openPost.set(post)

        open = true
    }
</script>

<div
    class="relative rounded-lg shadow-xl transition-transform ease-out cursor-pointer bg-slate-50 dark:bg-slate-900 aspect-square hover:-translate-y-2 duration-250"
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
        src={image.endsWith('webm') || image.endsWith('mp4') ? '' : image}
        alt={post.description}
        class="object-cover w-full h-full rounded-lg aspect-square"
        loading="lazy"
    />
    <span
        class="flex absolute bottom-0 left-0 flex-row gap-2 py-2 px-4 w-full text-black bg-white rounded-b-lg dark:bg-slate-800 dark:text-white"
    >
        {post.description}
        <span class="mr-auto text-slate-400 dark:text-slate-500">
            @{post.expand?.user.username}</span
        >
        {#if post.expand['postCounts(post)']}
            <span class="flex flex-row items-center">
                <Icon src={ChatBubbleOvalLeftEllipsis} mini={true} size="18" />
                {post.expand['postCounts(post)'][0].comments}
            </span>
            <span class="flex flex-row items-center">
                <Icon src={Heart} mini={true} size="18" />
                {post.expand['postCounts(post)'][0].likes}
            </span>
        {/if}
    </span>
</div>
