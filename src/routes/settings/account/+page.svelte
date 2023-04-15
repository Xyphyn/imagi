<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import { Collections } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'
    import Setting from '../Setting.svelte'

    export let formData = {
        email: {
            value: $user?.email,
            submitting: false,
        },
        bio: {
            value: $user?.bio,
            submitting: false,
        },
        avatar: {
            files: null,
            submitting: false,
        },
        delete: {
            confirm: '',
        },
    }

    async function changeEmail() {
        formData.email.submitting = true
        await pb
            .collection(Collections.Users)
            .requestEmailChange(formData.email.value)
            .then((data) => {
                addToast(
                    'Verify',
                    'A verification link was sent to your email.',
                    ToastType.info
                )
            })
            .catch((e) => {
                addToast(
                    'Error',
                    'Failed to change email. It may be already taken.',
                    ToastType.error
                )
            })
        formData.email.submitting = false
    }

    async function changeBio() {
        if (!$user) return
        formData.bio.submitting = true
        await pb
            .collection(Collections.Users)
            .update($user.id, {
                bio: formData.bio.value,
            })
            .then(() =>
                addToast('Success', 'Updated profile bio.', ToastType.success)
            )
            .catch(() => {
                addToast('Error', 'Failed to profile bio.', ToastType.error)
            })
        formData.bio.submitting = false
    }

    async function deleteAccount() {
        if (formData.delete.confirm != 'delete my account' || !$user) return

        await pb.collection(Collections.Users).delete($user.id)

        addToast(
            'Deletion',
            'Your account has been deleted. Goodbye!',
            ToastType.info
        )

        goto('/')
    }
</script>

<title>Settings | Account</title>
<Setting>
    <h1 slot="title">Email</h1>
    <p slot="description">Your account email for logging in.</p>
    <TextInput
        class="w-full md:max-w-[18rem] h-10 mr-auto"
        bind:value={formData.email.value}
        placeholder="Email"
    />
    <Button
        color={Color.accent}
        class="justify-center w-full h-10 md:w-32"
        loading={formData.email.submitting}
        disabled={formData.email.submitting}
        onclick={changeEmail}
    >
        Save
    </Button>
</Setting>
<Setting>
    <h1 slot="title">Bio</h1>
    <p slot="description">A description displayed on your profile page.</p>
    <TextInput
        class="w-full md:max-w-[18rem] h-10 mr-auto"
        bind:value={formData.bio.value}
        placeholder="Bio"
    />
    <Button
        color={Color.accent}
        class="justify-center w-full h-10 md:w-32"
        loading={formData.bio.submitting}
        disabled={formData.bio.submitting}
        onclick={changeBio}
    >
        Save
    </Button>
</Setting>
<Setting col>
    <h1 slot="title">Avatar</h1>
    <p slot="description">The avatar displayed on your profile and comments.</p>
    <FileInput image bind:files={formData.avatar.files} />
    <Button
        color={Color.accent}
        class="justify-center w-full h-10"
        loading={formData.avatar.submitting}
        disabled={formData.avatar.submitting}
        onclick={async () => {
            if (!formData.avatar.files || !$user) return
            formData.avatar.submitting = true
            const data = new FormData()
            data.append('avatar', formData.avatar.files[0])

            await pb
                .collection(Collections.Users)
                .update($user.id, data)
                .then(() => {
                    addToast(
                        'Success',
                        'Updated avatar. You may need to refresh to see changes.',
                        ToastType.success
                    )
                })
                .catch(() => {
                    addToast(
                        'Error',
                        'Failed to update avatar. Check the filetype and size.',
                        ToastType.error
                    )
                })

            formData.avatar.submitting = false
        }}
    >
        Save
    </Button>
</Setting>
<Setting>
    <h1 class="text-red-600" slot="title">Delete Account</h1>
    <p class="text-red-600" slot="description">
        This will permanently remove all content you have created. Type "delete
        my account" to confirm.
    </p>

    <TextInput
        placeholder="delete my account"
        class="w-full md:max-w-[18rem] mr-auto"
        bind:value={formData.delete.confirm}
    />
    <Button
        color={Color.danger}
        class="justify-center w-full md:max-w-[8rem] h-10 ml-auto"
        disabled={formData.delete.confirm != 'delete my account'}
        onclick={deleteAccount}
    >
        Delete
    </Button>
</Setting>
