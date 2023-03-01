<script lang="ts">
    import Modal from '$lib/Modal.svelte'
    import type { Post } from '$lib/types/post'
    import Loader from '$lib/Loader.svelte'
    import LikeButton from '$lib/LikeButton.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { getFile, isVideo } from '../../routes/app'
    import CommentSection from '$lib/CommentSection.svelte'
    import Icon from '$lib/Icon.svelte'
    import { goto } from '$app/navigation'

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
                        >{#if videoMuted}<Icon
                                icon="volume-mute"
                                shadow={true}
                            />
                        {:else}<Icon icon="volume" shadow={true} />{/if}</button
                    >
                {/key}
            {:else}
                <img
                    class="expanded-image"
                    src={image}
                    on:load={() => (loading = false)}
                    alt="Expanded"
                />
            {/if}
            <div class="post-actions">
                {#if post.expand?.user.id == $currentUser?.id}
                    <button on:click={() => deletePost(post)} class="delete">
                        <Icon icon="trash" shadow={true} />
                    </button>
                {/if}

                <button on:click={() => goto(image)} class="download">
                    <Icon icon="download" shadow={true} />
                </button>
            </div>
            <div class="actions">
                <span>{post.description}</span>
                <a
                    class="username"
                    href={`/profile/${post.user}`}
                    data-sveltekit-preload-data>@{post.expand?.user.username}</a
                >
                <LikeButton {post} />
                <div class="comments">
                    <Icon icon="comment" />{comments ?? 0}
                </div>
            </div>
        </div>
        {#if post.expand?.community?.name}
            <a
                class="community"
                href={`/community/${post.expand?.community.name}`}
                >{post.expand?.community.name}</a
            >
        {/if}
        <CommentSection bind:commentCount={comments} {post} />
    {/if}
</Modal>

<style>
    .community {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
    }

    .comments {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        align-items: center;
    }

    .post-actions,
    .mute {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
        text-shadow: 0px 0px 14px #000000;
        color: var(--accent-color);
    }

    .post-actions:hover,
    .mute:hover {
        color: black;
    }

    .post-actions {
        display: flex;
        flex-direction: row-reverse;
        gap: 1rem;
    }

    .mute {
        left: 0;
    }

    .image-container {
        position: relative;
        max-width: 64rem;
        min-width: 40%;
        max-height: 100%;
        width: auto;
        height: 100%;
        border-radius: 8px;
        box-sizing: border-box;
    }

    .expanded-image {
        position: relative;
        display: inline-block;
        min-width: 40%;
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
        color: var(--text-color);
        fill: var(--text-color);
    }

    .username {
        opacity: 0.3;
        margin-right: auto;
        color: var(--text-color);
    }

    @media screen and (min-width: 640px) {
        .actions {
            position: absolute;
            bottom: 0;
            color: white;
            padding: 1rem;
            fill: white;
        }

        .post-actions {
            color: white;
            fill: white;
        }

        .image-container {
            box-shadow: inset 0px -58px 29px -12px rgba(0, 0, 0, 0.5);
        }

        .username {
            color: white;
        }
    }
</style>
