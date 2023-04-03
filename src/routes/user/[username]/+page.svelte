<script lang="ts">
    import { afterNavigate } from '$app/navigation'
    import { page } from '$app/stores'
    import Avatar from '$lib/Avatar.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { pb } from '$lib/pocketbase'
    import Comment from '$lib/posts/Comment.svelte'
    import PostFetch from '$lib/posts/PostFetch.svelte'
    import PostList from '$lib/posts/PostList.svelte'
    import type {
        CommentsResponse,
        CountsResponse,
        PostsResponse,
        UsersResponse,
    } from '$lib/types/pb-types'
    import {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { onMount } from 'svelte'
    import {
        Calendar,
        ChatBubbleLeft,
        ChatBubbleLeftEllipsis,
        Icon,
        Identification,
        PencilSquare,
        RocketLaunch,
    } from 'svelte-hero-icons'
    import InfiniteScroll from 'svelte-infinite-scroll'

    let err: any

    export let data

    let comments: CommentsResponse<any>[] | undefined = undefined

    afterNavigate(async () => {
        comments = await pb
            .collection('comments')
            .getList<CommentsResponse<any>>(1, 50, {
                sort: '-created',
                expand: 'user, post',
                filter: `user.id = "${data.user.id}"`,
            })
            .then((data) => data.items)
    })
</script>

<title>Imagi | User</title>
<div
    class="dark:bg-slate-800 bg-white max-w-xl min-h-[24rem] mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg popin"
>
    {#if err}
        <span>404 - Not found</span>
    {:else if data.user}
        <Avatar user={data.user} width={128} />
        <h1 class="text-4xl font-bold">
            <Colored>{data.user.username}</Colored>
        </h1>
        {#if data.user.bio}
            <p class="opacity-75">{data.user.bio}</p>
        {/if}
        <div class="flex flex-row gap-4 justify-center w-full">
            {#if data.user}
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={ChatBubbleLeftEllipsis} size="20" />
                    {data.user?.expand['counts(user)'][0].comments}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={PencilSquare} size="20" />
                    {data.user?.expand['counts(user)'][0].posts}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={Calendar} size="20" />
                    {new Date(data.user.created).toLocaleDateString()}
                </span>
            {:else}
                <Loader />
            {/if}
        </div>
        {#if data.user.role}
            <div class="flex flex-row gap-4 items-center justify-center w-full">
                <span
                    class="bg-gradient-to-r py-2 px-4 font-bold rounded-md from-primary to-secondary text-black capitalize inline-flex flex-row items-center gap-2"
                >
                    <Icon src={Identification} size="20" mini />
                    {data.user.role}
                </span>
            </div>
        {/if}
    {:else}
        <Loader width={24} />
    {/if}
</div>
<TabGroup>
    <TabList class="flex flex-row gap-4 w-full max-w-xl mx-auto m-4 mb-0">
        <Tab
            class={({ selected }) =>
                `flex-1 flex flex-row items-center justify-center gap-2 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            <Icon src={PencilSquare} size="24" class="float-left" />Posts
        </Tab>
        <Tab
            class={({ selected }) =>
                `flex-1 flex flex-row items-center justify-center gap-2 rounded-md p-3 bg-white dark:bg-slate-800 shadow-sm ${
                    selected
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : ''
                }`}
        >
            <Icon src={ChatBubbleLeft} size="24" /> Comments
        </Tab>
    </TabList>
    <TabPanels>
        <TabPanel>
            {#key data.user}
                <PostFetch
                    let:posts
                    let:fetchPosts
                    let:hasMore
                    let:addPosts
                    filter={(record) => record.user == data.user?.id}
                    filterString={`user.id = "${data.user.id}"`}
                >
                    <PostList {posts} />
                    <InfiniteScroll
                        threshold={400}
                        on:loadMore={async () =>
                            addPosts(
                                await fetchPosts(
                                    true,
                                    false,
                                    `user.id = "${data.user?.id}"`
                                ),
                                false
                            )}
                        window={true}
                        {hasMore}
                    />
                </PostFetch>
            {/key}
        </TabPanel>
        <TabPanel class="flex flex-col gap-4 flex-1 max-w-xl mx-auto mt-2">
            {#if comments}
                {#each comments as comment (comment.id)}
                    <div>
                        <a
                            href={`/post/${comment.expand?.post.id}`}
                            class="font-bold text-xl"
                        >
                            {comment.expand?.post.description}
                        </a>
                        <Comment {comment} post={comment.expand?.post} />
                    </div>
                {/each}
            {/if}
        </TabPanel>
    </TabPanels>
</TabGroup>
