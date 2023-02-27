<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    let loading = false
    let files: any = undefined

    function signOut() {
        pb.authStore.clear()
        goto('/')
    }

    function changeProfile() {
        console.log('uploading')
        if (files == undefined) {
            console.log('empty')
            return
        }
        pb.cancelAllRequests()

        const dataArray = new FormData()
        dataArray.append('avatar', files![0])

        loading = true
        pb.collection('users')
            .update($currentUser!.id, dataArray)
            .catch((err) => {
                loading = false
            })
            .then(() => {
                files = undefined
                loading = false
            })
    }
</script>

<div class="settings-container">
    <h1>Hello, {$currentUser?.username}</h1>
    <button on:click={signOut}>Log Out</button>
    <form on:submit|preventDefault={changeProfile} class="upload-form">
        <p>Change Profile Picture</p>
        <label for="profile-upload" class="custom-file-upload">
            {#if files}
                <span
                    style="max-width: 24ch; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                    >{files[0].name}</span
                >
            {:else}
                Pick an image
            {/if}
            <input
                id="profile-upload"
                placeholder="Image"
                type="file"
                accept="image/*"
                bind:files
            />
        </label>

        <button type="submit"
            >Upload
            {#if loading}
                <Loader />
            {/if}</button
        >
    </form>
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
    .upload-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1rem;
        background-color: var(--card-color);
        padding: 2rem;
        margin: 1rem;
        border-radius: var(--border-radius);
    }
</style>
