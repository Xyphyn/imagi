<script lang="ts">
    import { goto } from '$app/navigation'
    import type { Post } from '$lib/types/post'
    import { currentUser, pb } from './pocketbase'

    export let post: Post
    let prevPost: Post

    let likes: number = 0
    let liked: boolean = false
    let likeObject: any = undefined

    async function fetchLikes(post: Post) {
        const list = await pb
            .collection('likes')
            .getFullList({ filter: `post.id = "${post.id}"` })

        likes = list.length

        likeObject = list.find((post) => post.user == $currentUser?.id)

        if (likeObject != undefined) {
            liked = true
        } else {
            liked = false
        }

        pb.collection('likes').subscribe('*', async ({ action, record }) => {
            if (record.post != post.id) return

            if (action == 'create') {
                likes++
            }

            if (action == 'delete') {
                likes--
            }
        })
    }

    function like() {
        if (!$currentUser) {
            goto('/login')
        }

        liked = !liked
        pb.cancelAllRequests()

        if (liked) {
            pb.collection('likes')
                .create({
                    user: $currentUser?.id,
                    post: post.id,
                })
                .then((record) => {
                    likeObject = record
                })
        } else {
            if (likeObject) {
                pb.collection('likes').delete(likeObject.id)
            }
        }
    }

    $: {
        if (post != prevPost) {
            pb.collection('likes').unsubscribe('*')
            prevPost = post
            likes = 0
            liked = false
            fetchLikes(post)
        }
    }
</script>

<div class="likes">
    <button
        on:click={like}
        class="like-button"
        style={`--selected: ${
            liked ? `var(--accent-color)` : `transparent`
        }; --purple: ${liked ? `#fff` : `var(--accent-color)`}`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="heart"
            ><path
                d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
            /></svg
        >
        {likes}
    </button>
</div>

<style>
    .like-button {
        background-color: var(--selected);
        border: none;
        gap: 0.25rem;
    }

    .like-button:hover {
        background-color: var(--selected);
        color: var(--purple);
    }

    .like-button:hover .heart {
        fill: var(--purple);
    }

    .heart {
        transition: fill 250ms;
        width: 16px;
        fill: var(--text-color);
    }

    .likes {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 4px;
    }
</style>
