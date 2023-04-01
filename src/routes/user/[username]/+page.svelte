<script lang="ts">
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

    const userParam = $page.params.username

    let err: any

    let user: UsersResponse<any> | undefined
    let comments: CommentsResponse<any>[] | undefined
    let counts: CountsResponse | undefined

    onMount(async () => {
        const results = await pb
            .collection('users')
            .getList<UsersResponse<any>>(1, 1, {
                filter: `username = "${userParam}"`,
                expand: `counts(user)`,
            })

        if (results.items.length == 0) {
            err = 'No user found'
            return
        }
        user = results.items[0]
        counts = user.expand['counts(user)'][0]

        pb.collection('comments')
            .getList<CommentsResponse<any>>(1, 50, {
                filter: `user.id = "${user.id}"`,
                sort: '-created',
                expand: 'user,post',
            })
            .then((results) => (comments = results.items))
    })
</script>

<title>Imagi | User</title>
<div
    class="dark:bg-slate-800 bg-white max-w-xl min-h-[24rem] mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-lg"
>
    {#if err}
        <span>404 - Not found</span>
    {:else if user}
        <Avatar {user} width={128} />
        <h1 class="text-4xl font-bold"><Colored>{user.username}</Colored></h1>
        {#if user.bio}
            <p class="opacity-75">{user.bio}</p>
        {/if}
        <div class="flex flex-row gap-4 justify-center w-full">
            {#if counts}
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={ChatBubbleLeftEllipsis} size="20" />
                    {counts.comments}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={PencilSquare} size="20" />
                    {counts.posts}
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <Icon src={Calendar} size="20" />
                    {new Date(user.created).toLocaleDateString()}
                </span>
            {:else}
                <Loader />
            {/if}
        </div>
        {#if user.role}
            <div class="flex flex-row gap-4 items-center justify-center w-full">
                <span
                    class="bg-gradient-to-r py-2 px-4 font-bold rounded-md from-primary to-secondary text-black capitalize inline-flex flex-row items-center gap-2"
                >
                    <Icon src={Identification} size="20" mini />
                    {user.role}
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
            {#if user}
                <PostFetch
                    let:posts
                    let:fetchPosts
                    let:hasMore
                    let:addPosts
                    filter={(record) => record.user == user?.id}
                    filterString={`user.id = "${user.id}"`}
                >
                    <PostList {posts} />
                    <InfiniteScroll
                        threshold={400}
                        on:loadMore={async () =>
                            addPosts(
                                await fetchPosts(
                                    true,
                                    false,
                                    `user.id = "${user?.id}"`
                                ),
                                false
                            )}
                        window={true}
                        {hasMore}
                    />
                </PostFetch>
            {:else}
                <Loader width={24} />
            {/if}
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
                        <Comment {comment} />
                    </div>
                {/each}
            {/if}
        </TabPanel>
    </TabPanels>
</TabGroup>
