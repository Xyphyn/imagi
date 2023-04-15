<script lang="ts">
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { Icon, Plus, XMark } from 'svelte-hero-icons'
    import { pb, user } from '$lib/backend/pocketbase'
    import { goto } from '$app/navigation'
    import { Collections } from '$lib/backend/schema'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'

    export let open = false
    let err: any

    let submitting = false

    let formData = {
        files: null,
        name: '',
        description: '',
    }

    async function create() {
        if (!$user) {
            goto('/login')
            return
        }

        if (formData.name == '' || formData.description == '') return

        submitting = true

        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('owner', $user.id)
        if (formData.files) data.append('image', formData.files[0])

        await pb
            .collection(Collections.Communities)
            .create(data)
            .catch((err) => {
                addToast(
                    'Error',
                    'Could not create community. Check the image file type and size, and make sure the name is alphanumeric.',
                    ToastType.error
                )
            })
            .then(() => {
                addToast(
                    'Success',
                    'Your new community was created.',
                    ToastType.success
                )

                goto(`/community/${formData.name}`)
                open = false

                formData.name = ''
                formData.description = ''
                formData.files = null
            })

        submitting = false
    }
</script>

<AdvancedModal bind:open>
    <h1 class="ml-4 font-bold" slot="title">Create a Community</h1>
    <p class="ml-4 opacity-75">Name must be alphanumeric, lowercase</p>
    <form
        class="flex flex-col gap-6 p-4 w-full"
        on:submit|preventDefault={create}
    >
        <div>
            <span class="block my-1 text-sm font-bold">Image</span>
            <FileInput image bind:files={formData.files} />
        </div>
        <TextInput
            label="Name"
            placeholder="cool_pictures"
            bind:value={formData.name}
            err={formData.name.toLowerCase() != formData.name}
            maxlength={24}
        />
        <TextInput
            label="Description"
            placeholder="Post your cool pictures here"
            bind:value={formData.description}
            maxlength={64}
        />
        <Button
            color={Color.accent}
            class="justify-center h-10"
            loading={submitting}
            disabled={submitting ||
                formData.name.toLowerCase() != formData.name}
            submit
        >
            <Icon src={err == 'upload' ? XMark : Plus} size="18" />
            Create
        </Button>
    </form>
</AdvancedModal>
