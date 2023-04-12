<script lang="ts">
    import PostFetch from '$lib/misc/posts/PostFetch.svelte'
    import PostList from '$lib/misc/posts/PostList.svelte'
    import Button from '$lib/ui/Button.svelte'
    import Modal from '$lib/ui/Modal.svelte'
    import { Color } from '$lib/ui/colors'
</script>

<div class="flex flex-col items-center">
    <PostFetch let:posts>
        <PostList {posts} />
    </PostFetch>
</div>
