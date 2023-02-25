<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import Modal from '$lib/Modal.svelte'
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import nprogress from 'nprogress'
    import CommentSection from '$lib/CommentSection.svelte'
    import type { Post } from '$lib/types/post'

    let page = 0

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

    let newPost = {
        files: undefined,
        description: '',
    }

    async function getPage(increment: boolean) {
        if (increment) {
            page++
        } else {
            if (page > 1) {
                page--
            } else {
                return
            }
        }

        nprogress.start()

        const resultList = await pb
            .collection('posts')
            .getList<Post>(page, 50, {
                sort: '-created',
                expand: 'user',
            })

        if (Math.ceil(resultList.totalItems / 50) < page) {
            page = Math.ceil(resultList.totalItems / 50)
        }

        if (page <= 0) {
            page = 1
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

    function getFile(post: any, fullQuality: boolean) {
        const firstFilename = post.image
        if (fullQuality) {
            return pb.getFileUrl(post, firstFilename)
        } else {
            return pb.getFileUrl(post, firstFilename, { thumb: '256x256' })
        }
    }

    function expandView(post: Post) {
        modalData.expandedImage = ''
        modalData.err = undefined

        modalData.expandedPost = post
        modalData.expandedView = true

        modalData.expandedImage = getFile(post, true)
    }

    function uploadDialog() {
        modalData.err = undefined

        if (!$currentUser?.id) {
            goto('/login')
        }
        modalData.uploading = true
    }

    function uploadPost() {
        if (newPost.files == undefined || newPost.description == '') {
            return
        }
        pb.cancelAllRequests()

        const dataArray = new FormData()
        dataArray.append('image', newPost.files![0])
        dataArray.append('description', newPost.description)
        dataArray.append('user', $currentUser!.id)

        pb.collection('posts')
            .create(dataArray)
            .catch((err) => {
                modalData.err = err
                modalData.loading = false
            })
            .then(() => {
                newPost.files = undefined
                newPost.description = ''
                modalData.loading = false
            })
    }

    function deletePost(post: Post | undefined) {
        modalData.loading = true
        pb.collection('posts')
            .delete(post!.id)
            .catch(() => {
                modalData.loading = false
            })
            .then(() => {
                modalData.loading = false
                modalData.expandedView = false
            })
    }
</script>

<div class="container">
    <h1
        style="display: flex; flex-direction: row; gap: 1rem; align-items:center;"
    >
        <img
            src="/imagi.svg"
            alt="imagi"
            class="logo"
            title="Yes, I stole the Jetbrains logo. If this ever gets popular I'll make my own."
        />
        Imagi
        <button on:click={uploadDialog}>Upload</button>
        {#if !$currentUser?.id}<button on:click={() => goto('/login')}
                >Login</button
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
    <div class="navigation">
        <button
            on:click={() => {
                getPage(false)
            }}>Back</button
        >
        {page}
        <button
            on:click={() => {
                getPage(true)
            }}>Next</button
        >
    </div>
</div>
<Modal bind:expanded={modalData.expandedView}>
    {#if modalData.expandedPost}
        <p>
            {modalData.expandedPost.description}
            <span class="username"
                >@{modalData.expandedPost.expand?.user.username}</span
            >
        </p>
        {#if modalData.loading}
            <Loader />
        {/if}
        <img
            class="expanded-image"
            src={modalData.expandedImage}
            on:load={() => (modalData.loading = false)}
            on:loadstart={() => (modalData.loading = true)}
            alt="Expanded"
        />
        {#if modalData.expandedPost.expand?.user.id == $currentUser?.id}
            <button on:click={() => deletePost(modalData.expandedPost)}
                >Delete
            </button>
        {/if}
        <CommentSection post={modalData.expandedPost} />
    {/if}
</Modal>

<Modal bind:expanded={modalData.uploading}>
    <h1>Upload</h1>
    <p>File size must be less than 5MB. Supported types: png, jpg, webp, gif</p>
    {#if modalData.err}
        <p class="error">Failed to upload. Check the filesize.</p>
    {/if}
    <form on:submit|preventDefault={uploadPost} class="upload-form">
        <label for="file-upload" class="custom-file-upload">
            Pick an image
            <input
                id="file-upload"
                placeholder="Image"
                type="file"
                accept="image/*"
                bind:files={newPost.files}
            />
        </label>
        <input
            placeholder="Description [required]"
            type="text"
            maxlength="64"
            bind:value={newPost.description}
        />

        <button type="submit"
            >Upload
            {#if modalData.loading}
                <Loader />
            {/if}</button
        >
    </form>
</Modal>

<style>
    .posts {
        display: grid;
        width: 100%;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(256px, 2fr));
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
        animation: popin 500ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
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
        max-width: 100%;
        position: relative;
        border-radius: 8px;
    }

    .upload-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1rem;
    }

    .username {
        opacity: 0.3;
    }

    .error {
        color: #ff2f2f;
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

    .logo {
        width: 64px;
    }
</style>
