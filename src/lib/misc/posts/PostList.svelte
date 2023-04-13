<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import type {
        CommunitiesResponse,
        PostCountsResponse,
        PostsResponse,
        UsersResponse,
    } from '$lib/backend/schema'
    import { ChatBubbleOvalLeftEllipsis, Heart, Icon } from 'svelte-hero-icons'
    import { flip } from 'svelte/animate'
    import { expoInOut } from 'svelte/easing'
    import RelativeDate from '../RelativeDate.svelte'
    import PostView from './PostView.svelte'
    import { isVideo } from './util'

    export let posts:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>[]
        | undefined = undefined

    export let grid = false

    export let openPost:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined = undefined

    let modalOpen = false
</script>

<div
    class="grid grid-cols-1 {grid
        ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
        : 'max-w-xl'} gap-4 w-full"
>
    {#if posts}
        {#each posts as post (post.id)}
            <div
                class="flex overflow-hidden flex-col gap-4 w-full bg-white rounded-lg shadow-lg
                transition-transform duration-200 transform-gpu cursor-pointer
                dark:bg-gray-800 hover:-translate-y-1 {grid
                    ? 'aspect-square flex-col-reverse'
                    : 'p-8'}"
                animate:flip={{ duration: 750, easing: expoInOut }}
                on:click={() => {
                    openPost = post
                    modalOpen = true
                }}
                on:keypress={() => {
                    openPost = post
                    modalOpen = true
                }}
            >
                <div
                    class="flex items-center w-full h-max {grid
                        ? 'absolute bottom-0 left-0 flex-col gap-0 px-4 py-2 w-full text-black bg-white dark:bg-gray-800 dark:text-white'
                        : 'flex-row gap-2'}"
                >
                    {#if grid}
                        <div class="flex flex-row gap-2 items-center w-full">
                            <span class="mr-auto">{post.description}</span>
                            <span class="flex flex-row items-center">
                                <Icon
                                    src={ChatBubbleOvalLeftEllipsis}
                                    mini
                                    size="18"
                                />
                                {post.expand?.['postCounts(post)'][0].comments}
                            </span>
                            <span class="flex flex-row items-center">
                                <Icon src={Heart} mini size="18" />
                                {post.expand?.['postCounts(post)'][0].likes}
                            </span>
                        </div>
                        <div
                            class="flex flex-row gap-2 items-center w-full text-sm opacity-70"
                        >
                            <span class="mr-auto">
                                {post.expand?.user.username}
                            </span>
                            <RelativeDate date={post.created} />
                        </div>
                    {:else}
                        <span class="text-lg font-bold">
                            {post.description}
                        </span>
                        •
                        <a href="/">
                            {post.expand?.user.username}
                        </a>
                    {/if}
                </div>
                {#if isVideo(pb.getFileUrl( post, post.image, { thumb: grid ? '256x256' : '256x0' } ))}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video
                        preload="metadata"
                        class="object-cover w-full h-full aspect-square"
                    >
                        <source src={pb.getFileUrl(post, post.image)} />
                    </video>
                {:else}
                    <img
                        src={pb.getFileUrl(post, post.image, {
                            thumb: grid ? '256x256' : '256x0',
                        })}
                        alt={post.alt_text || post.description}
                        class="object-cover w-full h-full rounded-lg aspect-square"
                        loading="lazy"
                    />
                {/if}
            </div>
        {/each}
    {/if}
</div>

<PostView bind:open={modalOpen} post={openPost} />
