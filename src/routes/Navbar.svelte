<script lang="ts">
    // @ts-nocheck
    import { goto } from '$app/navigation'
    import { currentUser, pb } from '$lib/pocketbase'
    import UploadView from '$lib/views/UploadView.svelte'

    let uploading: boolean = false

    function getProfilePicture() {
        const firstFilename = $currentUser!.avatar
        let url = pb.getFileUrl($currentUser!, firstFilename, {
            thumb: '256x256',
        })
        return url
    }

    function uploadDialog() {
        if (!$currentUser?.id) {
            goto('/login')
        }
        uploading = true
    }
</script>

<nav>
    <h1 class="logo" on:click={() => goto('/')} on:keypress={() => goto('/')}>
        <img
            src="/imagi.svg"
            class="logo-image"
            title="Yes, I stole the Jetbrains logo. If this ever gets popular I'll make my own."
            alt="Imagi logo"
        />
        Imagi
    </h1>
    <button on:click={uploadDialog} class="button-major">Post</button>
    {#if !$currentUser?.id}<button on:click={() => goto('/login')}>Login</button
        >
    {:else}
        <img
            src={getProfilePicture()}
            alt="Profile"
            class="profile"
            on:click={() => goto('/profile')}
            on:keypress={() => goto('/profile')}
        />
    {/if}
</nav>
<UploadView bind:uploading />

<style>
    nav {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: center;

        height: 4rem;
        gap: 1rem;
        margin: 1rem;
        background-color: var(--background-color);
        position: sticky;
        z-index: 1;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-right: auto;
    }

    .logo-image {
        width: 48px;
    }

    .logo:hover {
        cursor: pointer;
    }

    .profile {
        border-radius: 100%;
        width: 48px;
        aspect-ratio: 1/1;
        object-fit: cover;
        transition: all 250ms;
    }

    .profile:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }
</style>
