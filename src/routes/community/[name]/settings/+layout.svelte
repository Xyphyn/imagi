<script lang="ts">
    import { user } from '$lib/backend/pocketbase'
    import type {
        CommunitiesResponse,
        CommunityCountsResponse,
        UsersResponse,
    } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { ChevronLeft, Icon } from 'svelte-hero-icons'

    export let data: {
        community: CommunitiesResponse<{
            'communityCounts(community)': CommunityCountsResponse[]
            owner: UsersResponse
        }>
    }
    //
</script>

<div class="flex flex-col gap-4 mx-auto max-w-4xl">
    <h1
        class="flex flex-row gap-2 items-center py-4 text-3xl font-bold border-b border-black/10 dark:border-white/10"
    >
        <Button
            link
            href="/community/{data.community.name}"
            class="inline-flex font-normal"
        >
            <Icon src={ChevronLeft} size="18" />{data.community.name}
        </Button> Settings
    </h1>
    <div class="flex flex-col gap-8 md:flex-row">
        <nav class="flex sticky top-0 right-0 flex-col gap-2 w-full md:w-64">
            <Button link href="/settings/general">General</Button>
        </nav>
        <div class="flex flex-col gap-8 w-full border-black">
            <slot />
        </div>
    </div>
</div>
