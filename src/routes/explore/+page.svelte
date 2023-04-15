<script lang="ts">
    // @ts-nocheck
    import RecordList from '$lib/backend/RecordList.svelte'
    import { Collections } from '$lib/backend/schema'
    import Avatar from '$lib/ui/profile/Avatar.svelte'
    import CommunityAvatar from '$lib/ui/profile/CommunityAvatar.svelte'
    import { Icon, PencilSquare, UserGroup } from 'svelte-hero-icons'
</script>

<title>Explore</title>
<div class="flex flex-col gap-4">
    <RecordList
        collection={Collections.Users}
        let:items
        query={{ sort: '-created' }}
    >
        <h1 class="text-3xl font-bold">New Users</h1>
        <div class="flex overflow-x-auto flex-row gap-4 pb-4 w-full">
            {#if items}
                {#each items as item}
                    <a
                        class="flex z-10 flex-row flex-shrink-0 gap-2 items-center px-4 py-2 bg-white rounded-lg shadow-md transition-transform transform-gpu animate-popIn dark:bg-zinc-900 hover:-translate-y-1"
                        href={`/user/${item.username}`}
                    >
                        <Avatar width={32} thumb="32x32" user={item} />
                        <span>
                            {item.username}
                        </span>
                    </a>
                {/each}
            {:else}
                {#each new Array(10) as item}
                    <div
                        class="flex z-10 flex-row flex-shrink-0 gap-2 items-center px-4 py-2 bg-white rounded-lg shadow-md transition-transform transform-gpu dark:bg-zinc-900 hover:-translate-y-1"
                    >
                        <div
                            class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animatepulse"
                        />
                        <div
                            class="w-24 h-4 rounded-full animate-pulse bg-zinc-100 dark:bg-zinc-800"
                        />
                    </div>
                {/each}
            {/if}
        </div>
    </RecordList>
    <RecordList
        collection={Collections.Communities}
        query={{ expand: 'communityCounts(community)', sort: '-created' }}
        let:items
    >
        <h1 class="text-3xl font-bold">New Communities</h1>
        <div
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            {#if items}
                {#each items as item}
                    <a
                        class="flex z-10 flex-col flex-shrink-0 gap-2 p-4 bg-white rounded-lg shadow-md transition-transform transform-gpu animate-popIn dark:bg-zinc-900 hover:-translate-y-1"
                        href={`/community/${item.name}`}
                    >
                        <div class="flex flex-row gap-2 items-center">
                            <CommunityAvatar
                                width={32}
                                thumb="32x32"
                                community={item}
                            />
                            <span>
                                {item.name}
                            </span>
                        </div>
                        <div class="flex flex-row gap-4">
                            <div class="flex flex-row gap-1 items-center">
                                <Icon src={PencilSquare} mini size="18" />
                                {item?.expand?.['communityCounts(community)'][0]
                                    .posts}
                            </div>
                            <div class="flex flex-row gap-1 items-center">
                                <Icon src={UserGroup} size="18" />
                                {item?.expand?.['communityCounts(community)'][0]
                                    .members}
                            </div>
                        </div>
                    </a>
                {/each}
            {:else}
                {#each new Array(10) as item}
                    <div
                        class="flex z-10 flex-row flex-shrink-0 gap-2 items-center px-4 py-2 bg-white rounded-lg shadow-md transition-transform transform-gpu dark:bg-zinc-900 hover:-translate-y-1"
                    >
                        <div
                            class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animatepulse"
                        />
                        <div
                            class="w-24 h-4 rounded-full animate-pulse bg-zinc-100 dark:bg-zinc-800"
                        />
                    </div>
                {/each}
            {/if}
        </div>
    </RecordList>
</div>
