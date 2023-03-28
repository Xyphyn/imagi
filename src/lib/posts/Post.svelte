<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse } from '../types/pb-types'
    import { openPost, userSettings } from '../../stores'
    import { ChatBubbleOvalLeftEllipsis, Heart, Icon } from 'svelte-hero-icons'
    import { isVideo } from '$lib/util'

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
        <!-- svelte-ignore a11y-media-has-caption -->
        <video class="object-cover w-full h-full aspect-square">
            <source src={image} />
        </video>
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
        <span
            class="break-words flex-shrink max-w-[80%] w-max font-bold mr-auto"
        >
            {post.description}
            <span class="text-slate-400 dark:text-slate-500 font-normal">
                • {post.expand?.user.username}
            </span>
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
