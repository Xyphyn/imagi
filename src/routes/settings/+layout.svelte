<script>
    import { user } from '$lib/backend/pocketbase'
    import Button from '$lib/ui/Button.svelte'
</script>

<div class="flex flex-col gap-4 mx-auto max-w-4xl">
    <h1
        class="py-4 text-3xl font-bold border-b border-black/10 dark:border-white/10"
    >
        User Settings
    </h1>
    <div class="flex flex-col gap-8 md:flex-row">
        <nav class="flex flex-col gap-2 w-48">
            <Button link href="/settings/general">General</Button>
            {#if $user}
                <Button link href="/settings/account">Account</Button>
            {/if}
        </nav>
        <div class="flex flex-col gap-8 w-full border-black">
            <slot />
        </div>
    </div>
</div>
