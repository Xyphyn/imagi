<script lang="ts">
    import { user } from '$lib/backend/pocketbase'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import TextInput from '$lib/ui/input/TextInput.svelte'

    export let formData = {
        email: $user?.email,
    }
</script>

<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="text-xl font-bold">Email</h1>
        <p class="text-sm opacity-70">Your account email for logging in.</p>
    </div>
    <div
        class="flex flex-row gap-2 justify-between items-center px-8 py-4 w-full dark:bg-zinc-800 bg-slate-100"
    >
        <TextInput
            class="w-full max-w-[18rem] h-10"
            bind:value={formData.email}
            placeholder="Email"
        />
        <Button color={Color.accent} class="justify-center w-32 h-10">
            Save
        </Button>
    </div>
</div>
