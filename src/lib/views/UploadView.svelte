<script lang="ts">
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { showToast } from '../../routes/app'

    export let uploading: boolean
    let loading: boolean

    interface NewPost {
        files: FileList | undefined
        title: string
    }

    let newPost: NewPost = {
        files: undefined,
        title: '',
    }

    function uploadPost() {
        if (newPost.files == undefined || newPost.title == '') {
            showToast(
                'Error',
                'You forgot to upload a file/description.',
                'warning'
            )
            return
        }
        loading = true
        pb.cancelAllRequests()

        const dataArray = new FormData()
        dataArray.append('image', newPost.files![0])
        dataArray.append('description', newPost.title)
        dataArray.append('user', $currentUser!.id)

        pb.collection('posts')
            .create(dataArray)
            .catch((err) => {
                loading = false
                switch (err.status) {
                    case 400:
                        showToast(
                            'Error',
                            'There was an error uploading. Check the file size.',
                            'error'
                        )
                    case 429:
                        showToast(
                            'Error',
                            'You are being rate limited. Are you spamming? Hope you enjoy your IP becoming public.',
                            'error'
                        )
                    case 403:
                        showToast(
                            'Error',
                            'There was an error uploading. Try logging out and back in.',
                            'error'
                        )
                    default:
                        showToast(
                            'Error',
                            'There was an error uploading.',
                            'error'
                        )
                }
            })
            .then(() => {
                newPost.files = undefined
                newPost.title = ''
                loading = false
                uploading = false

                showToast('Success', 'Successfully uploaded post.', 'success')
            })
    }
</script>

<Modal bind:expanded={uploading} fullHeight={false}>
    <form on:submit|preventDefault={uploadPost} class="upload-form">
        <h1>Upload</h1>
        <p>
            File size must be less than 5MB. Supported types: png, jpg, webp,
            gif
        </p>
        <label for="file-upload" class="custom-file-upload">
            {#if newPost.files}
                <span
                    style="max-width: 24ch; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                    >{newPost.files[0].name}</span
                >
            {:else}
                Pick an image
            {/if}
            <input
                id="file-upload"
                placeholder="Image"
                type="file"
                accept="image/*"
                bind:files={newPost.files}
            />
        </label>
        <input
            placeholder="Title (required)"
            type="text"
            maxlength="64"
            bind:value={newPost.title}
        />

        <button type="submit"
            >Upload
            {#if loading}
                <Loader size={16} />
            {/if}</button
        >
    </form>
</Modal>

<style>
    .upload-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1rem;
    }
</style>
