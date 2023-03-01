<script lang="ts">
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import UserAvatar from '$lib/UserAvatar.svelte'
    import { onMount } from 'svelte'
    import { getFile, getProfilePicture } from '../app'

    let users: any = []

    onMount(async () => {
        users = (
            await pb.collection('users').getList(1, 20, { sort: '-created' })
        ).items
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
</div>

<style>
    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        box-sizing: border-box;
    }

    .users {
        width: 100vw;
        height: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        gap: 1rem;
        overflow: auto;
    }
</style>
