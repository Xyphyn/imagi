<script lang="ts">
    import { goto } from '$app/navigation'
    import { currentUser } from '$lib/pocketbase'

    function uploadDialog() {}
</script>

<nav>
    <h1 class="logo">
        <img
            src="/imagi.svg"
            class="logo-image"
            title="Yes, I stole the Jetbrains logo. If this ever gets popular I'll make my own."
            alt="Imagi logo"
        />
        Imagi
    </h1>
    <button on:click={uploadDialog}>Upload</button>
    {#if !$currentUser?.id}<button on:click={() => goto('/login')}>Login</button
        >
    {:else}
        Logged in
    {/if}
</nav>

<style>
    nav {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: center;

        height: 4rem;
        gap: 1rem;
        margin: 1rem;
    }

    .logo {
        display: flex;
        align-items: center;
        margin-right: auto;
    }

    .logo-image {
        width: 64px;
    }
</style>
