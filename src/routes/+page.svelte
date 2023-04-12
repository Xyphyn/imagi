<script lang="ts">
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
</script>

<div class="flex flex-col items-center">
    <PostFetch let:posts>
        <PostList {posts} />
    </PostFetch>
</div>
