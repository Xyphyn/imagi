<script lang="ts">
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { flip } from 'svelte/animate'

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

    function signUp() {
        formData.loading = true
    }

    function login() {}
</script>

<TabGroup class="flex flex-col w-full justify-center items-center gap-4">
    <TabList class="max-w-xl w-full flex flex-row gap-4">
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}>Log In</Tab
        >
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}>Sign Up</Tab
        >
    </TabList>
    <TabPanels>
        <TabPanel>
            <form
                on:submit={login}
                class="w-screen bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-xl p-4 py-16 mx-auto my-auto m-4 flex flex-col items-center gap-2 popin"
            >
                <h1 class="text-xl font-bold">Log In</h1>
                <div>
                    <label for="login-username" class="block my-1"
                        >Username/Email</label
                    >
                    <input
                        id="login-username"
                        type="text"
                        bind:value={formData.username}
                        maxlength="128"
                        placeholder="Example"
                    />
                </div>
                <div>
                    <label for="login-password" class="block my-1"
                        >Password</label
                    >
                    <input
                        id="login-password"
                        type="password"
                        bind:value={formData.password}
                        maxlength="128"
                        placeholder="8-72 characters"
                    />
                </div>
                <Button class="mt-4" major={true} type="submit"
                    >Log In {#if formData.loading}<Loader
                            size={16}
                        />{/if}</Button
                >
            </form>
        </TabPanel>
        <TabPanel>
            <form
                on:submit={signUp}
                class="w-screen bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-xl p-4 py-16 mx-auto my-auto m-4 flex flex-col items-center gap-2 popin"
            >
                <h1 class="text-xl font-bold">Sign Up</h1>
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
                    <label for="signup-username" class="block my-1"
                        >Username</label
                    >
                    <input
                        id="signup-username"
                        type="text"
                        bind:value={formData.username}
                        maxlength="128"
                        placeholder="Example"
                    />
                </div>
                <div>
                    <label for="signup-password" class="block my-1"
                        >Password</label
                    >
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
                    <FilePicker bind:files={formData.images}
                        >Pick an image</FilePicker
                    >
                </div>
                <Button class="mt-4" major={true} type="submit"
                    >Sign Up {#if formData.loading}<Loader
                            size={16}
                        />{/if}</Button
                >
            </form>
        </TabPanel>
    </TabPanels>
</TabGroup>
