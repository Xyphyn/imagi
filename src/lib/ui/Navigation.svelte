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
    } from 'svelte-hero-icons'
    import Menu from './menus/Menu.svelte'
    import PostUpload from '$lib/misc/posts/PostUpload.svelte'
    import { pb, user } from '$lib/backend/pocketbase'
    import Avatar from './profile/Avatar.svelte'

    let modals = {
        uploading: false,
    }
</script>

<nav class="flex flex-row gap-4 items-center mb-4 w-full h-16">
    <a href="/" class="">
        <img
            src="/img/logo.svg"
            width={48}
            height={48}
            alt="Imagi logo"
            class="cursor-pointer"
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
            <h1 slot="title" class="font-bold">Create</h1>
            <Button
                class="w-full dark:bg-white/10"
                onclick={() => (modals.uploading = true)}
            >
                <Icon src={PencilSquare} mini size="18" />
                Post
            </Button>
            <Button class="w-full dark:bg-white/10">
                <Icon src={Newspaper} mini size="18" />
                Community
            </Button>
        </Menu>
    </div>
    {#if $user}
        <Menu>
            <div class="w-max cursor-pointer h-max" slot="button">
                <Avatar user={$user} />
            </div>
            <h1 class="font-bold" slot="title">{$user.username}</h1>
            <Button
                link
                class="w-full dark:bg-white/10"
                href="/user/{$user.username}"
            >
                <Icon src={UserCircle} size="18" />
                Profile
            </Button>
            <Button link class="w-full dark:bg-white/10" href="/">
                <Icon src={Cog6Tooth} size="18" />
                Settings
            </Button>
            <Button
                class="w-full"
                onclick={() => pb.authStore.clear()}
                color={Color.danger}
            >
                <Icon src={ArrowLeftOnRectangle} mini size="18" />
                Log Out
            </Button>
        </Menu>
    {:else}
        <Button color={Color.accent} link href="/login">Log In</Button>
    {/if}
</nav>
<PostUpload bind:open={modals.uploading} />
