<script>
    // @ts-nocheck - Because typescript is being stupid.

    import { goto } from '$app/navigation'
    import Button from './Button.svelte'
    import { currentUser, pb } from './pocketbase'
</script>

<nav class="flex flex-row w-full h-16 my-4 top-0 p-4 sticky items-center">
    <div
        class="hover:cursor-pointer flex flex-row items-center mr-auto"
        on:click={() => goto('/')}
        on:keypress={() => goto('/')}
    >
        <img src="/logo.svg" alt="Imagi logo" class="w-12" />
        <span class="font-bold text-2xl">Imagi</span>
    </div>
    {#if $currentUser}
        <img
            src={pb.getFileUrl($currentUser, $currentUser.avatar, {
                thumb: '128x128',
            })}
            alt="Profile"
            class="rounded-full"
        />
    {:else}
        <Button onclick={() => goto('/login')}>Login</Button>
    {/if}
</nav>
