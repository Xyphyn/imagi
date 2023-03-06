<script>
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
    import { Icon, ArrowLeftOnRectangle, UserCircle } from 'svelte-hero-icons'
</script>

<nav
    class="flex flex-row w-full h-16 my-4 top-0 p-4 sticky items-center backdrop-blur-xl z-10"
>
    <div
        class="hover:cursor-pointer flex flex-row items-center mr-auto"
        on:click={() => goto('/')}
        on:keypress={() => goto('/')}
    >
        <img src="/logo.svg" alt="Imagi logo" class="w-12" />
        <span class="font-bold text-2xl">Imagi</span>
    </div>
    {#if $currentUser}
        <Menu class="relative inline-block text-left">
            <MenuButton>
                <img
                    src={pb.getFileUrl($currentUser, $currentUser.avatar, {
                        thumb: '128x128',
                    })}
                    alt="Profile"
                    class="rounded-full w-12 aspect-square object-cover cursor-pointer"
                    on:click={() => {}}
                    on:keypress={() => {}}
                /></MenuButton
            >
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    class="flex flex-col gap-4 absolute right-0 p-4 w-56 mt-2 origin-top-right bg-white dark:bg-slate-800 rounded-md shadow-lg"
                >
                    <MenuItem>
                        <Button class="w-full" onclick={() => goto('/profile')}>
                            <Icon src={UserCircle} size="24" />
                            Profile
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button
                            class="w-full"
                            onclick={() => pb.authStore.clear()}
                            ><Icon src={ArrowLeftOnRectangle} size="24" />Log
                            Out</Button
                        ></MenuItem
                    >
                </MenuItems></Transition
            >
        </Menu>
    {:else}
        <Button onclick={() => goto('/login')}>Login</Button>
    {/if}
</nav>
