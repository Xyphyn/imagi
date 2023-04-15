<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommunitiesResponse,
        type CommunityCountsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'
    import Setting from '../../../../settings/Setting.svelte'

    export let data: {
        community: CommunitiesResponse<{
            'communityCounts(community)': CommunityCountsResponse[]
            owner: UsersResponse
        }>
    }

    let formData = {
        description: {
            submitting: false,
            value: data.community.description,
        },
        image: {
            files: null,
            submitting: false,
        },
    }

    async function changeDescription() {
        if (formData.description.value == '') return
        formData.description.submitting = true

        await pb
            .collection(Collections.Communities)
            .update(data.community.id, {
                description: formData.description.value,
            })
            .catch((e) => {
                addToast(
                    'Error',
                    'Failed to update community description.',
                    ToastType.error
                )
            })
            .then(() => {
                addToast(
                    'Success',
                    'Updated community description.',
                    ToastType.success
                )
            })

        formData.description.submitting = false
    }

    async function changeImage() {
        if (!formData.image.files) return

        formData.image.submitting = true

        const fData = new FormData()
        fData.append('image', formData.image.files[0])

        await pb
            .collection(Collections.Communities)
            .update(data.community.id, fData)
            .catch(() => {
                addToast(
                    'Error',
                    'Failed to update community image.',
                    ToastType.error
                )
            })
            .then(() => {
                addToast(
                    'Success',
                    'Updated community image.',
                    ToastType.success
                )
            })

        formData.image.submitting = false
    }
</script>

<Setting>
    <h1 slot="title">Description</h1>
    <p slot="description">The description of your community.</p>
    <TextInput
        placeholder="Description"
        class="w-full md:max-w-[18rem] mr-auto"
        bind:value={formData.description.value}
    />
    <Button
        onclick={changeDescription}
        class="w-full md:max-w-[8rem] justify-center h-10"
        loading={formData.description.submitting}
        disabled={formData.description.submitting}
        color={Color.accent}
    >
        Save
    </Button>
</Setting>
<Setting col>
    <h1 slot="title">Image</h1>
    <p slot="description">The image of your community.</p>
    <FileInput image bind:files={formData.image.files} />
    <Button
        onclick={changeImage}
        class="justify-center w-full h-10"
        loading={formData.image.submitting}
        disabled={formData.image.submitting}
        color={Color.accent}
    >
        Save
    </Button>
</Setting>
