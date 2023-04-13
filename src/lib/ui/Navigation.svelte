<script lang="ts">
    import { Color } from '$lib/ui/colors'
    import Button from './Button.svelte'
    import {
        Icon,
        Plus,
        GlobeAlt,
        PencilSquare,
        Newspaper,
        UserCircle,
        Cog6Tooth,
        ArrowLeftOnRectangle,
        Beaker,
    } from 'svelte-hero-icons'
    import Menu from './menus/Menu.svelte'
    import PostUpload from '$lib/misc/posts/PostUpload.svelte'
    import { pb, user } from '$lib/backend/pocketbase'
    import Avatar from './profile/Avatar.svelte'
    import MenuButton from './menus/MenuButton.svelte'
    import { goto } from '$app/navigation'
    import { userSettings } from '$lib/settings'

    let modals = {
        uploading: false,
    }
</script>

<nav class="flex flex-row gap-4 items-center mb-4 w-full h-16">
    <a href="/">
        <img
            src="/img/logo.svg"
            width={48}
            height={48}
            alt="Imagi logo"
            class="cursor-pointer dark:hidden"
        />
        <img
            src="/img/logo-dark.svg"
            width={48}
            height={48}
            alt="Imagi logo"
            class="hidden cursor-pointer dark:block"
        />
    </a>
    <div
        class="flex flex-row gap-2 items-center px-4 py-2 mx-auto bg-white rounded-full shadow-lg dark:bg-white/5 sm:ml-auto sm:mr-0"
    >
        <Button link href="/">
            <Icon src={GlobeAlt} size="16" />
            Explore
        </Button>
        <Menu>
            <Button color={Color.accent} slot="button">
                <Icon src={Plus} mini size="16" />
                Create
            </Button>
            <MenuButton onclick={() => (modals.uploading = true)}>
                <Icon src={PencilSquare} mini size="18" />
                Post
            </MenuButton>
            <MenuButton>
                <Icon src={Newspaper} mini size="18" />
                Community
            </MenuButton>
        </Menu>
    </div>
    {#if $user}
        <Menu>
            <div class="w-max cursor-pointer h-max" slot="button">
                <Avatar width={48} thumb="48x48" user={$user} />
            </div>
            <MenuButton onclick={() => goto(`/user/${$user?.username}`)}>
                <Icon src={UserCircle} size="18" />
                Profile
            </MenuButton>
            <MenuButton>
                <Icon src={Cog6Tooth} size="18" />
                Settings
            </MenuButton>
            <MenuButton
                onclick={() => pb.authStore.clear()}
                color={Color.dangerSecondary}
            >
                <Icon src={ArrowLeftOnRectangle} mini size="18" />
                Log Out
            </MenuButton>
        </Menu>
    {:else}
        <Button color={Color.accent} link href="/login">Log In</Button>
    {/if}
</nav>
<PostUpload bind:open={modals.uploading} />
