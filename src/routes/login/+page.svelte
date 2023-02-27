<script lang="ts">
    import { goto } from '$app/navigation'
    import { currentUser, pb } from '$lib/pocketbase'

    let username: string
    let password: string
    let files: any = undefined

    async function login() {
        const user = await pb
            .collection('users')
            .authWithPassword(username, password)
    }

    async function signUp() {
        try {
            const data = new FormData()
            data.append('username', username)
            data.append('password', password)
            data.append('passwordConfirm', password)
            if (files) {
                data.append('avatar', files[0])
            }

            const createdUser = await pb.collection('users').create(data)
            await login()
        } catch (err) {
            console.error(err)
        }
    }

    function signOut() {
        pb.authStore.clear()
    }

    function redirect() {
        goto('/')
    }
</script>

<div class="container">
    <h1>Log In</h1>
    <p>Your password must have at least 8 characters, and at most 72.</p>
    {#if $currentUser}
        <p class="login-form">
            Signed in as {$currentUser.username}
            <button on:click={signOut}>Sign Out</button>
            <button on:click={redirect}>Main Page</button>
        </p>
    {:else}
        <form on:submit|preventDefault class="login-form">
            <input placeholder="Username" type="text" bind:value={username} />

            <input
                placeholder="Password"
                type="password"
                bind:value={password}
            />
            <label for="profile-upload" class="custom-file-upload">
                {#if files}
                    <span
                        style="max-width: 24ch; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                        >{files[0].name}</span
                    >
                {:else}
                    Avatar (optional)
                {/if}
                <input
                    id="profile-upload"
                    placeholder="Image"
                    type="file"
                    accept="image/*"
                    bind:files
                />
            </label>
            <button on:click={signUp}>Sign Up</button>
            <button on:click={login}>Login</button>
        </form>
    {/if}
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
