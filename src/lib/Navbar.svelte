<script lang="ts">
    // @ts-nocheck - Because typescript is being stupid.

    import { goto } from '$app/navigation'
    import {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Transition,
    } from '@rgossiaux/svelte-headlessui'
    import Button from './Button.svelte'
    import { currentUser, pb } from './pocketbase'
    import {
        Icon,
        ArrowLeftOnRectangle,
        UserCircle,
        Plus,
        Cog6Tooth,
        Newspaper,
        GlobeAlt,
        PencilSquare,
        Envelope,
        EllipsisHorizontal,
    } from 'svelte-hero-icons'
    import Upload from './views/Upload.svelte'
    import Colored from './misc/Colored.svelte'
    import CreateCommunity from './views/CreateCommunity.svelte'
    import { onMount } from 'svelte'
    import { Collections, type BlogResponse } from './types/pb-types'
    import { userSettings } from '../stores'
    import RelativeDate from './RelativeDate.svelte'

    interface Menus {
        upload: boolean
        community: boolean
    }

    let views: Menus = {
        upload: false,
        community: false,
    }

    let blogposts: BlogResponse[] | undefined

    onMount(async () => {
        pb.collection(Collections.Blog)
            .getList<BlogResponse>(1, 5, { sort: '-created' })
            .then((data) => (blogposts = data.items))
    })
</script>

<nav
    class="flex sticky top-0 z-10 flex-row gap-4 items-center p-4 my-4 w-full h-16"
>
    <a class="flex flex-row items-center mr-auto hover:cursor-pointer" href="/">
        <img
            src="/logo.svg"
            alt="Imagi logo"
            class="object-cover w-12 h-12"
            width={48}
            height={48}
        />
        <span class="hidden gap-2 items-center text-2xl font-bold md:flex">
            Imagi <span
                class="py-1 px-2 text-base text-black bg-gradient-to-br rounded-md from-primary to-secondary"
            >
                {#if import.meta.env.VITE_VERSION}
                    {import.meta.env.VITE_VERSION}
                {:else}
                    BETA
                {/if}
            </span>
        </span>
    </a>
    <Menu class="menu">
        <MenuButton>
            <Button
                major={false}
                label="Blog"
                onclick={() => ($userSettings.readUntil = new Date())}
            >
                <Icon src={EllipsisHorizontal} size="20" />

                {#if blogposts}
                    {#if blogposts.find((post) => new Date(post.created).getTime() > new Date($userSettings.readUntil).getTime())}
                        <div
                            class="bg-red-400 absolute left-[14px] top-2 w-2 h-2 rounded-full"
                        />
                    {/if}
                {/if}
            </Button>
        </MenuButton>
        <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <MenuItems
                class="menu-items origin-top-left left-0 w-96 sm:origin-top-right sm:right-0"
            >
                <Colored>
                    <h1 class="text-2xl font-bold">Other</h1>
                </Colored>
                <div class="flex flex-col gap-2">
                    <Colored>
                        <a class="text-xl font-bold" href="/blog">Blog</a>
                    </Colored>
                    {#if blogposts}
                        {#each blogposts as post}
                            <div class="flex flex-row justify-between">
                                <a
                                    class="font-bold link"
                                    href={`/blog/${post.id}`}
                                >
                                    {post.title}
                                </a>
                                <span class="opacity-80 text-sm">
                                    <RelativeDate date={post.created} />
                                </span>
                            </div>
                        {/each}
                    {/if}
                </div>
                <Colored>
                    <h1 class="text-xl font-bold">Links</h1>
                </Colored>
                <div class="flex flex-row gap-2">
                    <a
                        href="https://github.com/Xyphyn/Imagi"
                        class="active:scale-95 px-3 py-2 rounded-md text-sm link dark:fill-white
                    focus:outline-4 flex flex-row gap-2 items-center font-medium hover:brightness-[103%] transition-all ease-out-expo dark:bg-slate-700 bg-slate-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                    </a>
                    <a
                        href="mailto:imagi@xylight.us"
                        class="active:scale-95 px-3 py-2 rounded-md text-sm
                    focus:outline-4 flex flex-row gap-2 items-center font-medium hover:brightness-[103%] transition-all ease-out-expo dark:bg-slate-700 bg-slate-200"
                    >
                        <Icon src={Envelope} size="20" solid />
                    </a>
                    <a
                        href="https://pocketbase.io"
                        class="active:scale-95 px-3 py-2 rounded-md text-sm
                    focus:outline-4 flex flex-row gap-2 items-center font-medium hover:brightness-[103%] transition-all ease-out-expo dark:bg-slate-700 bg-slate-200"
                    >
                        <img
                            src="/pb.svg"
                            width={20}
                            height={20}
                            alt="Pocketbase logo"
                        />
                    </a>
                </div>
            </MenuItems>
        </Transition>
    </Menu>
    <a
        href="/explore"
        aria-label="Explore"
        class="active:scale-95 px-3 py-2 rounded-md text-sm
    focus:outline-4 flex flex-row gap-2 items-center font-medium hover:brightness-[103%] transition-all ease-out-expo dark:bg-slate-700 bg-slate-200"
    >
        <Icon src={GlobeAlt} size="20" />
        <span class="hidden sm:block">Explore</span>
    </a>
    <Menu class="menu">
        <MenuButton>
            <Button major={true} label="Create">
                <Icon src={Plus} size="20" />
                <span class="hidden sm:block">Create</span>
            </Button>
        </MenuButton>
        <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <MenuItems class="menu-items">
                <Colored><h1 class="text-2xl font-bold">Create</h1></Colored>
                <MenuItem>
                    <Button
                        class="menu-item"
                        onclick={() => (views.upload = true)}
                    >
                        <Icon src={PencilSquare} width="20" /> Post
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button
                        class="menu-item"
                        onclick={() => (views.community = true)}
                    >
                        <Icon src={Newspaper} width="20" /> Community
                    </Button>
                </MenuItem>
            </MenuItems>
        </Transition>
    </Menu>
    {#if $currentUser}
        <Menu class="menu">
            <MenuButton>
                <img
                    src={pb.getFileUrl($currentUser, $currentUser.avatar, {
                        thumb: '128x128',
                    })}
                    alt="Profile"
                    class="object-cover w-12 rounded-full cursor-pointer aspect-square"
                />
            </MenuButton>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems class="menu-items">
                    <Colored>
                        <h1 class="text-2xl font-bold">
                            {$currentUser.username}
                        </h1>
                    </Colored>
                    <MenuItem>
                        <a
                            class="menu-item active:scale-95 px-3 py-2 rounded-md text-sm
                            focus:outline-4 flex flex-row gap-2 items-center font-medium hover:brightness-[103%] transition-all ease-out-expo dark:bg-slate-700 bg-slate-200"
                            href={`/user/${$currentUser.username}`}
                        >
                            <Icon src={UserCircle} size="20" />
                            Profile
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <Button
                            class="menu-item"
                            onclick={() => goto(`/settings`)}
                        >
                            <Icon src={Cog6Tooth} size="20" />
                            Settings
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button
                            class="menu-item"
                            onclick={() => pb.authStore.clear()}
                        >
                            <Icon src={ArrowLeftOnRectangle} size="20" />Log Out
                        </Button>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    {:else}
        <Button onclick={() => goto('/login')}>Login</Button>
    {/if}
</nav>
<Upload bind:open={views.upload} />
<CreateCommunity bind:open={views.community} />
