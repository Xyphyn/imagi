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
        Squares2x2,
        EllipsisHorizontal,
    } from 'svelte-hero-icons'
    import Menu from './menus/Menu.svelte'
    import PostUpload from '$lib/misc/posts/PostUpload.svelte'
    import { pb, user } from '$lib/backend/pocketbase'
    import Avatar from './profile/Avatar.svelte'
    import MenuButton from './menus/MenuButton.svelte'
    import { goto } from '$app/navigation'
    import CreateCommunity from '$lib/misc/community/CreateCommunity.svelte'
    import RecordList from '$lib/backend/RecordList.svelte'
    import { Collections } from '$lib/backend/schema'
    import DotsLoad from './loaders/DotsLoad.svelte'
    import { _, locale } from 'svelte-i18n'

    let modals = {
        uploading: false,
        community: false,
    }
</script>

<nav
    class="flex sticky top-0 z-20 flex-row gap-4 items-center mt-2 w-full h-16 backdrop-blur-xl bg-slate-50/80 dark:bg-zinc-950/80"
>
    <div class="flex flex-row gap-4 items-center p-4 mx-auto w-full max-w-7xl">
        <a href="/" class="flex flex-row gap-2 items-center">
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
            <span
                class="hidden px-2 py-1 text-sm font-bold text-white uppercase bg-black rounded-md dark:bg-white dark:text-black sm:block"
            >
                {import.meta.env.VITE_VERSION || '1.0.0'}
            </span>
        </a>
        <div
            class="flex flex-row gap-2 items-center px-4 py-2 mx-auto bg-white rounded-full shadow-lg dark:bg-zinc-900 sm:ml-auto sm:mr-0"
        >
            <Menu rtl={false} itemsClass="mt-4 bg-white dark:bg-zinc-900">
                <Button slot="button" label="Other menu">
                    <Icon src={EllipsisHorizontal} size="16" mini />
                </Button>
                <a
                    href="/blog"
                    class="mx-4 my-2 text-xs text-left opacity-50 transition-colors hover:text-sky-400"
                >
                    {$_('navbar.blog')}
                </a>
                <RecordList
                    collection={Collections.Blog}
                    let:items
                    query={{ sort: '-created' }}
                    perPage={5}
                >
                    {#if items}
                        {#each items as item}
                            <MenuButton link href={`/blog/${item.id}`}>
                                {item.title}
                            </MenuButton>
                        {/each}
                    {:else}
                        {#each new Array(5) as item}
                            <MenuButton>
                                <div class="h-[20px]">
                                    <DotsLoad />
                                </div>
                            </MenuButton>
                        {/each}
                    {/if}
                </RecordList>
                <div
                    class="border-t border-black/10 dark:border-white/10 w-[90%] mx-auto my-2"
                />
                <span class="mx-4 mb-2 text-xs text-left opacity-50">
                    {$_('navbar.links')}
                </span>
                <MenuButton link href="https://github.com/Xyphyn/Imagi">
                    GitHub
                </MenuButton>
                <MenuButton link href="mailto:imagi@xylight.us">
                    Email
                </MenuButton>
                <MenuButton link href="https://discord.gg/G64UcqzmZC">
                    Discord
                </MenuButton>
            </Menu>
            <Button link href="/explore" label="Explore">
                <Icon src={GlobeAlt} size="16" />
                <span class="hidden xs:inline">{$_('button.explore')}</span>
            </Button>
            <Menu itemsClass="mt-4 bg-white dark:bg-zinc-900">
                <Button color={Color.accent} slot="button">
                    <Icon src={Plus} mini size="16" />
                    {$_('button.create')}
                </Button>
                <span class="mx-4 my-2 text-xs text-left opacity-50">
                    {$_('button.create')}
                </span>
                <MenuButton onclick={() => (modals.uploading = true)}>
                    <Icon src={PencilSquare} mini size="18" />
                    {$_('button.create.post')}
                </MenuButton>
                <MenuButton onclick={() => (modals.community = true)}>
                    <Icon src={Newspaper} mini size="18" />
                    {$_('button.create.community')}
                </MenuButton>
            </Menu>
        </div>
        {#if $user}
            <Menu>
                <div class="w-max cursor-pointer h-max" slot="button">
                    <Avatar width={48} thumb="48x48" user={$user} />
                </div>
                <span class="mx-4 my-2 text-xs text-left opacity-50">
                    {$user.username}
                </span>
                <MenuButton onclick={() => goto(`/user/${$user?.username}`)}>
                    <Icon src={UserCircle} size="18" />
                    {$_('button.profile.profile')}
                </MenuButton>
                <MenuButton link href="/settings">
                    <Icon src={Cog6Tooth} size="18" />
                    {$_('button.profile.settings')}
                </MenuButton>
                <MenuButton
                    onclick={() => pb.authStore.clear()}
                    color={Color.dangerSecondary}
                >
                    <Icon src={ArrowLeftOnRectangle} mini size="18" />
                    {$_('button.profile.logout')}
                </MenuButton>
                <div
                    class="border-t border-black/10 dark:border-white/10 w-[90%] mx-auto my-2"
                />
                <span
                    class="flex flex-row gap-1 items-center mx-4 my-2 mr-auto text-sm text-left"
                >
                    {$_('misc.madeBy')}
                    <a
                        href="https://xylight.us"
                        class="inline-flex gap-[2px] flex-row items-center font-bold"
                    >
                        <img
                            src="/img/logo.svg"
                            width={24}
                            height={24}
                            alt="Imagi logo"
                            class="inline cursor-pointer dark:hidden"
                        />
                        <img
                            src="/img/logo-dark.svg"
                            width={24}
                            height={24}
                            alt="Imagi logo"
                            class="hidden cursor-pointer dark:inline"
                        />
                        Xylo
                    </a>
                </span>
            </Menu>
        {:else}
            <Button color={Color.accent} link href="/login">
                {$_('account.login')}
            </Button>
        {/if}
    </div>
</nav>
<PostUpload bind:open={modals.uploading} />
<CreateCommunity bind:open={modals.community} />
