<script lang="ts">
    import Comments from '$lib/comments/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { openPost } from '../../stores'

    let loading = true

    let prevPost: PostsResponse<any>

    openPost.subscribe((post) => {
        if (prevPost != post) {
            loading = true
            prevPost = post
        }
    })
    export let open: boolean = false
</script>

<Modal bind:open>
    <div class="max-w-[95vw] items-center flex flex-col gap-4">
        {#if $openPost}
            <div class="self-start inline-flex justify-between w-full">
                <span>{$openPost.description}</span><a
                    href={`/user/${$openPost.expand?.user.username}`}
                    class="opacity-30">@{$openPost.expand?.user.username}</a
                >
            </div>
            {#if loading}
                <Loader />
            {/if}
            <img
                src={pb.getFileUrl($openPost, $openPost.image)}
                alt={$openPost.description}
                class="rounded-lg shadow-md w-96"
                on:load={() => (loading = false)}
            />
            <Comments post={$openPost} />
        {/if}
    </div>
</Modal>
