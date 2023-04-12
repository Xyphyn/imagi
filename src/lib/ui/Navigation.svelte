<script lang="ts">
    import { Color } from '$lib/ui/colors'
    import Button from './Button.svelte'
    import {
        Icon,
        Plus,
        GlobeAlt,
        PencilSquare,
        Newspaper,
    } from 'svelte-hero-icons'
    import Menu from './menus/Menu.svelte'
</script>

<nav class="w-full h-16 flex flex-row items-center mb-4">
    <a href="/" class="mr-auto">
        <img
            src="/img/logo.svg"
            width={48}
            height={48}
            alt="Imagi logo"
            class="cursor-pointer"
        />
    </a>
    <div
        class="flex flex-row items-center rounded-full bg-white dark:bg-white/5 px-4 py-2 shadow-lg gap-2"
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
            <Button class="w-full" onclick={() => console.log('hi')}>
                <Icon src={PencilSquare} mini size="18" />
                Post
            </Button>
            <Button class="w-full">
                <Icon src={Newspaper} mini size="18" />
                Community
            </Button>
        </Menu>
    </div>
</nav>
