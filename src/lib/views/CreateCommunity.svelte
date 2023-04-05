<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { Collections, type CommunitiesRecord } from '$lib/types/pb-types'
    import { toast } from '../../app'

    export let open = false

    interface FormData {
        name: string
        description: string
        files: FileList | null
    }

    let formData: FormData = {
        name: '',
        description: '',
        files: null,
    }

    function create() {
        if (!$currentUser) goto('/login')

        if (formData.name == '' || formData.description == '') return

        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)

        if (formData.files) {
            data.append('image', formData.files[0])
        }

        data.append('owner', $currentUser!.id)

        pb.collection(Collections.Communities)
            .create<CommunitiesRecord>(data)
            .then((data) => {
                toast('Success!', 'Your new community was created.', 'success')
                goto(`/community/${data.name}`)
            })
            .catch((err) => {
                toast(
                    'Error',
                    'Check if the name is lowercase and alphanumeric, and that you are verified.',
                    'error'
                )
            })
    }
</script>

<Modal bind:open>
    <div class="flex flex-col gap-4 items-center p-8">
        <h1 class="text-3xl font-bold text-center">
            <Colored>Create a Community</Colored>
        </h1>
        <p class="text-center">
            Communities are a place where you can post <b>
                <Colored>organized</Colored>
            </b>
            content.
        </p>
        <div>
            <label for="community-name" class="block my-1">Name</label>
            <input
                id="community-name"
                type="text"
                maxlength="24"
                placeholder="3-24 lowercase characters"
                bind:value={formData.name}
            />
        </div>
        <div>
            <label for="community-description" class="block my-1">
                Description
            </label>
            <input
                id="community-description"
                type="text"
                maxlength="64"
                placeholder="4-64 characters"
                bind:value={formData.description}
            />
        </div>

        <div>
            <label for="community-image" class="block my-1">Image</label>
            <FilePicker forId="community-image" bind:files={formData.files}>
                Pick an Image
            </FilePicker>
        </div>

        <Button onclick={create} major={true} class="my-1">
            Let there be {formData.name == '' ? 'posts' : formData.name}!
        </Button>
    </div>
</Modal>
