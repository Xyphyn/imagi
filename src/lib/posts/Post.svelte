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

    const isVideo = (url: string) =>
        new URL(url).pathname.endsWith('mp4') ||
        new URL(url).pathname.endsWith('webm')
</script>

<div
    class="overflow-hidden relative rounded-lg shadow-xl 
    transition-transform ease-out cursor-pointer bg-slate-50 dark:bg-slate-900 aspect-square hover:-translate-y-2 duration-250
    group hover:text-black
    "
    on:click={() => {
        if (!$userSettings.nossr) goto(`/post/${post.id}`)
        else postView()
    }}
    on:keypress={() => {
        if (!$userSettings.nossr) goto(`/post/${post.id}`)
        else postView()
    }}
>
    {#if isVideo(image)}
        <span
            class="w-full h-full flex flex-col items-center justify-center font-bold text-2xl"
        >
            Video
            <span class="text-sm font-normal">
                Video thumbnails aren't supported (yet)
            </span>
        </span>
    {:else}
        <img
            src={image}
            alt={post.description}
            class="object-cover w-full h-full aspect-square"
            loading="lazy"
        />
    {/if}
    <span
        class="flex absolute bottom-0 left-0 flex-row
         gap-2 px-4 py-2 w-full text-black bg-white dark:bg-slate-800
          dark:text-white"
    >
        <span class="break-words flex-shrink max-w-[80%] flex-grow">
            {post.description}
        </span>
        <span class="mr-auto text-slate-400 dark:text-slate-500">
            @{post.expand?.user.username}
        </span>
        {#if post.expand['postCounts(post)']}
            <span class="flex flex-row items-center">
                <Icon src={ChatBubbleOvalLeftEllipsis} mini size="18" />
                {post.expand['postCounts(post)'][0].comments}
            </span>
            <span class="flex flex-row items-center">
                <Icon src={Heart} mini size="18" />
                {post.expand['postCounts(post)'][0].likes}
            </span>
        {/if}
    </span>
</div>
