<script lang="ts">
    interface FormData {
        email: string
        username: string
        password: string
        images: FileList | null
        checks: FormChecks
    }

    interface FormChecks {
        rules: boolean
        notice: boolean
    }

    let formData: FormData = {
        email: '',
        username: '',
        password: '',
        images: null,
        checks: {
            rules: false,
            notice: false,
        },
    }

    let signingUp: boolean = true

    function signUp() {}

    function login() {}
</script>

{#if signingUp}
    <form
        on:submit={signUp}
        class="bg-slate-200 dark:bg-slate-800 rounded-lg shadow-xl max-w-xl p-4 py-16 mx-auto my-auto m-4 flex flex-col items-center gap-2"
    >
        <h1 class="text-xl font-bold">Sign Up</h1>
        <div>
            <label for="email" class="block my-1">Email</label>
            <input
                id="email"
                type="text"
                bind:value={formData.email}
                maxlength="128"
                placeholder="you@example.com"
            />
        </div>
        <div>
            <label for="username" class="block my-1">Username</label>
            <input
                id="username"
                type="text"
                bind:value={formData.username}
                maxlength="128"
                placeholder="Example"
            />
        </div>
    </form>
{:else}{/if}
