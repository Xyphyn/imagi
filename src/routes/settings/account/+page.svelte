<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import { Collections } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import FileInput from '$lib/ui/input/FileInput.svelte'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import { ToastType, addToast } from '$lib/ui/toasts/toasts'
    import { _ } from 'svelte-i18n'
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
                    $_('toasts.info'),
                    $_('toasts.settings.success.email'),
                    ToastType.info
                )
            })
            .catch((e) => {
                addToast(
                    $_('toasts.error'),
                    $_('toasts.settings.error.email'),
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
                addToast(
                    $_('toasts.success'),
                    $_('toasts.settings.success.bio'),
                    ToastType.success
                )
            )
            .catch(() => {
                addToast(
                    $_('toasts.error'),
                    $_('toasts.settings.error.bio'),
                    ToastType.error
                )
            })
        formData.bio.submitting = false
    }

    async function deleteAccount() {
        if (formData.delete.confirm != 'delete my account' || !$user) return

        await pb.collection(Collections.Users).delete($user.id)

        addToast(
            $_('toasts.info'),
            $_('toasts.settings.success.delete'),
            ToastType.info
        )

        goto('/')
    }
</script>

<title>Settings | Account</title>
<Setting>
    <h1 slot="title">{$_('settings.account.email.title')}</h1>
    <p slot="description">{$_('settings.account.email.description')}</p>
    <TextInput
        class="w-full md:max-w-[18rem] h-10 mr-auto"
        bind:value={formData.email.value}
        placeholder={$_('settings.account.email.title')}
    />
    <Button
        color={Color.accent}
        class="justify-center w-full h-10 md:w-32"
        loading={formData.email.submitting}
        disabled={formData.email.submitting}
        onclick={changeEmail}
    >
        {$_('settings.save')}
    </Button>
</Setting>
<Setting>
    <h1 slot="title">{$_('settings.account.bio.title')}</h1>
    <p slot="description">{$_('settings.account.bio.description')}</p>
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
        {$_('settings.save')}
    </Button>
</Setting>
<Setting col>
    <h1 slot="title">{$_('settings.account.avatar.title')}</h1>
    <p slot="description">{$_('settings.account.avatar.description')}</p>
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
                        $_('toasts.success'),
                        $_('toasts.settings.success.avatar'),
                        ToastType.success
                    )
                })
                .catch(() => {
                    addToast(
                        $_('toasts.error'),
                        $_('toasts.settings.error.avatar'),
                        ToastType.error
                    )
                })

            formData.avatar.submitting = false
        }}
    >
        {$_('settings.save')}
    </Button>
</Setting>
<Setting>
    <h1 class="text-red-600" slot="title">
        {$_('settings.account.delete.title')}
    </h1>
    <p class="text-red-600" slot="description">
        {$_('settings.account.delete.description')}
    </p>

    <TextInput
        placeholder={$_('settings.account.delete.confirm')}
        class="w-full md:max-w-[18rem] mr-auto"
        bind:value={formData.delete.confirm}
    />
    <Button
        color={Color.danger}
        class="justify-center w-full md:max-w-[8rem] h-10 ml-auto"
        disabled={formData.delete.confirm !=
            $_('settings.account.delete.confirm')}
        onclick={deleteAccount}
    >
        {$_('settings.delete')}
    </Button>
</Setting>
