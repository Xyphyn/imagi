<script lang="ts">
    import { goto } from '$app/navigation'
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import CommentSkeleton from '$lib/skeletons/CommentSkeleton.svelte'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'
    import { Icon, ChatBubbleLeft } from 'svelte-hero-icons'
    import { flip } from 'svelte/animate'
    import Comment from './Comment.svelte'
    import { expoOut } from 'svelte/easing'
    import { ToastType, addToast } from '$lib/toasts/toasts'
    import TextInput from '$lib/custom/TextInput.svelte'

    export let post: PostsResponse<any>

    let submitting = false
    let err: any

    let comments: CommentsResponse<any>[] | undefined
    let newComment = ''

    function comment() {
        if (newComment == '') return
        if (!$currentUser) {
            goto('/login')
            return
        }

        submitting = true

        err = null

        pb.collection('comments')
            .create({
                user: $currentUser!.id,
                content: newComment,
                post: post.id,
            })
            .catch(() => {
                if (pb.authStore.isValid) {
                    addToast(
                        'Error',
                        "Could not comment. Check if you're verified.",
                        ToastType.error
                    )
                } else {
                    addToast(
                        'Error',
                        'Your session has expired. Please log in again',
                        ToastType.error
                    )
                }
                err = true
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

                    case 'update': {
                        if (!comments) {
                            return
                        }
                        const index = comments?.findIndex(
                            (comment) => comment.id == record.id
                        )

                        const comment = comments[index]
                        comment.content = record.content

                        comments[index] = comment
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
</script>

<form
    on:submit|preventDefault={comment}
    class="flex flex-col md:flex-row gap-1 w-full"
>
    <TextInput
        type="text"
        class="flex-auto w-full max-w-none m-0 justify-end md:h-min"
        placeholder="What are you thinking?"
        maxlength={256}
        bind:value={newComment}
        {err}
    />
    <Button
        type="submit"
        class="w-full md:w-min mx-auto items-center justify-center"
        major={true}
        disabled={submitting}
    >
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
    {#each comments as comment (comment.id)}<div
            class="w-full"
            animate:flip={{ duration: 1000, easing: expoOut }}
        >
            <Comment {comment} {post} />
        </div>{/each}
{/if}
