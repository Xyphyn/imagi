<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import type { Community } from '$lib/types/post'
    import type { User } from '$lib/types/user'
    import UserAvatar from '$lib/UserAvatar.svelte'
    import CommunityView from '$lib/views/CommunityView.svelte'
    import { onDestroy, onMount } from 'svelte'
    import { getFile } from '../app'

    let users: User[] = []
    let communities: Community[] = []

    let creating: boolean = false

    let userUnsubscribe: () => void = () => {}
    let communityUnsubscribe: () => void = () => {}

    onMount(async () => {
        pb.collection('users')
            .getList<User>(1, 30, { sort: '-created' })
            .then((data) => {
                users = data.items
            })

        pb.collection('communities')
            .getList<Community>(1, 30, { sort: '-created' })
            .then((data) => {
                communities = data.items
            })

        userUnsubscribe = await pb
            .collection('users')
            .subscribe<User>('*', ({ action, record }) => {
                if (action == 'create') {
                    users = [record, ...users]
                }
            })

        communityUnsubscribe = await pb
            .collection('communities')
            .subscribe<Community>('*', ({ action, record }) => {
                if (action == 'create') {
                    communities = [record, ...communities]
                }
            })
    })

    onDestroy(() => {
        userUnsubscribe()
        communityUnsubscribe()
    })
</script>

<div class="container">
    <h1>New Users</h1>
    <div class="users">
        {#if users.length == 0}
            <Loader />
        {/if}
        {#each users as user}
            <div class="user">
                <UserAvatar {user} />
                <a href={`/profile/${user.id}`}>{user.username}</a>
            </div>
        {/each}
    </div>
    <h1 style="display: flex; flex-direction: row; gap: 1rem;">
        New Communities <button on:click={() => (creating = true)}
            >Create</button
        >
    </h1>
    <div class="communities">
        {#if communities.length == 0}
            <Loader />
        {/if}
        {#each communities as community}
            <div
                class="community"
                on:click={() => goto(`/community/${community.name}`)}
                on:keypress={() => goto(`/community/${community.name}`)}
            >
                <img
                    src={getFile(community, false)}
                    alt={community.name.substring(0, 1)}
                    width={48}
                    style="background-color: var(--card-color); border-radius: 100%;"
                />
                <div class="community-content">
                    <span class="community-name">{community.name}</span>
                    <span class="community-description"
                        >{community.description}</span
                    >
                </div>
            </div>
        {/each}
    </div>
</div>
<CommunityView bind:expanded={creating} />

<style>
    .community {
        background-color: var(--card-color);
        min-width: 12rem;
        padding: 2rem;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .community-content {
        display: flex;
        flex-direction: column;
    }

    .community:hover {
        transform: translateY(-10px);
        cursor: pointer;
    }

    .community-name {
        font-size: 16px;
        font-weight: bold;
    }

    .communities {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(324px, 2fr));
        grid-auto-flow: dense;
        transition: grid-template-columns 250ms;
        width: 100%;
        gap: 1rem;
    }

    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        margin: 1rem;
    }

    .users {
        width: 100%;
        height: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        gap: 1rem;
        overflow: auto;
    }
</style>
