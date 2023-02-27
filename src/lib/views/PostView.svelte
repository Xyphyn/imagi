<script lang="ts">
    import Modal from '$lib/Modal.svelte'
    import type { Post } from '$lib/types/post'
    import Loader from '$lib/Loader.svelte'
    import LikeButton from '$lib/LikeButton.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { getFile, isVideo } from '../../routes/app'
    import CommentSection from '$lib/CommentSection.svelte'
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
    import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
    import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute'
    import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh'

    export let expanded: boolean
    export let post: Post
    let image: string
    let prevPost: Post
    let videoMuted: boolean = true

    let comments: number

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
        {#if loading && !isVideo(image)}
            <Loader />
        {/if}
        <div class="image-container">
            {#if isVideo(image)}
                {#key image}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video
                        on:load={() => (loading = false)}
                        controls
                        autoplay
                        loop
                        width="600px"
                        class="expanded-image"
                        bind:muted={videoMuted}
                    >
                        <source on:load={() => (loading = false)} src={image} />
                    </video>
                    <button
                        on:click={() => (videoMuted = !videoMuted)}
                        class="mute"
                        >{#if videoMuted}<Fa icon={faVolumeMute} />{:else}<Fa
                                icon={faVolumeHigh}
                            />{/if}</button
                    >
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
                <button on:click={() => deletePost(post)} class="delete"
                    ><Fa icon={faTrash} /></button
                >
            {/if}
            <div class="actions">
                <span>{post.description}</span>
                <span style="opacity: 0.3; margin-right: auto;"
                    >@{post.expand?.user.username}</span
                >
                <LikeButton {post} />
                <div class="comments">
                    <Fa icon={faComment} />
                    {comments ?? 0}
                </div>
            </div>
        </div>
        <CommentSection bind:commentCount={comments} {post} />
    {/if}
</Modal>

<style>
    .delete,
    .mute {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
        text-shadow: 0px 0px 14px #000000;
        color: var(--accent-color);
    }

    .delete:hover,
    .mute:hover {
        color: black;
    }

    .mute {
        left: 0;
    }

    .image-container {
        position: relative;
        max-width: 64rem;
        max-height: 100%;
        width: auto;
        height: 100%;
        border-radius: 8px;
        box-sizing: border-box;
    }

    .expanded-image {
        position: relative;
        display: inline-block;
        max-width: 100%;
        position: relative;
        border-radius: 8px;
        z-index: -1;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        gap: 1rem;
        max-width: 100%;
        width: 100%;
    }

    @media screen and (min-width: 640px) {
        .actions {
            position: absolute;
            bottom: 0;
            padding: 1rem;
        }

        .image-container {
            box-shadow: inset 0px -58px 29px -12px rgba(0, 0, 0, 0.5);
        }
    }
</style>
