<script lang="ts">
    import { pb, user } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommentsRecord,
        type CommentsResponse,
        type CommunitiesResponse,
        type PostCountsResponse,
        type PostsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import Button from '$lib/ui/Button.svelte'
    import { Color } from '$lib/ui/colors'
    import TextInput from '$lib/ui/input/TextInput.svelte'
    import Menu from '$lib/ui/menus/Menu.svelte'
    import MenuButton from '$lib/ui/menus/MenuButton.svelte'
    import Avatar from '$lib/ui/profile/Avatar.svelte'
    import { onDestroy, onMount } from 'svelte'
    import {
        EllipsisHorizontal,
        Icon,
        Square2Stack,
        Trash,
    } from 'svelte-hero-icons'
    import { flip } from 'svelte/animate'
    import { expoInOut } from 'svelte/easing'
    import RelativeDate from '../RelativeDate.svelte'

    export let post:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined

    let comments: CommentsResponse<{ user: UsersResponse }>[] | undefined

    let unsubscribe: () => any

    async function fetchComments() {
        err = null
        if (!post) return

        const results = await pb
            .collection(Collections.Comments)
            .getList<CommentsResponse<{ user: UsersResponse }>>(1, 50, {
                sort: '-created',
                filter: `post.id = "${post.id}"`,
                expand: 'user',
            })

        comments = results.items

        if (!post.expand) return

        post.expand['postCounts(post)'][0].comments = results.totalItems
    }

    onMount(async () => {
        unsubscribe = await pb
            .collection(Collections.Comments)
            .subscribe<CommentsResponse>('*', async ({ record, action }) => {
                if (record.post != post?.id) return

                switch (action) {
                    case 'create': {
                        const expanded = await pb
                            .collection(Collections.Comments)
                            .getOne<CommentsResponse<{ user: UsersResponse }>>(
                                record.id,
                                {
                                    expand: 'user',
                                }
                            )

                        comments = [expanded, ...comments!]
                        break
                    }

                    case 'delete': {
                        comments = comments?.filter(
                            (comment) => comment.id != record.id
                        )
                        break
                    }
                }
            })
    })

    onDestroy(() => {
        unsubscribe?.()
    })

    let prevId: string

    $: {
        if (post?.id != prevId) {
            prevId = post!.id
            fetchComments()
        }
    }

    let newComment = ''
    let submitting = false
    let err: any

    async function comment() {
        err = null
        if (!$user || !post || newComment == '' || submitting) return
        submitting = true

        try {
            await pb.collection(Collections.Comments).create<CommentsRecord>({
                user: $user!.id,
                content: newComment,
                post: post!.id,
            })

            newComment = ''
        } catch (error) {
            err = error
        }

        submitting = false
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
                    color={err ? Color.danger : Color.accent}
                    class="justify-center self-end w-24 h-9"
                    loading={submitting}
                    disabled={submitting}
                    submit
                >
                    Comment
                </Button>
            </div>
        </div>
    </form>
{/if}
<div class="flex flex-col gap-2 w-full">
    {#if comments}
        {#each comments as comment (comment.id)}
            <div
                class="flex relative flex-row gap-2 items-start p-4 rounded-md dark:bg-zinc-800 bg-zinc-100"
                animate:flip={{ duration: 750, easing: expoInOut }}
            >
                <Menu class="absolute top-0 right-0 z-20 m-2" absolute>
                    <Button slot="button" class="-z-10">
                        <Icon src={EllipsisHorizontal} size="16" mini />
                    </Button>
                    <MenuButton
                        onclick={() =>
                            navigator.clipboard.writeText(comment.content)}
                    >
                        <Icon src={Square2Stack} size="16" mini />
                        Copy Text
                    </MenuButton>
                    {#if comment.user == $user?.id}
                        <MenuButton
                            onclick={() =>
                                pb
                                    .collection(Collections.Comments)
                                    .delete(comment.id)}
                            color={Color.dangerSecondary}
                        >
                            <Icon src={Trash} size="16" mini />
                            Delete
                        </MenuButton>
                    {/if}
                </Menu>
                <Avatar width={36} user={comment.expand?.user} thumb="32x32" />
                <div class="flex flex-col items-start">
                    <span class="flex flex-row gap-1 text-xs opacity-75">
                        <span>{comment.expand?.user.username}</span>
                        • <RelativeDate date={comment.created} />
                    </span>
                    <span class="text-sm">
                        {comment.content}
                    </span>
                </div>
            </div>
        {/each}
    {/if}
</div>
