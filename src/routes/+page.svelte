<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import Modal from '$lib/Modal.svelte'

    let expanded: boolean = false
    let expandedPost: any

    let posts: any[] = []
    let unsubscribe: () => void

    onMount(async () => {
        const resultList = await pb.collection('posts').getList(1, 50, {
            sort: '-created',
            expand: 'user',
        })

        posts = resultList.items

        unsubscribe = await pb
            .collection('posts')
            .subscribe('*', async ({ action, record }) => {
                if (action === 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)
                    record.expand = { user }
                    posts = [...posts, record]
                }
                if (action === 'delete') {
                    posts = posts.filter((post) => post.id !== record.id)
                }
            })

        onDestroy(() => {
            unsubscribe?.()
        })
    })

    function getFile(post: any, fullQuality: boolean) {
        console.log(post)

        const firstFilename = post.image
        if (fullQuality) {
            return pb.getFileUrl(post, firstFilename)
        } else {
            return pb.getFileUrl(post, firstFilename, { thumb: '256x256' })
        }
    }

    function expandView(post: any) {
        console.log(post)
        expandedPost = post

        expanded = true
    }

    function upload() {}
</script>

<h1>Images <button on:click={upload} /></h1>
<div class="posts">
    {#each posts as post (post.id)}
        <div
            class="post"
            on:click={() => expandView(post)}
            on:keypress={() => expandView(post)}
        >
            <!-- <img class="avatar" alt="avatar" width="40px" /> -->
            <img
                class="post-image"
                src={getFile(post, false)}
                alt={post.description}
            />
        </div>
    {/each}
</div>

<Modal bind:expanded>
    {#if expandedPost}
        <p>{expandedPost.description}</p>
        <img
            class="expanded-image"
            src={getFile(expandedPost, true)}
            alt="Expanded"
        />
    {/if}
</Modal>

<style>
    .posts {
        display: grid;
        width: 100%;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(256px, 2fr));
        grid-auto-flow: dense;
    }

    .post {
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.1);
        max-width: 512px;
        transition: transform 250ms;
    }

    .post:hover {
        cursor: pointer;
        transform: translateY(-12px);
    }

    .post-image {
        border-radius: 1rem;
    }

    .expanded-image {
        width: 80%;
    }
</style>
