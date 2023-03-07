<script lang="ts">
    // @ts-ignore
    import Avatar from '$lib/Avatar.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import type { UsersResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'

    let users: UsersResponse[] | undefined

    onMount(async () => {
        pb.collection('users')
            .getList<UsersResponse>(1, 40, { sort: '-created' })
            .then((data) => {
                users = data.items
            })
    })
</script>

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
</div>
