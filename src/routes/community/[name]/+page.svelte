<script lang="ts">
    import { goto } from '$app/navigation'

    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import FilePicker from '$lib/FilePicker.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostFetch from '$lib/posts/PostFetch.svelte'
    import PostList from '$lib/posts/PostList.svelte'
    import type { CommunitiesResponse } from '$lib/types/pb-types'
    import {
        ArrowUp,
        Calendar,
        Icon,
        PencilSquare,
        UserCircle,
        UserGroup,
    } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'
    import Actionbar from '$lib/Actionbar.svelte'
    import { ToastType, addToast } from '$lib/toasts/toasts'

    export let data: { community: CommunitiesResponse<any> }

    function follow(community: CommunitiesResponse) {
        if (!$currentUser) {
            goto('/login')
        }
        if ($currentUser!.communities.includes(community.id)) {
            $currentUser!.communities = $currentUser!.communities.filter(
                (c: string) => c != community.id
            )
        } else {
            $currentUser!.communities.push(community.id)
        }

        pb.collection('users').update($currentUser!.id, {
            communities: $currentUser!.communities,
        })
    }

    let communitySettings = {
        description: data.community.description,
        image: null,
        updating: false,
    }

    async function updateCommunity() {
        communitySettings.updating = true
        const formData = new FormData()
        formData.append('description', communitySettings.description)
        if (communitySettings.image)
            formData.append('image', communitySettings.image[0])

        pb.collection('communities')
            .update(data.community.id, formData)
            .then(() => {
                addToast(
                    'Success',
                    'Successfully updated community',
                    ToastType.success
                )
            })
            .finally(() => (communitySettings.updating = false))
    }
</script>

<title>Imagi | Community</title>
<Actionbar>
    <div slot="image" class="flex flex-row items-center gap-2 h-full">
        <Avatar
            user={data.community}
            type="community"
            width={36}
            thumbnail="32x32"
        />
        <span class="font-bold text-lg">{data.community.name}</span>
    </div>
    <div class="flex flex-row gap-2" slot="buttons">
        {#if $currentUser}
            <Button
                major={$currentUser.communities.includes(data.community.id)}
                onclick={() => follow(data.community)}
            >
                {#if $currentUser.communities.includes(data.community.id)}
                    Followed
                {:else}
                    Follow
                {/if}
            </Button>
        {/if}
        <Button major onclick={() => window.scrollTo(0, 0)}>
            <Icon src={ArrowUp} size="20" />
        </Button>
    </div>
</Actionbar>
<div
    class="flex md:flex-row flex-col w-full gap-4 justify-center items-center mx-auto"
>
    <div
        class="dark:bg-slate-800 bg-white max-w-xl w-full min-h-[24rem] flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg popin"
    >
        {#if data.community}
            <Avatar user={data.community} type="community" width={128} />

            <h1
                class="text-3xl md:text-4xl font-bold break-words max-w-full text-center"
            >
                <Colored>{data.community.name}</Colored>
            </h1>
            <p class="italic break-words max-w-full text-center">
                {data.community.description}
            </p>
            <div
                class="flex flex-row flex-wrap items-center gap-4 justify-center w-full mx-4"
            >
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={UserGroup} size="20" />
                    {data.community.expand['communityCounts(community)'][0]
                        .members}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={PencilSquare} size="20" />
                    {data.community.expand['communityCounts(community)'][0]
                        .posts}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={Calendar} size="20" />
                    {new Date(data.community.created).toLocaleDateString()}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={UserCircle} size="20" />
                    {#if data.community.expand?.owner}
                        <a
                            href={`/user/${data.community.expand?.owner.username}`}
                            class="link"
                        >
                            @{data.community.expand?.owner.username}
                        </a>
                    {:else}
                        <span>[deleted]</span>
                    {/if}
                </span>
            </div>
            {#if $currentUser}
                <Button
                    major={$currentUser.communities.includes(data.community.id)}
                    onclick={() => follow(data.community)}
                >
                    {#if $currentUser.communities.includes(data.community.id)}
                        Followed
                    {:else}
                        Follow
                    {/if}
                </Button>
            {/if}
        {:else}
            <Loader width={24} />
        {/if}
    </div>
    {#if data.community.owner == $currentUser?.id}
        <div
            class="dark:bg-slate-800 bg-white max-w-xl w-full min-h-[24rem] flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg popin"
        >
            <Colored><h1 class="font-bold text-4xl">Settings</h1></Colored>
            <div>
                <label for="community-description" class="block my-1">
                    Description
                </label>
                <input
                    id="community-description"
                    type="text"
                    placeholder="4-64 characters"
                    maxlength="64"
                    bind:value={communitySettings.description}
                />
            </div>
            <div>
                <label for="community-image-update" class="block my-1">
                    Image
                </label>
                <FilePicker
                    bind:files={communitySettings.image}
                    forId="community-image-update"
                    accept="image/*"
                >
                    Pick an image
                </FilePicker>
            </div>
            <Button
                major
                onclick={updateCommunity}
                disabled={communitySettings.updating}
            >
                {#if communitySettings.updating}<Loader />{/if} Submit
            </Button>
        </div>
    {/if}
</div>
{#if data.community}
    {#key data.community}
        <PostFetch
            let:posts
            let:fetchPosts
            let:hasMore
            let:addPosts
            filter={(record) => record.community == data.community?.id}
            filterString={`community.id = "${data.community.id}"`}
        >
            <PostList {posts} />
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
    {/key}
{/if}
