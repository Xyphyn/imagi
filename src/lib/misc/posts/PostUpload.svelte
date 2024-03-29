<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import { Collections, type CommunitiesResponse } from '$lib/backend/schema'
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import SearchInput from '$lib/ui/input/SearchInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'
    import {
        ArrowUpOnSquare,
        Icon,
        PencilSquare,
        XMark,
    } from 'svelte-hero-icons'
    import { _ } from 'svelte-i18n'

    export let open = false

    let submitting = false

    let formData: {
        files: FileList | null
        title: string
        description: string
        community: CommunitiesResponse | null
    } = {
        files: null,
        title: '',
        description: '',
        community: null,
    }

    let err: any

    async function post() {
        err = null
        if (!$user) goto('/login')
        if (formData.files == null || formData.title == '') return

        submitting = true

        const data = new FormData()
        data.append('description', formData.title)
        data.append('image', formData.files[0])
        data.append('user', $user!.id)

        if (formData.description) data.append('alt_text', formData.description)

        if (formData.community) {
            data.append('community', formData.community.id)
        }

        await pb
            .collection(Collections.Posts)
            .create(data)
            .then(() => {
                open = false
                formData.files = null
                formData.title = ''
                formData.description = ''
                formData.community = null

                addToast(
                    $_('toasts.success'),
                    $_('toasts.posts.success.upload'),
                    ToastType.success
                )
            })
            .catch((error) => {
                err = 'upload'
                switch (error.status) {
                    case '400': {
                        if (pb.authStore.isValid) {
                            addToast(
                                $_('toasts.error'),
                                $_('toasts.posts.error.validSession'),
                                ToastType.error
                            )
                        } else {
                            addToast(
                                $_('toasts.error'),
                                $_('toasts.posts.error.invalidSession'),
                                ToastType.error
                            )
                        }
                        break
                    }
                    case '429': {
                        addToast(
                            $_('toasts.warning'),
                            $_('toasts.posts.error.rateLimit'),
                            ToastType.warning
                        )
                    }
                    default: {
                        addToast(
                            $_('toasts.error'),
                            $_('toasts.posts.error.unknown'),
                            ToastType.error
                        )
                        break
                    }
                }
            })

        submitting = false
    }

    const communitySearch = async (input: string) => {
        return pb
            .collection(Collections.Communities)
            .getList<CommunitiesResponse>(1, 10, {
                filter: `name ~ "${input}"`,
            })
            .then((results) => results.items)
    }
</script>

<AdvancedModal bind:open>
    <h1 class="ml-4 font-bold" slot="title">{$_('modal.post.title')}</h1>
    <form
        class="flex flex-col gap-6 p-4 w-full"
        on:submit|preventDefault={post}
    >
        <FileInput image bind:files={formData.files} />
        <TextInput
            label={$_('label.post.title')}
            placeholder={$_('placeholder.post.title')}
            bind:value={formData.title}
        />
        <TextInput
            label={`${$_('label.post.description')} (${$_('label.optional')})`}
            placeholder={$_('placeholder.post.description')}
            bind:value={formData.description}
        />
        <div class="relative">
            <SearchInput
                search={communitySearch}
                extract={(community) => community.name}
                label={`${$_('label.post.community')} (${$_(
                    'label.optional'
                )})`}
                bind:selected={formData.community}
            />
        </div>
        <Button
            color={err == 'upload' ? Color.danger : Color.accent}
            class="justify-center h-10"
            loading={submitting}
            disabled={submitting}
            submit
        >
            <Icon src={err == 'upload' ? XMark : ArrowUpOnSquare} size="18" />
            {$_('button.post.upload')}
        </Button>
    </form>
</AdvancedModal>
