<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { Icon, PencilSquare } from 'svelte-hero-icons'
    import { toast } from '../../app'

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
            const community = await pb
                .collection('communities')
                .getList(1, 1, { filter: `name = "${formData.community}"` })

            if (community.items.length == 0) {
                toast('Error', "The given community doesn't exist.", 'error')
                formData.loading = false
                return
            }

            data.append('community', community.items[0].id)
        }

        formData.description = ''
        formData.community = ''

        formData.files = null

        pb.collection('posts')
            .create(data)
            .catch((err) => {
                switch (err.status) {
                    case 400:
                        if (pb.authStore.isValid) {
                            toast(
                                'Error',
                                'Could not create post. Check that the filesize is under 8MB, and if given, the community exists. Check if you are verified.',
                                'error'
                            )
                        } else {
                            toast(
                                'Error',
                                'Your session has expired, log back in again.',
                                'error'
                            )
                        }
                        break
                    case 429:
                        toast('Error', 'You are being rate limited.', 'error')
                        break
                    default:
                        toast('Error', 'Could not create post.', 'error')
                        break
                }
            })
            .finally(() => {
                formData.loading = false
            })
    }
</script>

<Modal bind:open>
    <form
        on:submit|preventDefault={upload}
        class="flex flex-col gap-4 items-center p-4"
    >
        <Colored><h1 class="text-2xl font-bold">Create a Post</h1></Colored>
        <FilePicker bind:files={formData.files} accept="image/*,video/*">
            Pick a file
        </FilePicker>
        <div>
            <label for="upload-description" class="block my-1">
                Description
            </label>
            <input
                id="upload-description"
                type="text"
                maxlength="64"
                placeholder="A cool image"
                bind:value={formData.description}
            />
        </div>

        <div>
            <label for="upload-community" class="block my-1">
                Community (Optional)
            </label>
            <input
                id="upload-community"
                type="text"
                maxlength="64"
                placeholder="cats"
                bind:value={formData.community}
            />
        </div>
        <Button type="submit" major={true} disabled={formData.loading}>
            {#if formData.loading}<div class="px-[2px]">
                    <Loader width={16} />
                </div>{:else}<Icon src={PencilSquare} size="20" />{/if} Post
        </Button>
    </form>
</Modal>
