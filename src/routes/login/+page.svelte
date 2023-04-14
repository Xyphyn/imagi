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
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    }

    async function signUp() {
        submitting = true

        await pb.collection(Collections.Users).create({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
        })

        await logIn()
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

    let signingUp = false
</script>

<title>Login</title>
<div class="flex flex-row gap-2 items-center m-4 mx-auto w-max">
    <img
        src="/img/logo.svg"
        alt="Xylo logo"
        class="dark:hidden"
        width="48"
        height="48"
    />
    <img
        src="/img/logo-dark.svg"
        alt="Xylo logo"
        class="hidden dark:block"
        width="48"
        height="48"
    />
    <span class="text-3xl font-bold">Imagi</span>
</div>
{#if !signingUp}
    <form
        class="bg-white animate-popIn dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col max-w-[36rem] mx-auto p-8 gap-6"
        on:submit|preventDefault={logIn}
    >
        <div>
            <h1 class="text-3xl font-bold">Log in</h1>

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
            submit
        >
            Log in
        </Button>
        <div class="w-full border-t border-black/10 dark:border-white/10" />
        <p class="mx-auto text-sm text-gray-500">
            Don't have an account? <button
                on:click={() => (signingUp = true)}
                class="text-black underline dark:text-white"
            >
                Sign Up
            </button>
        </p>
    </form>
{:else}
    <form
        class="bg-white animate-popIn dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col max-w-[36rem] mx-auto p-8 gap-6"
        on:submit|preventDefault={signUp}
    >
        <div>
            <h1 class="text-3xl font-bold">Sign up</h1>
        </div>

        <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            bind:value={formData.email}
        />

        <TextInput
            label="Username"
            placeholder="Example"
            type="text"
            bind:value={formData.username}
        />

        <TextInput
            label="Password"
            type="password"
            maxlength={64}
            bind:value={formData.password}
        />

        <TextInput
            label="Confirm Password"
            type="password"
            maxlength={64}
            err={formData.password != formData.passwordConfirm}
            bind:value={formData.passwordConfirm}
        />

        <Button
            class="justify-center h-10"
            color={Color.accent}
            loading={submitting}
            disabled={submitting ||
                formData.password != formData.passwordConfirm}
            submit
        >
            Sign up
        </Button>
        <div class="w-full border-t border-black/10 dark:border-white/10" />
        <p class="mx-auto text-sm text-gray-500">
            Already have an account? <button
                on:click={() => (signingUp = false)}
                class="text-black underline dark:text-white"
            >
                Log In
            </button>
        </p>
    </form>
{/if}
