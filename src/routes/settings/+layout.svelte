<script>
    import { user } from '$lib/backend/pocketbase'
    import Button from '$lib/ui/Button.svelte'
    import { _ } from 'svelte-i18n'
</script>

<div class="flex flex-col gap-4 mx-auto max-w-4xl">
    <h1
        class="py-4 text-3xl font-bold border-b border-black/10 dark:border-white/10"
    >
        {$_('settings.userSettings')}
    </h1>
    <div class="flex flex-col gap-8 md:flex-row">
        <nav class="flex sticky top-0 right-0 flex-col gap-2 w-full md:w-64">
            <Button link href="/settings/general">
                {$_('settings.general.name')}
            </Button>
            {#if $user}
                <Button link href="/settings/account">
                    {$_('settings.account.name')}
                </Button>
            {/if}
        </nav>
        <div class="flex flex-col gap-8 w-full border-black">
            <slot />
        </div>
    </div>
</div>
