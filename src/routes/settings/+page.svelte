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
    import {
        Icon,
        ChevronRight,
        Cog6Tooth,
        UserCircle,
    } from 'svelte-hero-icons'
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
<h1
    class="justify-self-center self-center mx-auto w-full text-center text-4xl font-bold"
>
    <Colored>Settings</Colored>
</h1>
<TabGroup
    class="flex flex-col gap-4 justify-center items-center p-4 w-full h-full rounded-lg"
>
    <TabList
        class="flex flex-col sm:flex-row gap-4 self-center w-full max-w-xl mx-auto"
    >
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md py-2 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            <Icon src={Cog6Tooth} size="20" class="inline align-top my-auto" /> General
        </Tab>
        <Tab
            class={({ selected }) =>
                `flex-1 rounded-md py-2 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            <Icon src={UserCircle} size="20" class="inline align-top my-auto" />
            Account
        </Tab>
    </TabList>
    <TabPanels class="w-full max-w-xl">
        <TabPanel
            class="flex flex-col gap-4 justify-between items-center p-4 w-full rounded-lg dark:bg-slate-800 bg-white shadow-lg popin"
        >
            <div
                class="flex flex-row  gap-2 justify-between items-center w-full"
            >
                <span class="flex flex-col w-[80%]">
                    Post Dialogs
                    <span class="text-sm opacity-50">
                        Loads posts client side, opening posts in a dialog
                        instead of a page. (Recommended)
                    </span>
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
                    />
                </Switch>
            </div>
            <div
                class="flex flex-col sm:flex-row gap-2 justify-between items-center w-full"
            >
                <span class="flex flex-col w-full sm:w-[80%]">
                    Thumbnail Size <span class="text-sm opacity-50">
                        The image size of post thumbnails. This does not affect
                        expanded view.
                    </span>
                </span>
                <div class="flex flex-row gap-2">
                    <Button
                        onclick={() => ($userSettings.thumbSize = '64x64')}
                        major={$userSettings.thumbSize == '64x64'}
                    >
                        64x64
                    </Button>
                    <Button
                        onclick={() => ($userSettings.thumbSize = '128x128')}
                        major={$userSettings.thumbSize == '128x128'}
                    >
                        128x128
                    </Button>
                    <Button
                        onclick={() => ($userSettings.thumbSize = '256x256')}
                        major={$userSettings.thumbSize == '256x256'}
                    >
                        256x256
                    </Button>
                </div>
            </div>
            <div
                class="flex flex-row  gap-2 justify-between items-center w-full"
            >
                <span class="flex flex-col w-[80%]">
                    Batch Size <span class="text-sm opacity-50">
                        How many posts to load at a time.
                    </span>
                </span>
                <input
                    bind:value={$userSettings.batchSize}
                    type="number"
                    placeholder="Batch Size"
                    on:input={(event) => {
                        const value = event.currentTarget.value
                        if (
                            !Number.isInteger(Number(value)) ||
                            value.length > 2
                        ) {
                            event.preventDefault()
                        }
                    }}
                    maxlength={2}
                />
            </div>
        </TabPanel>
        {#if $currentUser}
            <TabPanel
                class="flex flex-col justify-between items-center p-4 my-2 w-full rounded-lg dark:bg-slate-800 bg-white shadow-lg popin"
            >
                <div
                    class="flex flex-row justify-between items-center p-4 my-2 w-full rounded-lg"
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
                        }}
                    >
                        Change
                    </Button>
                </div>
                <div
                    class="flex flex-row justify-between items-center p-4 my-2 w-full rounded-lg"
                >
                    <span>Bio</span>
                    <div class="relative">
                        <textarea
                            cols="30"
                            rows="5"
                            maxlength="128"
                            placeholder="I like to argue with people online"
                            bind:value={accountSettings.bio}
                        />
                        <Button
                            class="absolute right-0 bottom-0 m-2"
                            major={true}
                            onclick={changeBio}
                        >
                            Change
                        </Button>
                    </div>
                </div>
                <div
                    class="flex flex-row justify-between items-center p-4 my-2 w-full"
                >
                    <span>Change Avatar</span>
                    <div class="flex flex-row gap-2">
                        <FilePicker
                            forId="changeAvatar"
                            bind:files={accountSettings.pfp}
                            class="w-full"
                        >
                            Avatar
                        </FilePicker>
                        <Button major={true} onclick={changeAvatar}>
                            Change
                        </Button>
                    </div>
                </div>
                <div
                    class="flex flex-row justify-between items-center p-4 my-2 w-full"
                >
                    <span>Delete Account</span>
                    <div class="flex flex-row gap-2">
                        <Button
                            colorType="danger"
                            major={true}
                            onclick={() => (deleting = true)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </TabPanel>
        {/if}
    </TabPanels>
</TabGroup>
<DeleteAccount bind:open={deleting} />
