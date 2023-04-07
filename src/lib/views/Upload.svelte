<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { Icon, PencilSquare } from 'svelte-hero-icons'
    import { isVideo } from '$lib/util'
    import { ToastType, addToast } from '$lib/toasts/toasts'
    import type { CommunitiesResponse } from '$lib/types/pb-types'
    import TextInput from '$lib/custom/TextInput.svelte'

    export let open = false
    let uploadId: string | undefined

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

    async function upload() {
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
        if (formData.community != '') {
            let err: any

            const community = await pb
                .collection('communities')
                .getFirstListItem<CommunitiesResponse<any>>(
                    `name = "${formData.community.toLowerCase()}"`
                )
                .catch((error) => {
                    addToast(
                        'Error',
                        "The given community doesn't exist.",
                        ToastType.error
                    )
                    formData.loading = false
                    err = error
                })

            if (err) return

            if (community) data.append('community', community.id)
        }

        formData.description = ''
        formData.community = ''

        formData.files = null

        await pb
            .collection('posts')
            .create(data)
            .catch((err) => {
                switch (err.status) {
                    case 400:
                        if (pb.authStore.isValid) {
                            addToast(
                                'Error',
                                'Could not create post. Check that the filesize is under 8MB, and if given, the community exists. Check if you are verified.',
                                ToastType.error
                            )
                        } else {
                            addToast(
                                'Error',
                                'Your session has expired, log back in again.',
                                ToastType.error
                            )
                        }
                        break
                    case 429:
                        addToast(
                            'Warning',
                            'You are being rate limited.',
                            ToastType.warning
                        )
                        break
                    default:
                        addToast(
                            'Error',
                            'Could not create post.',
                            ToastType.error
                        )
                        break
                }
            })
            .then(() => {
                open = false
                addToast(
                    'Success',
                    'Your post was uploaded successfully',
                    ToastType.success
                )
            })

        formData.loading = false
    }

    let previewURL: string | null = null

    $: {
        if (formData.files && formData.files[0]) {
            previewURL = URL.createObjectURL(formData.files[0])
        }
    }
</script>

<Modal bind:open>
    <form
        on:submit|preventDefault={upload}
        class="flex flex-col gap-4 items-center px-12"
    >
        <Colored><h1 class="text-3xl font-bold">Create a Post</h1></Colored>
        <FilePicker bind:files={formData.files} accept="image/*,video/*">
            Pick a file
        </FilePicker>
        {#if formData.files && previewURL}
            {#if !isVideo(previewURL)}
                <img
                    src={previewURL}
                    alt={formData.description}
                    class="max-w-xs rounded-lg popin shadow-lg"
                    on:load={() => {
                        if (previewURL) {
                            URL.revokeObjectURL(previewURL)
                        }
                    }}
                />
            {/if}
        {/if}
        <TextInput
            label="Title"
            type="text"
            maxlength={64}
            placeholder="A cool image"
            bind:value={formData.description}
        />

        <TextInput
            label="Community (optional)"
            type="text"
            maxlength={24}
            placeholder="cats"
            bind:value={formData.community}
        />
        <Button type="submit" major={true} disabled={formData.loading}>
            {#if formData.loading}<div class="px-[2px]">
                    <Loader width={16} />
                </div>{:else}<Icon src={PencilSquare} size="20" />{/if} Post
        </Button>
    </form>
</Modal>
