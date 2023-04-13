<script lang="ts">
    import type { CountsResponse, UsersResponse } from '$lib/backend/schema'
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import Avatar from '$lib/ui/profile/Avatar.svelte'
    import {
        Calendar,
        ChatBubbleLeft,
        ChatBubbleOvalLeft,
        Icon,
        PencilSquare,
        User,
    } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'
    import { userSettings } from '$lib/settings'

    export let data: {
        user: UsersResponse<{ 'counts(user)': CountsResponse[] }>
    }
    //
</script>

<title>{data.user.username}</title>
<div
    class="flex flex-col gap-4 justify-center items-center p-8 mx-auto max-w-xl max-h-48 bg-white rounded-lg shadow-lg dark:bg-slate-800"
>
    <div class="flex flex-row gap-4 items-center self-start">
        <Avatar user={data.user} width={64} thumb="128x128" />
        <div class="flex flex-col">
            <span class="text-xl font-bold">{data.user.username}</span>
            {#if data.user.bio}
                <span class="text-sm">{data.user.bio}</span>
            {/if}
        </div>
    </div>
    <div class="flex flex-row gap-4 self-start opacity-90">
        <div class="flex flex-row gap-1 items-center">
            <Icon src={Calendar} mini size="18" />
            {new Date(data.user.created).toLocaleDateString()}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={PencilSquare} mini size="18" />
            {data.user.expand?.['counts(user)'][0].posts}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={ChatBubbleOvalLeft} size="18" />
            {data.user.expand?.['counts(user)'][0].comments}
        </div>
        {#if data.user.role}
            <div class="flex flex-row gap-1 items-center">
                <Icon src={User} size="18" />
                <span class="capitalize">{data.user.role}</span>
            </div>
        {/if}
    </div>
</div>

<div class="pt-4" />
<PostFetch
    let:posts
    let:fetchPosts
    let:hasMore
    let:addPosts
    filter={(record) => record.user == data.user?.id}
    filterString={`user.id = "${data.user.id}"`}
>
    <div class="flex flex-col items-center">
        <PostList grid={$userSettings.grid} {posts} />
    </div>
    <InfiniteScroll
        threshold={800}
        on:loadMore={async () =>
            addPosts(
                await fetchPosts(true, false, `user.id = "${data.user?.id}"`),
                false
            )}
        window={true}
        {hasMore}
    />
</PostFetch>
