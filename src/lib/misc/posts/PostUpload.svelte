<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import { Collections, type CommunitiesResponse } from '$lib/backend/schema'
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import {
        ArrowUpOnSquare,
        Icon,
        PencilSquare,
        XMark,
    } from 'svelte-hero-icons'

    export let open = false

    let submitting = false

    let formData: {
        files: FileList | null
        title: string
        description: string
        community: string
    } = {
        files: null,
        title: '',
        description: '',
        community: '',
    }

    let err: any

    async function post() {
        if (!$user) goto('/login')
        if (formData.files == null || formData.title == '') return

        submitting = true

        const data = new FormData()
        data.append('description', formData.title)
        data.append('image', formData.files[0])
        data.append('user', $user!.id)

        if (formData.description) data.append('alt_text', formData.description)

        if (formData.community) {
            try {
                const community = await pb
                    .collection(Collections.Communities)
                    .getFirstListItem<CommunitiesResponse>(
                        `name = "${formData.community}"`
                    )

                data.append('community', community.id)
            } catch (error) {
                err = 'community'
                submitting = false
                return
            }
        }

        await pb
            .collection(Collections.Posts)
            .create(data)
            .then(() => {
                open = false
                formData.files = null
                formData.community = ''
                formData.title = ''
                formData.description = ''
            })
            .catch(() => (err = 'upload'))

        submitting = false
    }
</script>

<AdvancedModal bind:open>
    <h1 class="font-bold" slot="title">Upload a Post</h1>
    <form
        class="flex flex-col gap-6 p-4 w-full"
        on:submit|preventDefault={post}
    >
        <FileInput image bind:files={formData.files} />
        <TextInput
            label="Title"
            placeholder="A cool photo"
            bind:value={formData.title}
        />
        <TextInput
            label="Description (optional)"
            placeholder="I took this photo during a nuclear explosion"
            bind:value={formData.description}
        />
        <TextInput
            err={err == 'community'}
            label="Community (optional)"
            placeholder="memes"
            bind:value={formData.community}
        />
        <Button
            color={err == 'upload' ? Color.danger : Color.accent}
            class="justify-center h-10"
            loading={submitting}
            disabled={submitting}
            submit
        >
            <Icon src={err == 'upload' ? XMark : ArrowUpOnSquare} size="18" />
            Upload
        </Button>
    </form>
</AdvancedModal>