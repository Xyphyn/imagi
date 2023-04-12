<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import type { PostsResponse, UsersResponse } from '$lib/backend/schema'
    import { flip } from 'svelte/animate'
    import { expoInOut } from 'svelte/easing'

    export let posts: PostsResponse<{ user: UsersResponse }>[] | undefined =
        undefined
</script>

<div class="grid grid-cols-1 max-w-xl gap-4 w-full">
    {#if posts}
        {#each posts as post (post.id)}
            <div
                class="flex flex-col w-full rounded-lg overflow-hidden bg-white
                dark:bg-slate-800 p-8 shadow-lg gap-4 cursor-pointer hover:-translate-y-1 duration-200 transition-transform transform-gpu"
                animate:flip={{ duration: 750, easing: expoInOut }}
            >
                <div class="w-full h-max flex flex-row items-center gap-2">
                    <span class="font-bold text-lg">{post.description}</span>
                    •
                    <a href="/">
                        {post.expand?.user.username}
                    </a>
                </div>
                <img
                    src={pb.getFileUrl(post, post.image, { thumb: '256x0' })}
                    alt={post.alt_text || post.description}
                    class="rounded-lg w-full"
                    loading="lazy"
                />
            </div>
        {/each}
    {/if}
</div>
