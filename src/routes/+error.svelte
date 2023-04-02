<script lang="ts">
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import Button from '$lib/Button.svelte'
    import Colored from '$lib/misc/Colored.svelte'
</script>

<div
    class="w-screen h-[calc(100vh-16em)] flex flex-col gap-4 justify-center items-center opacity-100"
>
    <h1 class="text-8xl font-bold">
        <Colored color="error">{$page.status}</Colored>
    </h1>
    <p class="text-3xl">
        <span class="font-bold">
            {$page.status.toString().startsWith('5') ? 'We' : 'You'}
        </span>
        did something wrong.
    </p>
    <code class="bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-md">
        {$page.error?.message}
    </code>
    <Button onclick={() => goto('/')} major>Back to home</Button>
</div>
