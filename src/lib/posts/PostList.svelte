<script lang="ts">
    import { flip } from 'svelte/animate'
    import Loader from '../Loader.svelte'
    import type {
        PostsResponse,
        UsersRecord,
        UsersResponse,
    } from '../types/pb-types'
    import Post from './Post.svelte'

    export let posts: Promise<PostsResponse<UsersResponse>[]>
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full gap-4 p-4"
>
    {#await posts}
        <Loader />
    {:then posts}
        {#each posts as post (post.id)}
            <div animate:flip class="popin"><Post {post} /></div>
        {/each}
    {/await}
</div>
