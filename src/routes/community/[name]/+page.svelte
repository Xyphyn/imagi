<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommunitiesResponse,
        type CommunityCountsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import CommunityAvatar from '$lib/ui/profile/CommunityAvatar.svelte'
    import { Calendar, Icon, PencilSquare, UserGroup } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'

    export let data: {
        community: CommunitiesResponse<{
            'communityCounts(community)': CommunityCountsResponse[]
            owner: UsersResponse
        }>
    }

    let submitting = false

    const following: (communities: string[]) => boolean = (c) =>
        c.includes(data.community.id)

    async function follow() {
        if (!$user) {
            goto('/login')
            return
        }

        submitting = true

        const refreshedCommunities = await pb
            .collection(Collections.Users)
            .getOne<UsersResponse>($user.id)

        $user.communities = refreshedCommunities.communities

        if (following($user?.communities || [])) {
            await pb.collection(Collections.Users).update($user.id, {
                communities: $user?.communities.filter(
                    (c: string) => c != data.community.id
                ),
            })

            $user.communities = $user?.communities.filter(
                (c: string) => c != data.community.id
            )
        } else {
            await pb.collection(Collections.Users).update($user.id, {
                communities: [data.community.id, ...$user?.communities],
            })

            $user.communities = [data.community.id, ...$user.communities]
        }

        submitting = false
    }
    //
</script>

<title>{data.community.name}</title>
<div
    class="flex flex-col gap-4 justify-center items-center p-8 mx-auto max-w-xl max-h-48 bg-white rounded-lg shadow-lg animate-popIn dark:bg-zinc-900"
>
    <div class="flex flex-row gap-4 items-center self-start">
        <CommunityAvatar
            community={data.community}
            width={64}
            thumb="128x128"
        />
        <div class="flex flex-col">
            <span class="text-xl font-bold">{data.community.name}</span>
            {#if data.community.description}
                <span class="text-sm">{data.community.description}</span>
            {/if}
        </div>
    </div>
    <div
        class="flex flex-row flex-wrap gap-4 justify-center self-start w-full opacity-90 sm:justify-start"
    >
        <div class="flex flex-row gap-1 items-center">
            <Icon src={Calendar} mini size="18" />
            {new Date(data.community.created).toLocaleDateString()}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={PencilSquare} mini size="18" />
            {data.community.expand?.['communityCounts(community)'][0].posts}
        </div>
        <div class="flex flex-row gap-1 items-center">
            <Icon src={UserGroup} size="18" />
            {data.community.expand?.['communityCounts(community)'][0].members}
        </div>
        <div class="flex flex-row gap-2 sm:ml-auto">
            {#if data.community.owner == $user?.id}
                <Button
                    class="justify-self-end h-9 w-[6rem] justify-center flex-shrink"
                    link
                    href="/community/{data.community.name}/settings/general"
                    color={Color.ghost}
                >
                    Settings
                </Button>
            {/if}
            <Button
                class="justify-self-end h-9 w-[6rem] justify-center flex-shrink"
                loading={submitting}
                disabled={submitting}
                color={following($user?.communities || []) || submitting
                    ? Color.accent
                    : Color.ghost}
                onclick={follow}
            >
                {following($user?.communities || []) ? 'Following' : 'Follow'}
            </Button>
        </div>
    </div>
</div>

<PostFetch
    let:posts
    let:fetchPosts
    let:hasMore
    let:addPosts
    filter={(record) => record.community == data.community?.id}
    filterString={`community.id = "${data.community.id}"`}
>
    <div class="flex flex-col items-center mt-4">
        <PostList grid={$userSettings.grid} {posts} />
    </div>
    <InfiniteScroll
        threshold={800}
        on:loadMore={async () =>
            addPosts(
                await fetchPosts(
                    true,
                    false,
                    `community.id = "${data.community?.id}"`
                ),
                false
            )}
        window={true}
        {hasMore}
    />
</PostFetch>
