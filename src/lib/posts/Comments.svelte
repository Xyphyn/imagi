<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import CommentSkeleton from '$lib/skeletons/CommentSkeleton.svelte'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'
    import {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Transition,
    } from '@rgossiaux/svelte-headlessui'
    import {
        Icon,
        ChatBubbleLeft,
        EllipsisHorizontal,
        Trash,
        Square2Stack,
    } from 'svelte-hero-icons'

    export let post: PostsResponse<any>

    let submitting = false

    let comments: CommentsResponse<any>[] | undefined
    let newComment = ''

    function comment() {
        submitting = true

        pb.collection('comments')
            .create({
                user: $currentUser!.id,
                content: newComment,
                post: post.id,
            })
            .finally(() => (submitting = false))

        newComment = ''
    }

    async function fetchComments(post: PostsResponse<any>) {
        comments = undefined
        pb.collection('comments').unsubscribe('*')

        pb.collection('comments').subscribe<CommentsResponse<any>>(
            `*`,
            async ({ record, action }) => {
                if (record.post != post.id) return

                switch (action) {
                    case 'create': {
                        const user = await pb
                            .collection('users')
                            .getOne(record.user)

                        record.expand = { user }

                        comments = [record, ...comments!]
                        break
                    }
                    case 'delete': {
                        comments = comments?.filter(
                            (comment) => comment.id != record.id
                        )
                        break
                    }
                }
            }
        )

        const results = await pb
            .collection('comments')
            .getList<CommentsResponse<any>>(1, 50, {
                filter: `post.id = "${post.id}"`,
                expand: 'user',
                sort: '-created',
            })

        comments = results.items
        post.expand['postCounts(post)'][0].comments = results.totalItems
    }

    $: fetchComments(post)

    function deleteComment(comment: CommentsResponse<any>) {
        pb.collection('comments').delete(comment.id)
    }

    function copyComment(comment: CommentsResponse<any>) {
        if (typeof navigator.clipboard != 'undefined') {
            navigator.clipboard.writeText(comment.content)
        }
    }
</script>

<form on:submit|preventDefault={comment} class="flex flex-row gap-1 w-full">
    <input
        class="flex-auto w-full"
        type="text"
        placeholder="What are you thinking?"
        maxlength="256"
        bind:value={newComment}
    />
    <Button type="submit" class="w-min" major={true} disabled={submitting}>
        {#if submitting}<Loader width={20} />{:else}<Icon
                src={ChatBubbleLeft}
                size="20"
            />
        {/if}
        Comment
    </Button>
</form>
{#if !comments}
    {#each new Array(post.expand['postCounts(post)'][0].comments) as items}
        <CommentSkeleton />
    {/each}
{:else}
    {#each comments as comment}
        <div class="relative w-full group">
            <div
                class="flex relative flex-row gap-2 items-center p-4 w-full rounded-lg popin box-border bg-slate-100 dark:bg-slate-700"
            >
                <Avatar user={comment.expand?.user} width={48} />
                <div class="inline-flex flex-col w-full">
                    <a
                        class="w-max text-slate-400 dark:text-slate-500"
                        href={`/user/${comment.expand?.user.username}`}
                    >
                        @{comment.expand?.user.username}
                    </a>
                    <span class="border-box break-words">
                        {comment.content}
                    </span>
                </div>
            </div>
            <Menu class="absolute top-0 right-0 m-2 text-left">
                <MenuButton
                    class="opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Button class="gap-0 px-1 py-[2px] -z-10">
                        <Icon size="20" src={EllipsisHorizontal} />
                    </Button>
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="flex absolute right-0 z-20 flex-col gap-2 p-4 mt-2 w-56 bg-white rounded-md shadow-lg origin-top-right dark:bg-slate-800"
                    >
                        <Colored>
                            <h1 class="font-bold">Comment Actions</h1>
                        </Colored>
                        <MenuItem>
                            <Button
                                class="w-full"
                                major={false}
                                onclick={() => {
                                    copyComment(comment)
                                }}
                            >
                                <Icon src={Square2Stack} width="16" />Copy
                            </Button>
                        </MenuItem>
                        {#if comment.user == $currentUser?.id}
                            <MenuItem>
                                <Button
                                    class="w-full"
                                    major={true}
                                    colorType="danger"
                                    onclick={() => deleteComment(comment)}
                                >
                                    <Icon src={Trash} width="16" />Delete
                                </Button>
                            </MenuItem>
                        {/if}
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    {/each}
{/if}
