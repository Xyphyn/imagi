<script lang="ts">
    import { goto } from '$app/navigation'

    import Avatar from '$lib/Avatar.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import type {
        CommunitiesResponse,
        UsersResponse,
    } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { Icon, PencilSquare, UserGroup } from 'svelte-hero-icons'

    let users: UsersResponse[] | undefined
    let communities: CommunitiesResponse<any>[] | undefined

    onMount(async () => {
        pb.collection('users')
            .getList<UsersResponse>(1, 40, { sort: '-created' })
            .then((data) => {
                users = data.items
            })

        pb.collection('communities')
            .getList<CommunitiesResponse<any>>(1, 40, {
                sort: '-created',
                expand: 'communityCounts(community)',
            })
            .then((data) => {
                communities = data.items
            })
    })
</script>

<title>Imagi | Explore</title>
<div class="flex flex-col items-center p-4 box-border w-full">
    <h1 class="text-4xl font-bold md:self-start"><Colored>Explore</Colored></h1>
    <span class="self-start mt-4 font-bold text-xl">New Users</span>
    <div class="flex overflow-auto flex-row gap-4 my-4 h-12 self-start w-full">
        {#if !users}
            {#each new Array(10) as items}
                <div class="flex flex-row flex-shrink-0 gap-2 items-center h-8">
                    <div
                        class="w-8 h-8 bg-white rounded-full animate-pulse dark:bg-slate-700"
                    />
                    <div
                        class="w-24 h-8 bg-white rounded-full animate-pulse dark:bg-slate-700"
                    />
                </div>
            {/each}
        {:else}
            {#each users as user}
                <div
                    class="flex flex-row flex-shrink-0 gap-2 items-center h-8 link popin"
                >
                    <Avatar {user} width={32} thumbnail="32x32" />
                    <a href={`/user/${user.username}`}>{user.username}</a>
                </div>
            {/each}
        {/if}
    </div>
    <span class="self-start mt-4 font-bold text-xl">New Communities</span>
    <div
        class="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
    >
        {#if !communities}
            {#each new Array(8) as items}
                <div
                    class="w-full flex flex-col h-[13.5rem] shadow-lg p-6 rounded-lg gap-4 items-center bg-white dark:bg-slate-800 popin"
                >
                    <div
                        class="w-16 h-16 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full p-2"
                    />
                    <div
                        class="w-[70%] animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg p-2 mt-4"
                    />
                </div>
            {/each}
        {:else}
            {#each communities as community}
                <div
                    class="popin flex flex-col gap-4 justify-center items-center p-6 w-full bg-white rounded-lg shadow-lg transition-transform transform-gpu cursor-pointer dark:bg-slate-800
  hover:-translate-y-1"
                    on:click={() => goto(`/community/${community.name}`)}
                    on:keypress={() => goto(`/community/${community.name}`)}
                >
                    <Avatar
                        user={community}
                        type="community"
                        width={64}
                        thumbnail="48x48"
                    />
                    <div class="flex flex-col items-center">
                        <span class="text-lg font-bold">
                            <Colored>{community.name}</Colored>
                        </span>
                        <span class="text-sm opacity-70">
                            {community.description}
                        </span>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="inline-block">
                            <Icon
                                src={UserGroup}
                                size="20"
                                class="inline-block align-top"
                            />
                            {community.expand['communityCounts(community)'][0]
                                .members}
                        </div>
                        <div class="inline-block">
                            <Icon
                                src={PencilSquare}
                                size="20"
                                class="inline-block align-top"
                            />
                            {community.expand['communityCounts(community)'][0]
                                .posts}
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
