<script lang="ts">
    import Loader from '../Loader.svelte'
    import type { PostsResponse, UsersRecord } from '../types/pb-types'
    import Post from './Post.svelte'

    export let posts: Promise<PostsResponse<UsersRecord>[]>
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full gap-4"
>
    {#await posts}
        <Loader />
    {:then posts}
        {#each posts as post}
            <Post {post} />
        {/each}
    {/await}
</div>
