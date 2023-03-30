<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb } from '$lib/pocketbase'
    import {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { Check, Icon } from 'svelte-hero-icons'
    import { toast } from '../../app'

    interface FormData {
        email: string
        username: string
        password: string
        images: FileList | null
        checks: FormChecks
        loading: boolean
    }

    interface FormChecks {
        rules: boolean
        notice: boolean
    }

    let formData: FormData = {
        email: '',
        username: '',
        password: '',
        images: null,
        checks: {
            rules: false,
            notice: false,
        },
        loading: false,
    }

    let forgotDialog = false
    let forgotEmail = ''

    async function signUp() {
        formData.loading = true
        const data = new FormData()
        data.append('email', formData.email)
        data.append('username', formData.username)
        data.append('password', formData.password)
        data.append('passwordConfirm', formData.password)
        if (
            formData.username == undefined ||
            formData.password == undefined ||
            formData.email == undefined
        ) {
            formData.loading = false
            return
        }
        if (formData.images) {
            data.append('avatar', formData.images[0])
        }

        const createdUser = await pb
            .collection('users')
            .create(data)
            .then(() => {
                toast(
                    'Success',
                    'Successfully signed up. Check your email for a verification link.',
                    'success'
                )
            })
            .catch((err) => {
                toast(
                    'Error',
                    'Could not sign up. Your username must be alphanumeric, and password 8-72 characters.',
                    'error'
                )
            })

        await login()
        pb.collection('users').requestVerification(formData.email)
        formData.loading = false
    }

    async function login() {
        formData.loading = true
        const user = await pb
            .collection('users')
            .authWithPassword(formData.username, formData.password)
            .then(() => {
                goto('/')
            })
            .catch((err) => {
                formData.loading = false

                toast('Error', 'Invalid credentials.', 'error')
            })
        formData.loading = false
    }

    function resetPassword() {
        if (forgotEmail == '') return

        pb.collection('users')
            .requestPasswordReset(forgotEmail)
            .then(() => {
                toast(
                    'Sent',
                    'A password reset email was sent to your inbox.',
                    'info'
                )
            })
            .catch(() => {
                toast('Error', 'That email address is likely invalid.', 'error')
            })
    }
</script>

<title>Imagi | Login</title>
<TabGroup
    class="flex overflow-hidden flex-col gap-4 justify-center items-center p-4 w-full"
>
    <TabList class="flex flex-row gap-4 w-full max-w-xl">
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            Log In
        </Tab>
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            Sign Up
        </Tab>
    </TabList>
    <TabPanels>
        <TabPanel class="px-4">
            <form
                on:submit|preventDefault={login}
                class="flex flex-col gap-2 items-center p-4 py-16 m-4 my-auto mx-auto w-screen max-w-xl bg-white rounded-lg shadow-xl dark:bg-slate-800 popin"
            >
                <Colored><h1 class="text-3xl font-bold">Log In</h1></Colored>
                <div>
                    <label for="login-username" class="block my-1">
                        Username/Email
                    </label>
                    <input
                        id="login-username"
                        type="text"
                        bind:value={formData.username}
                        maxlength="128"
                        placeholder="Example"
                    />
                </div>
                <div>
                    <label for="login-password" class="block my-1">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        bind:value={formData.password}
                        maxlength="128"
                        placeholder="8-72 characters"
                    />
                </div>
                <button
                    on:click={() => (forgotDialog = true)}
                    class="text-xs text-left block text-sky-300"
                    type="button"
                >
                    Forgot Password?
                </button>
                <Button
                    class="mt-4"
                    major={true}
                    type="submit"
                    disabled={formData.loading}
                >
                    {#if formData.loading}<Loader />{/if} Log In
                </Button>
            </form>
        </TabPanel>
        <TabPanel>
            <form
                on:submit|preventDefault={signUp}
                class="flex flex-col gap-2 items-center p-4 py-16 m-4 my-auto mx-auto w-screen max-w-xl bg-white rounded-lg shadow-xl dark:bg-slate-800 popin"
            >
                <Colored><h1 class="text-3xl font-bold">Sign Up</h1></Colored>
                <div>
                    <label for="signup-email" class="block my-1">Email</label>
                    <input
                        id="signup-email"
                        type="text"
                        bind:value={formData.email}
                        maxlength="128"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label for="signup-username" class="block my-1">
                        Username
                    </label>
                    <input
                        id="signup-username"
                        type="text"
                        bind:value={formData.username}
                        maxlength="128"
                        placeholder="Example"
                    />
                </div>
                <div>
                    <label for="signup-password" class="block my-1">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        bind:value={formData.password}
                        maxlength="128"
                        placeholder="8-72 characters"
                    />
                </div>
                <div>
                    <label for="signup-avatar" class="block my-1">Avatar</label>
                    <FilePicker
                        forId="signup-avatar"
                        bind:files={formData.images}
                    >
                        Pick an image
                    </FilePicker>
                </div>
                <Button class="mt-4" major={true} type="submit">
                    {#if formData.loading}<Loader />{/if}Sign Up
                </Button>
            </form>
        </TabPanel>
    </TabPanels>
</TabGroup>

<Modal bind:open={forgotDialog}>
    <div class="flex flex-col w-full justify-center items-center gap-4">
        <h1 class="text-2xl font-bold"><Colored>Forgot Password</Colored></h1>
        <div>
            <label for="forgot-email" class="block my-1">Email</label>
            <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                bind:value={forgotEmail}
            />
        </div>
        <p class="text-sm opacity-80">
            We'll send a password reset link to your email.
        </p>
        <Button onclick={resetPassword} major>Submit</Button>
    </div>
</Modal>
