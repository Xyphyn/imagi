<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import Modal from '$lib/Modal.svelte'
    import { goto } from '$app/navigation'

    let expanded: boolean = false
    let expandedPost: any

    let uploading: boolean = false

    let posts: any[] = []
    let unsubscribe: () => void

    let newPost = {
        files: undefined,
        description: '',
    }

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

    function getFile(post: any, fullQuality: boolean) {
        const firstFilename = post.image
        if (fullQuality) {
            return pb.getFileUrl(post, firstFilename)
        } else {
            return pb.getFileUrl(post, firstFilename, { thumb: '256x256' })
        }
    }

    function expandView(post: any) {
        expandedPost = post

        expanded = true
    }

    function uploadDialog() {
        if (!$currentUser?.id) {
            goto('/login')
        }
        uploading = true
    }

    function uploadPost() {
        if (newPost.files == undefined || newPost.description == '') {
            return
        }

        const dataArray = new FormData()
        dataArray.append('image', newPost.files![0])
        dataArray.append('description', newPost.description)
        dataArray.append('user', $currentUser!.id)

        pb.collection('posts').create(dataArray)

        newPost.files = undefined
        newPost.description = ''
    }
</script>

<h1>
    The Meme Dump <button on:click={uploadDialog}>Upload</button>
    {#if !$currentUser?.id}<button on:click={() => goto('/login')}>Login</button
        >{/if}
</h1>
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
        <p>
            {expandedPost.description}
            <span class="username">@{expandedPost.expand?.user.username}</span>
        </p>
        <img
            class="expanded-image"
            src={getFile(expandedPost, true)}
            alt="Expanded"
        />
    {/if}
</Modal>

<Modal bind:expanded={uploading}>
    <h1>Upload</h1>
    <p>File size must be less than 5MB. Supported types: png, jpg, webp, gif</p>
    <form on:submit|preventDefault={uploadPost} class="upload-form">
        <label for="file-upload" class="custom-file-upload">
            Pick an image
            <input
                id="file-upload"
                placeholder="Image"
                type="file"
                bind:files={newPost.files}
            />
        </label>
        <input
            placeholder="Description [required]"
            type="text"
            maxlength="64"
            bind:value={newPost.description}
        />

        <button type="submit">Upload</button>
    </form>
</Modal>

<style>
    .posts {
        display: grid;
        width: 100%;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(256px, 2fr));
        grid-auto-flow: dense;
        transition: grid-template-columns 250ms;
    }

    .post {
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.1);
        max-width: 512px;
        transition: transform 250ms;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .post:hover {
        cursor: pointer;
        transform: translateY(-12px);
    }

    .post-image {
        border-radius: 1rem;
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    .expanded-image {
        display: inline-block;
        max-width: 80%;
        max-height: 80%;
        position: relative;
        border-radius: 8px;
    }

    .upload-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .username {
        opacity: 0.3;
    }
</style>
