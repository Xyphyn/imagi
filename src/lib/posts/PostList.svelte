<script lang="ts">
    import PostSkeleton from '$lib/skeletons/PostSkeleton.svelte'
    import { flip } from 'svelte/animate'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'
    import Post from './Post.svelte'
    import PostView from './PostView.svelte'

    export let posts: PostsResponse<UsersResponse>[] | undefined
    export let containerQuery = false

    let open = false
</script>

<div
    class="grid grid-cols-1 gap-4 p-4 w-full {containerQuery
        ? '@md:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-4'
        : 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'}"
>
    {#if !posts}
        {#each new Array(50) as items}
            <PostSkeleton />
        {/each}
    {:else}
        {#each posts as post (post.id)}
            <div animate:flip={{ duration: 500 }} class="w-full h-full">
                <div class="w-full h-full popin">
                    <Post {post} bind:open />
                </div>
            </div>
        {/each}
    {/if}
</div>
<PostView bind:open />
