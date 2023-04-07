<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import TextInput from '$lib/custom/TextInput.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb } from '$lib/pocketbase'
    import { addToast, ToastType } from '$lib/toasts/toasts'
    import Tooltip from '$lib/Tooltip.svelte'
    import {
        Switch,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { Check, Icon, InformationCircle } from 'svelte-hero-icons'

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
    }

    let formData: FormData = {
        email: '',
        username: '',
        password: '',
        images: null,
        checks: {
            rules: false,
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
            formData.username == '' ||
            formData.password == '' ||
            formData.email == ''
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
                addToast(
                    'Success',
                    'Successfully signed up. Check your email for a verification link.',
                    ToastType.success
                )

                login()
                pb.collection('users').requestVerification(formData.email)
                formData.loading = false
            })
            .catch((err) => {
                addToast(
                    'Error',
                    'Could not sign up. Your username must be alphanumeric, and password 8-72 characters.',
                    ToastType.error
                )
            })
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

                addToast('Error', 'Invalid credentials.', ToastType.error)
            })
        formData.loading = false
    }

    function resetPassword() {
        if (forgotEmail == '') return

        pb.collection('users')
            .requestPasswordReset(forgotEmail)
            .then(() => {
                addToast(
                    'Sent',
                    'A password reset email was sent to your inbox.',
                    ToastType.info
                )
            })
            .catch(() => {
                addToast(
                    'Error',
                    'That email address is likely invalid.',
                    ToastType.error
                )
            })
    }
</script>

<title>Imagi | Login</title>
<TabGroup class="flex flex-col gap-4 justify-center items-center pt-8">
    <TabList class="flex flex-row gap-4 w-full max-w-xl p-0">
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
    <TabPanels class="px-8 pb-8">
        <TabPanel class="px-4">
            <form
                on:submit|preventDefault={login}
                class="flex flex-col gap-4 items-center p-4 py-16 m-4 my-auto mx-auto w-screen max-w-xl bg-white rounded-lg shadow-xl dark:bg-slate-800 popin"
            >
                <h1 class="text-3xl font-bold">
                    <Colored>Log In</Colored>
                </h1>

                <TextInput
                    placeholder="you@example.com"
                    bind:value={formData.username}
                    type="text"
                    label="Email or username"
                />
                <TextInput
                    bind:value={formData.password}
                    type="password"
                    label="Password"
                />
                <Button
                    class="mt-4 max-w-[24rem] w-full items-center justify-center py-2.5"
                    major={true}
                    type="submit"
                    disabled={formData.loading}
                >
                    {#if formData.loading}<Loader />{/if} Log In
                </Button>
                <div class="border-b border-black/10 w-96" />

                <button
                    on:click={() => (forgotDialog = true)}
                    class="text-xs text-left block text-sky-300"
                    type="button"
                >
                    Forgot Password?
                </button>
            </form>
        </TabPanel>
        <TabPanel>
            <form
                on:submit|preventDefault={signUp}
                class="flex flex-col gap-4 items-center p-4 py-16 m-4 my-auto mx-auto w-screen max-w-xl bg-white rounded-lg shadow-xl dark:bg-slate-800 popin"
            >
                <Colored><h1 class="text-3xl font-bold">Sign Up</h1></Colored>
                <TextInput
                    type="email"
                    bind:value={formData.email}
                    placeholder="you@example.com"
                    label="Email"
                />
                <TextInput
                    type="text"
                    bind:value={formData.username}
                    placeholder="Example"
                    maxlength={128}
                    label="Username"
                />
                <TextInput
                    type="text"
                    bind:value={formData.password}
                    placeholder="8-72 characters"
                    maxlength={128}
                    label="Password"
                />
                <Button
                    class="mt-4 max-w-[24rem] w-full items-center justify-center py-2.5"
                    major={true}
                    disabled={!formData.checks.rules || formData.loading}
                    type="submit"
                >
                    {#if formData.loading}<Loader />{/if}Sign Up
                </Button>
                <div class="border-b border-black/10 w-96" />
                <p
                    class="text-xs text-slate-400 dark:text-slate-500 text-center"
                >
                    By creating an Imagi account, you agree to the <a
                        href="/guidelines"
                        class="text-primary underline"
                    >
                        community guidelines.
                    </a>
                </p>
            </form>
        </TabPanel>
    </TabPanels>
</TabGroup>

<Modal bind:open={forgotDialog}>
    <div class="flex flex-col w-full justify-center items-center gap-4 p-8">
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
