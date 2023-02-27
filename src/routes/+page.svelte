<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import nprogress from 'nprogress'
    import type { Post } from '$lib/types/post'
    import { page } from '$app/stores'
    import { getFile, isVideo } from './app'
    import PostView from '$lib/views/PostView.svelte'
    import Loader from '$lib/Loader.svelte'

    let pageNumber = 0

    interface ModalData {
        uploading: boolean
        expandedView: boolean
        expandedPost: Post | undefined
        expandedImage: string
        err: any
        loading: boolean
    }

    let modalData: ModalData = {
        uploading: false,
        expandedView: false,
        expandedPost: undefined,
        expandedImage: '',
        err: undefined,
        loading: false,
    }

    let posts: Post[] = []
    let unsubscribe: () => void

    async function getPage(increment: boolean) {
        if (increment) {
            pageNumber++
        } else {
            if (pageNumber > 1) {
                pageNumber--
            } else {
                return
            }
        }

        nprogress.start()

        const resultList = await pb
            .collection('posts')
            .getList<Post>(pageNumber, 50, {
                sort: '-created',
                expand: 'user',
            })

        if (Math.ceil(resultList.totalItems / 50) < pageNumber) {
            pageNumber = Math.ceil(resultList.totalItems / 50)
        }

        if (pageNumber <= 0) {
            pageNumber = 1
        }

        posts = resultList.items

        nprogress.done()
    }

    onMount(async () => {
        getPage(true)

        unsubscribe = await pb
            .collection('posts')
            .subscribe<Post>('*', async ({ action, record }) => {
                if (action === 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)

                    record.expand = { user }
                    posts = [record, ...posts]
                }
                if (action === 'delete') {
                    posts = posts.filter((post) => post.id !== record.id)
                }
            })

        onDestroy(() => {
            unsubscribe?.()
        })
    })

    if ($page.url.searchParams.has('post')) {
        const postParam = $page.url.searchParams.get('post')?.toString()!

        pb.collection('posts')
            .getOne<Post>(postParam, { expand: 'user' })
            .then((p) => expandView(p))
            .catch((err) => {})
    }

    function expandView(post: Post) {
        modalData.err = undefined

        $page.url.searchParams.set('post', post.id)

        if (typeof window != 'undefined') {
            history.pushState(null, '', $page.url.href)
        }

        if (post != modalData.expandedPost) {
            modalData.expandedPost = post

            modalData.expandedImage = getFile(post, true)

            modalData.loading = true
        }
        modalData.expandedView = true
        modalData.uploading = false
    }
</script>

<div class="container">
    <div class="posts">
        {#if posts.length == 0}
            <div style="justify-self: center;">
                <Loader />
            </div>
        {/if}
        {#each posts as post (post.id)}
            <div
                class="post"
                on:click={() => expandView(post)}
                on:keypress={() => expandView(post)}
            >
                {#if isVideo(getFile(post, false))}
                    <img class="post-image" src="/svg/play.svg" alt="Video" />
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
        {/each}
    </div>
    <div class="navigation">
        <button on:click={() => getPage(false)}>Back</button>
        {pageNumber}
        <button on:click={() => getPage(true)}>Next</button>
    </div>
</div>
<PostView expanded={modalData.expandedView} post={modalData.expandedPost} />

<style>
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
        transition: transform 250ms;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        position: relative;
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

    .navigation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .container {
        margin: 2rem;
    }
</style>
