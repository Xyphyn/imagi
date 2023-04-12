<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/backend/pocketbase'
    import { Collections } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import TextInput from '$lib/ui/input/TextInput.svelte'

    let submitting = false
    let err: any

    let formData = {
        username: '',
        password: '',
    }

    async function logIn() {
        submitting = true

        await pb
            .collection(Collections.Users)
            .authWithPassword(formData.username, formData.password)
            .catch((error) => (err = error))

        submitting = false
        goto('/')
    }
</script>

<form
    class="bg-white dark:bg-slate-800 rounded-lg shadow-lg flex flex-col max-w-[36rem] mx-auto p-8 gap-6"
    on:submit|preventDefault={logIn}
>
    <div>
        <h1 class="text-3xl font-bold">Log In</h1>

        <p class="mt-2 opacity-50">Enter your account details.</p>
    </div>

    <TextInput
        label="Email or username"
        placeholder="Example"
        type="text"
        maxlength={64}
        bind:value={formData.username}
    />

    <TextInput
        label="Password"
        type="password"
        maxlength={64}
        bind:value={formData.password}
    />

    <Button
        class="justify-center h-10"
        color={Color.accent}
        loading={submitting}
        disabled={submitting}
    >
        Log In
    </Button>
</form>
