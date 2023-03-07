<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import { pb } from '$lib/pocketbase'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'

    export let post: PostsResponse<any>

    async function fetchComments() {
        const results = await pb
            .collection('comments')
            .getList<CommentsResponse<any>>(1, 50, {
                filter: `post.id = "${post.id}"`,
                expand: 'user',
                sort: '-created',
            })

        return results.items
    }
</script>

<div class="flex flex-row gap-1 w-full">
    <input
        class="w-full flex-[2]"
        type="text"
        placeholder="What are you thinking?"
        maxlength="256"
    />
    <Button class="w-full flex-1" type="submit">Comment</Button>
</div>
{#await fetchComments()}
    <Loader />
{:then comments}
    {#each comments as comment}
        <div class="w-full p-1 flex flex-row gap-2">
            <Avatar user={comment.expand?.user} width={48} />
            <div class="inline-flex flex-col">
                <a
                    class="opacity-30"
                    href={`/user/${comment.expand?.user.username}`}
                    >@{comment.expand?.user.username}</a
                >
                <span>{comment.content}</span>
            </div>
        </div>
    {/each}
{/await}
