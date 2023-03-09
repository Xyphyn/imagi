<script lang="ts">
    import { pb } from '$lib/pocketbase'
    import { onMount } from 'svelte'
    import { flip } from 'svelte/animate'
    import Loader from '../Loader.svelte'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'
    import Post from './Post.svelte'
    import PostView from './PostView.svelte'

    export let posts: PostsResponse<UsersResponse>[] | undefined

    let open = false
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full gap-4 p-4"
>
    {#if !posts}
        <div
            class="popin relative bg-white dark:bg-slate-800 shadow-xl aspect-square h-full animate-pulse rounded-lg"
        >
            <span
                class="absolute bottom-0 left-0 w-full py-2 px-4 h-8 animate-pulse bg-white text-black dark:bg-slate-800 dark:text-white rounded-b-lg flex flex-row justify-between"
            />
        </div>
    {:else}
        {#each posts as post (post.id)}
            <div animate:flip={{ duration: 500 }} class="w-full h-full">
                <div class="popin w-full h-full">
                    <Post {post} bind:open />
                </div>
            </div>
        {/each}
    {/if}
</div>
<PostView bind:open />
