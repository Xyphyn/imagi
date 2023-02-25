<script lang="ts">
    import { goto } from '$app/navigation'
    import { currentUser, pb } from '$lib/pocketbase'

    let username: string
    let password: string

    async function login() {
        const user = await pb
            .collection('users')
            .authWithPassword(username, password)
    }

    async function signUp() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password,
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
            <button on:click={signUp}>Sign Up</button>
            <button on:click={login}>Login</button>
        </form>
    {/if}
</div>

<style>
    .container {
        width: 100%;
        height: 100vh;
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
