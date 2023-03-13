<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import DeleteAccount from '$lib/views/DeleteAccount.svelte'
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Switch,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { Icon, ChevronRight } from 'svelte-hero-icons'
    import { toast } from '../../app'
    import { userSettings } from '../../stores'

    interface AccountSettings {
        email: string
        bio: string
        pfp: FileList | null
    }

    let deleting = false

    let accountSettings: AccountSettings = {
        email: $currentUser?.email ?? '',
        bio: $currentUser?.bio ?? '',
        pfp: null,
    }

    function changeBio() {
        if (!$currentUser) {
            goto('/login')
        }

        pb.collection('users')
            .update($currentUser!.id, {
                bio: accountSettings.bio,
            })
            .then(() => {
                toast('Success', 'Successfully changed bio.', 'success')
            })
            .catch(() => {
                toast(
                    'Error',
                    'Failed to change bio. Try refreshing your login.',
                    'error'
                )
            })
    }

    function changeAvatar() {
        if (!accountSettings.pfp || accountSettings.pfp.length <= 0) return

        const data = new FormData()
        data.append('avatar', accountSettings.pfp[0])

        pb.collection('users')
            .update($currentUser!.id, data)
            .then(() => {
                toast(
                    'Success',
                    'Success! You may need to refresh to see changes.',
                    'success'
                )
            })
            .catch(() => {
                toast(
                    'Error',
                    "Could not change avatar. Check the image's file size.",
                    'error'
                )
            })
    }
</script>

<title>Imagi | Settings</title>
<h1 class="font-bold text-4xl self-center justify-self-center mx-auto">
    <Colored>Settings</Colored>
</h1>
<TabGroup
    class="flex flex-row items-center justify-center mx-auto p-4 rounded-lg w-full h-full gap-4"
>
    <TabList class="flex flex-col gap-4 w-64 self-start">
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md py-2 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}>General</Tab
        >
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md py-2 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}>Account</Tab
        >
    </TabList>
    <TabPanels class="w-full max-w-lg">
        <TabPanel
            class="flex flex-col justify-between w-full items-center gap-4 p-4 my-2 dark:bg-slate-800 bg-slate-50 rounded-lg"
        >
            <div class="flex flex-row items-center justify-between gap-2">
                <span class="flex flex-col w-[80%]"
                    >No-SSR Posts <span class="opacity-50 text-sm"
                        >Loads posts client side, opening posts in a dialog
                        instead of a page.</span
                    >
                </span>
                <Switch
                    checked={$userSettings.nossr}
                    on:change={(e) => {
                        $userSettings.nossr = e.detail
                    }}
                    class={`w-12 h-6 relative inline-flex items-center rounded-full transition-colors ${
                        $userSettings.nossr ? 'bg-secondary' : 'bg-slate-600'
                    }`}
                >
                    <span
                        aria-hidden="true"
                        class={`${
                            $userSettings.nossr
                                ? 'translate-x-7'
                                : 'translate-x-1'
                        }
                  pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    /></Switch
                >
            </div>
            <div class="flex flex-row items-center justify-between gap-2">
                <span class="flex flex-col w-[80%]"
                    >Thumbnail Size <span class="opacity-50 text-sm"
                        >The image size of post thumbnails. This does not affect
                        expanded view.</span
                    >
                </span>
                <Button
                    onclick={() => ($userSettings.thumbSize = '64x64')}
                    major={$userSettings.thumbSize == '64x64'}>64x64</Button
                >
                <Button
                    onclick={() => ($userSettings.thumbSize = '128x128')}
                    major={$userSettings.thumbSize == '128x128'}>128x128</Button
                >
                <Button
                    onclick={() => ($userSettings.thumbSize = '256x256')}
                    major={$userSettings.thumbSize == '256x256'}>256x256</Button
                >
            </div>
        </TabPanel>
        {#if $currentUser}
            <TabPanel
                class="flex flex-col justify-between w-full items-center p-4 my-2 dark:bg-slate-800 bg-slate-50 rounded-lg"
            >
                <div
                    class="flex flex-row justify-between w-full items-center p-4 my-2 rounded-lg"
                >
                    <span>Email</span>
                    <input
                        type="text"
                        placeholder="New Email"
                        bind:value={accountSettings.email}
                    />
                    <Button
                        major={true}
                        onclick={() => {
                            pb.collection('users')
                                .requestEmailChange(accountSettings.email)
                                .then(() => {
                                    toast(
                                        'Confirmation',
                                        'Confirm your new email, a verification link was sent to your inbox.',
                                        'info'
                                    )
                                })
                                .catch(() => {
                                    toast(
                                        'Error',
                                        'Could not change email. The email may be invalid or already taken.',
                                        'error'
                                    )
                                })
                        }}>Change</Button
                    >
                </div>
                <div
                    class="flex flex-row justify-between w-full items-center p-4 my-2 rounded-lg"
                >
                    <span>Bio</span>
                    <div class="relative">
                        <textarea
                            cols="30"
                            rows="5"
                            maxlength="128"
                            placeholder="I like to argue with people online"
                            bind:value={accountSettings.bio}
                        /><Button
                            class="absolute bottom-0 right-0 m-2"
                            major={true}
                            onclick={changeBio}>Change</Button
                        >
                    </div>
                </div>
                <div
                    class="flex flex-row justify-between w-full items-center p-4 my-2"
                >
                    <span>Change Avatar</span>
                    <div class="flex flex-row gap-2">
                        <FilePicker
                            forId="changeAvatar"
                            bind:files={accountSettings.pfp}
                            class="w-full">Avatar</FilePicker
                        >
                        <Button major={true} onclick={changeAvatar}
                            >Change</Button
                        >
                    </div>
                </div>
                <div
                    class="flex flex-row justify-between w-full items-center p-4 my-2"
                >
                    <span>Delete Account</span>
                    <div class="flex flex-row gap-2">
                        <Button
                            colorType="danger"
                            major={true}
                            onclick={() => (deleting = true)}
                            >Delete
                        </Button>
                    </div>
                </div></TabPanel
            >
        {/if}
    </TabPanels>
</TabGroup>
<DeleteAccount bind:open={deleting} />
