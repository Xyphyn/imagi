<script lang="ts">
    import { goto } from '$app/navigation'

    // @ts-ignore
    import Avatar from '$lib/Avatar.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
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
<div class="flex flex-col box-border items-center m-4">
    <h1 class="text-4xl font-bold md:self-start"><Colored>Explore</Colored></h1>
    <span class="self-start mt-4">New Users</span>
    <div
        class="h-12 flex flex-row min-w-[100%] overflow-x-auto gap-4 self-start"
    >
        {#if !users}
            <Loader />
        {:else}
            {#each users as user}
                <div class="flex flex-row items-center gap-2 flex-shrink-0">
                    <Avatar {user} width={32} />
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
            <Loader />
        {:else}
            {#each communities as community}
                <div
                    class="rounded-lg bg-slate-50 dark:bg-slate-800 shadow-lg flex flex-row
                    p-6 w-full cursor-pointer hover:-translate-y-1 transition-transform transform-gpu gap-4 items-center justify-center"
                    on:click={() => goto(`/community/${community.name}`)}
                    on:keypress={() => goto(`/community/${community.name}`)}
                >
                    <Avatar user={community} type="community" width={48} />
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
