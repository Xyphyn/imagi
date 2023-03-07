<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Loader from '$lib/Loader.svelte'
    import Live from '$lib/misc/Live.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { flip } from 'svelte/animate'

    export let post: PostsResponse<any>
    let prevPost: PostsResponse<any>

    let submitting = false

    let comments: CommentsResponse<any>[] | undefined
    let newComment = ''

    onMount(async () => {
        const results = await pb
            .collection('comments')
            .getList<CommentsResponse<any>>(1, 50, {
                filter: `post.id = "${post.id}"`,
                expand: 'user',
                sort: '-created',
            })

        comments = results.items
    })

    function comment() {
        submitting = true

        pb.collection('comments')
            .create({
                user: $currentUser!.id,
                content: newComment,
                post: post.id,
            })
            .then(() => (submitting = false))
            .catch(() => (submitting = false))

        newComment = ''
    }

    $: {
        if (post != prevPost) {
            comments = undefined
            prevPost = post
            pb.collection('comments')
                .getList<CommentsResponse<any>>(1, 50, {
                    filter: `post.id = "${post.id}"`,
                    expand: 'user',
                    sort: '-created',
                })
                .then((data) => {
                    comments = data.items
                })

            pb.collection('comments').unsubscribe('*')

            pb.collection('comments').subscribe<CommentsResponse<any>>(
                `*`,
                async ({ record, action }) => {
                    if (record.post != post.id) return

                    if (action == 'create') {
                        const user = await pb
                            .collection('users')
                            .getOne(record.user)

                        record.expand = { user }

                        comments = [record, ...comments!]
                    }

                    if (action == 'delete') {
                        comments = comments?.filter(
                            (comment) => comment.id != record.id
                        )
                    }
                }
            )
        }
    }
</script>

<form on:submit|preventDefault={comment} class="flex flex-row gap-1 w-full">
    <input
        class="w-full flex-[2]"
        type="text"
        placeholder="What are you thinking?"
        maxlength="256"
        bind:value={newComment}
    />
    <Button type="submit" class="w-full flex-1" major={true}
        >Comment {#if submitting}<Loader color="#fff" size={14} />{/if}</Button
    >
</form>
{#if !comments}
    <Loader />
{:else}
    <div class="self-start">
        <Live />
    </div>
    {#each comments as comment (comment.id)}
        <div class="w-full p-1 flex flex-row gap-2 popin box-border">
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
{/if}
