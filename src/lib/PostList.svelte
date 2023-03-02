<script lang="ts">
    import { page } from '$app/stores'
    import Loader from '$lib/Loader.svelte'
    import type { Post } from '$lib/types/post'
    import { getFile, isVideo } from '../routes/app'
    import PostView from './views/PostView.svelte'

    export let posts: Post[] = []
    let expandedPost: Post
    let expandedView: boolean = false
    let loading: boolean = false

    function expandView(post: Post) {
        $page.url.searchParams.set('post', post.id)

        if (typeof window != 'undefined') {
            history.pushState(null, '', $page.url.href)
        }

        if (post != expandedPost) {
            expandedPost = post

            loading = true
        }
        expandedView = true
    }
</script>

<div class="posts">
    {#if posts == undefined || posts.length == 0}
        <div style="justify-self: center;">
            <Loader />
        </div>
    {/if}
    {#each posts as post (post.id)}
        <div class="post-container">
            <div
                class="post"
                on:click={() => expandView(post)}
                on:keypress={() => expandView(post)}
            >
                {#if isVideo(getFile(post, false))}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video class="post-image"
                        ><source src={getFile(post, false)} /></video
                    >
                {:else}
                    <img
                        class="post-image"
                        loading="lazy"
                        src={getFile(post, false)}
                        alt={post.description}
                    />
                {/if}
                <div class="post-description-container">
                    <span class="post-description">{post.description}</span>
                    <span class="post-author"
                        >@{post.expand?.user.username}</span
                    >
                </div>
            </div>
        </div>
    {/each}
</div>
<PostView bind:expanded={expandedView} post={expandedPost} />

<style lang="scss">
    .posts {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(324px, 2fr));
        grid-auto-flow: dense;
        transition: grid-template-columns 250ms;
    }

    @media screen and (min-width: 640px) {
        .posts {
            margin-left: 2rem;
            margin-right: 2rem;
        }
    }

    .post {
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        background-color: var(--card-color);
        max-width: 512px;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        position: relative;
        transition: transform 250ms;
    }

    .post-container {
        opacity: 0;

        animation: popin 0.5s cubic-bezier(0.17, 0.89, 0.33, 1.5) forwards;
        @for $i from 1 through 50 {
            &:nth-child(#{$i}) {
                animation-delay: #{($i - 1) * 0.1}s;
            }
        }
    }

    .post:hover {
        cursor: pointer;
        transform: translateY(-12px);
    }

    .post-image {
        display: inline-block;
        border-radius: var(--border-radius);
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    .post-description-container {
        display: inline-flex;
        border-radius: var(--border-radius);
        box-shadow: inset 0px 32px 26px 0px rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        justify-content: space-between;
    }

    .post-description {
        color: white;
        position: relative;
        max-width: 60%;
        left: 1rem;
        top: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .post-author {
        color: white;
        opacity: 0.5;
        position: relative;
        top: 1rem;
        right: 1rem;
    }
</style>
