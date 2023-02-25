<script lang="ts">
    import { onMount } from 'svelte'
    import type { Post } from '$lib/types/post'
    import { currentUser, pb } from '$lib/pocketbase'
    import Loader from './Loader.svelte'
    import { goto } from '$app/navigation'

    export let post: Post

    let comments: any[] | undefined
    let newComment = ''
    let submitting: boolean = false

    async function getComments(post: Post) {
        const resultList = await pb.collection('comments').getList(1, 50, {
            filter: `post.id = "${post.id}"`,
            expand: 'user',
            sort: '-created',
        })

        comments = resultList.items

        pb.collection('comments').subscribe('*', async ({ action, record }) => {
            if (record.post != post.id) return

            if (action == 'create') {
                const user = await pb.collection('users').getOne(record.user)

                record.expand = { user }
                comments = [record, ...comments!]
            }

            if (action == 'delete') {
                comments = comments!.filter(
                    (comment) => comment.id != record.id
                )
            }
        })
    }

    $: {
        pb.collection('comments').unsubscribe('*')
        comments = undefined
        getComments(post)
    }

    function comment() {
        if (!$currentUser) {
            goto('/login')
        }

        if (newComment == '') {
            return
        }

        submitting = true
        pb.cancelAllRequests()

        pb.collection('comments')
            .create({
                user: $currentUser!.id,
                post: post.id,
                content: newComment,
            })
            .catch((err) => {
                console.log(err)
                submitting = false
            })
            .then(() => {
                submitting = false
                newComment = ''
            })
    }
</script>

<div class="comments">
    <form on:submit|preventDefault={comment} class="comment-form">
        <input
            placeholder="Comment"
            type="text"
            maxlength="256"
            class="comment-text"
            bind:value={newComment}
        />
        <button type="submit" class="comment-submit"
            >Submit {#if submitting}<Loader />{/if}</button
        >
    </form>
    {#if comments}
        {#each comments as comment}
            <div class="comment">
                <p class="username">@{comment.expand?.user.username}</p>
                <p>{comment.content}</p>
            </div>
        {/each}
    {:else}
        <Loader />
    {/if}
</div>

<style>
    .comment-text {
        width: 100%;
    }

    .comment-submit {
        width: 100%;
    }

    .comment-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        gap: 12px;
        margin-top: 12px;
    }

    @media screen and (min-width: 640px) {
        .comment-form {
            flex-direction: row;
        }
        .comment-submit {
            width: 25%;
        }
        .comment-text {
            width: 75%;
        }
    }

    .username {
        opacity: 0.4;
    }

    .comments {
        display: flex;
        flex-direction: column;
        color: white;
        width: 80%;
        padding: 2rem;
        box-sizing: border-box;
        gap: 1rem;
    }

    .comment {
        display: flex;
        padding: 1rem;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
    }

    p {
        padding: 0;
        margin: 0;
    }
</style>
