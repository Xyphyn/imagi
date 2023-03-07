<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'

    export let open = false

    interface FormData {
        files: FileList | null
        description: string
        community: string
        loading: boolean
    }

    let formData: FormData = {
        files: null,
        description: '',
        community: '',
        loading: false,
    }

    function upload() {
        if (!$currentUser) {
            goto('/login')
        }
        formData.loading = true

        if (formData.files == null || formData.description == '') {
            formData.loading = false
            return
        }

        const data = new FormData()

        data.append('image', formData.files![0])
        data.append('description', formData.description)
        data.append('user', $currentUser!.id)

        formData.description = ''

        pb.collection('posts')
            .create(data)
            .finally(() => {
                formData.loading = false
            })
    }
</script>

<Modal bind:open>
    <form
        on:submit|preventDefault={upload}
        class="flex flex-col items-center gap-4 max-w-[50vw] w-screen"
    >
        <h1 class="font-bold text-2xl">Create a Post</h1>
        <FilePicker bind:files={formData.files}>Pick a file</FilePicker>
        <div>
            <label for="upload-description" class="my-1 block"
                >Description</label
            >
            <input
                id="upload-description"
                type="text"
                maxlength="64"
                placeholder="A cool image"
                bind:value={formData.description}
            />
        </div>

        <div class="opacity-50">
            <label for="upload-community" class="my-1 block cursor-not-allowed"
                >Community</label
            >
            <input
                id="upload-community"
                type="text"
                maxlength="64"
                disabled={true}
                placeholder="cats"
                class=" cursor-not-allowed"
            />
        </div>
        <Button type="submit" major={true}
            >Post {#if formData.loading}<Loader size={16} />{/if}</Button
        >
    </form>
</Modal>
