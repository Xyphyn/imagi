<script lang="ts">
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import InfiniteScroll from 'svelte-infinite-scroll'
    import { userSettings } from '$lib/settings'
</script>

<div class="flex flex-col gap-4 items-center">
    <span class="self-start text-3xl font-bold">Posts</span>
    <PostFetch let:posts let:fetchPosts let:hasMore let:addPosts>
        <PostList grid={$userSettings.grid} {posts} />
        <InfiniteScroll
            threshold={800}
            on:loadMore={async () =>
                addPosts(await fetchPosts(true, false), false)}
            window={true}
            {hasMore}
        />
    </PostFetch>
</div>
