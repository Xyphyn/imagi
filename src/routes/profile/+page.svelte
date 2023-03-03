<script lang="ts">
    //@ts-nocheck
    import { goto, invalidate } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/PostList.svelte'
    import type { Post } from '$lib/types/post'
    import { onMount } from 'svelte'
    import { showToast } from '../app'
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from '@rgossiaux/svelte-headlessui'
    let loading = false
    let files: any = undefined
    let posts: Post[]

    let deleting: any = {
        modal: false,
        confirmation: '',
    }

    let email: string

    let color: string

    onMount(async () => {
        const results = await pb.collection('posts').getList<Post>(1, 50, {
            sort: '-created',
            expand: 'user',
            filter: `user.id = "${$currentUser?.id}"`,
        })

        posts = results.items
    })

    function signOut() {
        pb.authStore.clear()
        goto('/')
    }

    function changeProfile() {
        if (files == undefined) {
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

    function deleteAccount() {
        if (
            deleting.confirmation !=
            `Please, delete my account: ${$currentUser?.username}`
        )
            return

        pb.collection('users')
            .delete($currentUser?.id!)
            .then(() => {
                goto('/')
            })
    }

    function changeEmail() {
        pb.collection('users')
            .requestEmailChange(email)
            .then(() => {
                showToast(
                    'Success',
                    'Email updated successfully. Check your email for a verification link. You will need to log back in.',
                    'success'
                )
                pb.collection('users').requestVerification(email)
            })
            .catch((err) => {
                showToast(
                    'Error',
                    'Could not update your email. Is it valid? It may be already taken.',
                    'error'
                )
            })
    }
</script>

<title>Imagi | Profile</title>
<div class="settings-container">
    <h1>Hello, {$currentUser?.username}</h1>
    <button on:click={signOut}>Log Out</button>
    <div class="settings">
        <form on:submit|preventDefault={changeProfile} class="form">
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
                    <Loader size={16} />
                {/if}</button
            >
        </form>
        <form on:submit|preventDefault={changeEmail} class="form">
            <p>Change Email</p>
            <input
                placeholder="New Email"
                type="text"
                accept="image/*"
                bind:value={email}
            />

            <button type="submit">Change</button>
        </form>
        <div class="delete-account form">
            <p>Delete Account</p>
            <button on:click={() => (deleting.modal = true)}
                >Delete
                {#if loading}
                    <Loader size={16} />
                {/if}</button
            >
        </div>

        <div class="form">
            <p>Choose Accent Color</p>
            <input type="color" bind:value={color} />
            <button
                on:click={() => {
                    localStorage.setItem('color', color)
                    const r = document
                        .querySelector(':root')
                        .style.setProperty('--accent-color', color)
                }}>Change</button
            >
            <button on:click={() => localStorage.removeItem('color')}
                >Reset</button
            >
        </div>
    </div>
    <h1>Your Posts</h1>
    <div class="postlist">
        <PostList {posts} />
    </div>
</div>
<Modal bind:expanded={deleting.modal} fullHeight={false}>
    <h1>Delete Account</h1>
    <p>
        This action is <b>permanent.</b> If you are sure, type
        <b>Please, delete my account: {$currentUser?.username}</b> (case sensitive)
        to confirm.
    </p>
    <p>This will delete all of your posts, comments, and ratings.</p>
    <input
        type="text"
        placeholder="Confirm"
        bind:value={deleting.confirmation}
    />
    <button on:click={deleteAccount}>Rip and tear!!!</button>
</Modal>

<style>
    .settings {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    @media screen and (min-width: 640px) {
        .settings {
            flex-direction: row;
            align-items: center;
        }
    }

    .settings-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
    }

    .form {
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

    .postlist {
        width: 100%;
    }
</style>
