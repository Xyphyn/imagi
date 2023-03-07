<script lang="ts">
    import Comments from '$lib/posts/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { openPost } from '../../stores'
    import Likes from './Likes.svelte'

    let loading = true

    let prevPost: PostsResponse<any>

    let image: string = ''

    openPost.subscribe((post) => {
        if (prevPost != post) {
            image = ''
            loading = true
            prevPost = post
            image = pb.getFileUrl($openPost, $openPost.image)
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
                src={image}
                alt={$openPost.description}
                class="rounded-lg shadow-md w-96"
                on:load={() => (loading = false)}
            />
            <div class="">
                <Likes post={$openPost} />
            </div>
            <Comments post={$openPost} />
        {/if}
    </div>
</Modal>
