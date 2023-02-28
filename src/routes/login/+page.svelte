<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'

    let username: string
    let password: string
    let files: any = undefined
    let loading = false
    let signup: boolean = false

    let checks: any = {
        rules: false,
        ip: false,
    }

    async function login() {
        loading = true
        const user = await pb
            .collection('users')
            .authWithPassword(username, password)
        loading = false
    }

    async function signUp() {
        try {
            loading = true

            const data = new FormData()
            data.append('username', username)
            data.append('password', password)
            data.append('passwordConfirm', password)
            if (username == undefined || password == undefined) {
                loading = false
                return
            }
            if (files) {
                data.append('avatar', files[0])
            }

            const createdUser = await pb.collection('users').create(data)
            await login()
            loading = false
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
    <h1>{signup ? 'Sign Up' : 'Log In'}</h1>
    {#if loading}
        <Loader />
    {/if}
    <p>Your password must have at least 8 characters, and at most 72.</p>
    {#if $currentUser}
        <p class="login-form">
            Signed in as {$currentUser.username}
            <button on:click={signOut}>Sign Out</button>
            <button on:click={redirect}>Main Page</button>
        </p>
    {:else if signup}
        <form on:submit|preventDefault={signUp} class="login-form">
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
            <label for="checkbox-rules" class="check"
                >I will not spam, or harass others.
                <input
                    id="checkbox-rules"
                    type="checkbox"
                    bind:checked={checks.rules}
                /><span class="custom-check" /></label
            >
            <label for="checkbox-ip" class="check"
                >If I do, my IP will be made public.<input
                    id="checkbox-ip"
                    type="checkbox"
                    bind:checked={checks.ip}
                /><span class="custom-check" /></label
            >
            <button
                class={`button-major ${
                    checks.ip && checks.rules ? '' : 'disabled'
                }`}
                type="submit">Sign Up</button
            >
            <p>
                Already have an account?
                <button on:click={() => (signup = false)}>Login</button>
            </p>
        </form>
    {:else}
        <form on:submit|preventDefault={login} class="login-form">
            <input placeholder="Username" type="text" bind:value={username} />

            <input
                placeholder="Password"
                type="password"
                bind:value={password}
            />
            <button type="submit" class="button-major">Login</button>
            <p>
                Don't have an account? <button on:click={() => (signup = true)}
                    >Sign Up</button
                >
            </p>
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

    .disabled {
        opacity: 0.6;
        pointer-events: none;
        cursor: not-allowed;
    }

    .check {
        border: 1px solid var(--accent-color);
        padding: 0.5rem 0.65rem;
        border-radius: var(--border-radius);
        font-size: 14px;
    }

    p {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
</style>
