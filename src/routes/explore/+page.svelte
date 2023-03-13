<script lang="ts">
    import { goto } from '$app/navigation'

    // @ts-ignore
    import Avatar from '$lib/Avatar.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import RowSkeleton from '$lib/skeletons/RowSkeleton.svelte'
    import type {
        CommunitiesResponse,
        UsersResponse,
    } from '$lib/types/pb-types'
    import { onMount } from 'svelte'

    let users: UsersResponse[] | undefined
    let communities: CommunitiesResponse[] | undefined

    onMount(async () => {
        pb.collection('users')
            .getList<UsersResponse>(1, 40, { sort: '-created' })
            .then((data) => {
                users = data.items
            })

        pb.collection('communities')
            .getList<CommunitiesResponse>(1, 40, { sort: '-created' })
            .then((data) => {
                communities = data.items
            })
    })
</script>

<title>Imagi | Explore</title>
<div class="flex flex-col box-border items-center p-4">
    <h1 class="text-4xl font-bold md:self-start"><Colored>Explore</Colored></h1>
    <span class="self-start mt-4">New Users</span>
    <div class="flex flex-row gap-4 overflow-auto h-12 self-start box-border">
        {#if !users}
            <div class="flex flex-row items-center gap-2 flex-shrink-0 h-8">
                <div
                    class="w-8 h-8 rounded-full animate-pulse bg-white dark:bg-slate-700"
                />
                <div
                    class="w-24 h-8 animate-pulse bg-white dark:bg-slate-700 rounded-full"
                />
            </div>
        {:else}
            {#each users as user}
                <div class="flex flex-row items-center gap-2 flex-shrink-0">
                    <Avatar {user} width={32} thumbnail="32x32" />
                    <a href={`/user/${user.username}`}>{user.username}</a>
                </div>
            {/each}
        {/if}
    </div>
    <span class="self-start mt-4">New Communities</span>
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full mt-4"
    >
        {#if !communities}
            <RowSkeleton />
        {:else}
            {#each communities as community}
                <div
                    class="rounded-lg bg-white dark:bg-slate-800 shadow-lg flex flex-row
                    p-6 w-full cursor-pointer hover:-translate-y-1 transition-transform transform-gpu gap-4 items-center justify-center"
                    on:click={() => goto(`/community/${community.name}`)}
                    on:keypress={() => goto(`/community/${community.name}`)}
                >
                    <Avatar
                        user={community}
                        type="community"
                        width={48}
                        thumbnail="48x48"
                    />
                    <div class="flex flex-col">
                        <span class="font-bold text-lg"
                            ><Colored>{community.name}</Colored></span
                        >
                        <span class="opacity-70 text-sm"
                            >{community.description}</span
                        >
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
