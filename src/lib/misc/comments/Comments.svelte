<script lang="ts">
    import { pb, user } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommentsResponse,
        type CommunitiesResponse,
        type PostCountsResponse,
        type PostsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import Avatar from '$lib/ui/profile/Avatar.svelte'

    export let post:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined

    let comments: CommentsResponse<{ user: UsersResponse }>[] | undefined

    async function fetchComments() {
        if (!post) return

        const results = await pb
            .collection(Collections.Comments)
            .getList<CommentsResponse<{ user: UsersResponse }>>(1, 50, {
                sort: '-created',
                filter: `post.id = "${post.id}"`,
            })

        comments = results.items
        if (!post.expand) return

        post.expand['postCounts(post)'][0].comments = results.totalItems
    }

    $: if (post) fetchComments()

    let newComment = ''
    let submitting = false

    async function comment() {
        submitting = true
    }
</script>

{#if $user}
    <form
        on:submit|preventDefault={comment}
        class="flex flex-row gap-2 items-start w-full"
    >
        <div class="mt-1.5">
            <Avatar user={$user} width={32} thumb="32x32" />
        </div>
        <div class="flex flex-col gap-2 w-full">
            <TextInput
                placeholder="What are you thinking?"
                bind:value={newComment}
            />
            <div class="flex flex-row gap-2 self-end">
                <Button
                    color={Color.secondary}
                    class="self-end {newComment == '' ? 'hidden' : ''}"
                    onclick={() => (newComment = '')}
                >
                    Cancel
                </Button>
                <Button
                    color={Color.accent}
                    class="justify-center self-end w-24 h-10"
                    loading={submitting}
                    disabled={submitting}
                >
                    Comment
                </Button>
            </div>
        </div>
    </form>
{/if}
<div class="flex flex-col w-full">
    {#if comments}
        {#each comments as comment}
            <div>{comment.content}</div>
        {/each}
    {/if}
</div>
