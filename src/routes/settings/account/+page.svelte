<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import { Collections } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'

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
</script>

<title>Settings | Account</title>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Email</h1>
        <p class="text-sm opacity-70">Your account email for logging in.</p>
    </div>
    <div
        class="flex flex-col gap-2 justify-between items-center px-8 py-4 w-full md:flex-row dark:bg-zinc-800 bg-slate-50"
    >
        <TextInput
            class="w-full md:max-w-[18rem] h-10"
            bind:value={formData.email.value}
            placeholder="Email"
        />
        <Button
            color={Color.accent}
            class="justify-center w-full h-10 md:w-32"
            loading={formData.email.submitting}
            disabled={formData.email.submitting}
            onclick={async () => {
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
            }}
        >
            Save
        </Button>
    </div>
</div>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Bio</h1>
        <p class="text-sm opacity-70">
            A description displayed on your profile page.
        </p>
    </div>
    <div
        class="flex flex-col gap-2 justify-between items-center px-8 py-4 w-full md:flex-row dark:bg-zinc-800 bg-slate-50"
    >
        <TextInput
            class="w-full md:max-w-[18rem] h-10"
            bind:value={formData.bio.value}
            placeholder="Bio"
        />
        <Button
            color={Color.accent}
            class="justify-center w-full h-10 md:w-32"
            loading={formData.bio.submitting}
            disabled={formData.bio.submitting}
            onclick={async () => {
                if (!$user) return
                formData.bio.submitting = true
                await pb.collection(Collections.Users).update($user.id, {
                    bio: formData.bio.value,
                })
                formData.bio.submitting = false
            }}
        >
            Save
        </Button>
    </div>
</div>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Avatar</h1>
        <p class="text-sm opacity-70">
            The avatar displayed on your profile and comments.
        </p>
    </div>
    <div
        class="flex flex-col gap-2 justify-between items-center px-8 py-4 w-full dark:bg-zinc-800 bg-slate-50"
    >
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

                await pb.collection(Collections.Users).update($user.id, data)

                formData.avatar.submitting = false
            }}
        >
            Save
        </Button>
    </div>
</div>
<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8 text-red-600">
        <h1 class="text-xl font-bold">Delete Account</h1>
        <p class="text-sm opacity-70">
            This will permanently remove all content you have created. Type
            "delete my account" to confirm.
        </p>
    </div>
    <div
        class="flex flex-col gap-2 justify-between items-center px-8 py-4 w-full md:flex-row dark:bg-zinc-800 bg-slate-50"
    >
        <TextInput
            placeholder="delete my account"
            class="w-full md:max-w-[18rem]"
            bind:value={formData.delete.confirm}
        />
        <Button
            color={Color.danger}
            class="justify-center w-full md:max-w-[8rem] h-10 ml-auto"
            disabled={formData.delete.confirm != 'delete my account'}
            onclick={async () => {
                if (formData.delete.confirm != 'delete my account' || !$user)
                    return

                await pb.collection(Collections.Users).delete($user.id)

                addToast(
                    'Deletion',
                    'Your account has been deleted. Goodbye!',
                    ToastType.info
                )

                goto('/')
            }}
        >
            Delete
        </Button>
    </div>
</div>
