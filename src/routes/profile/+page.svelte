<script lang="ts">
    import { goto } from '$app/navigation'
    import { currentUser, pb } from '$lib/pocketbase'

    function signOut() {
        pb.authStore.clear()
        goto('/')
    }
</script>

<div class="settings-container">
    <h1>Hello, {$currentUser?.username}</h1>
    <button on:click={signOut}>Log Out</button>
</div>

<style>
    .settings-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
    }
</style>
