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
        <svg viewBox="0 0 24 24" aria-hidden="true" class="heart"
            ><g
                ><path
                    d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                /></g
            ></svg
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
