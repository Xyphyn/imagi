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
        <Loader />
    {:else}
        {#each posts as post (post.id)}
            <div animate:flip={{ duration: 500 }}>
                <div class="popin">
                    <Post {post} bind:open />
                </div>
            </div>
        {/each}
    {/if}
</div>
<PostView bind:open />
