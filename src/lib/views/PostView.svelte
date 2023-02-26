<script lang="ts">
    import Modal from '$lib/Modal.svelte'
    import type { Post } from '$lib/types/post'
    import Loader from '$lib/Loader.svelte'
    import LikeButton from '$lib/LikeButton.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { getFile, isVideo } from '../../routes/app'
    import CommentSection from '$lib/CommentSection.svelte'

    export let expanded: boolean
    export let post: Post
    let image: string
    let prevPost: Post

    let loading = false

    $: {
        if (expanded == true) {
            loading = true
        }

        if (post == undefined) {
            expanded = false
        }

        if (post != prevPost) {
            prevPost = post
            image = getFile(post, true)

            if (isVideo(image)) {
                loading = false
            }
        }
    }

    function deletePost(post: Post | undefined) {
        loading = true
        pb.collection('posts')
            .delete(post!.id)
            .catch(() => {
                loading = false
            })
            .then(() => {
                loading = false
                expanded = false
            })
    }
</script>

<Modal bind:expanded>
    {#if expanded}
        <p>
            {post.description}
            <span style="opacity: 0.3;">@{post.expand?.user.username}</span>
        </p>
        {#if loading && !isVideo(image)}
            <Loader />
        {/if}
        <LikeButton {post} />
        {#if isVideo(image)}
            {#key image}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video
                    on:load={() => (loading = false)}
                    controls
                    autoplay
                    loop
                    width="600px"
                >
                    <source on:load={() => (loading = false)} src={image} />
                </video>
            {/key}
        {:else}
            <img
                class="expanded-image"
                src={image}
                on:load={() => (loading = false)}
                on:loadstart={() => console.log('started loading')}
                alt="Expanded"
            />
        {/if}
        {#if post.expand?.user.id == $currentUser?.id}
            <button on:click={() => deletePost(post)}>Delete </button>
        {/if}
        <CommentSection {post} />
    {/if}
</Modal>

<style>
    .expanded-image {
        display: inline-block;
        max-width: 100%;
        position: relative;
        border-radius: 8px;
    }
</style>
