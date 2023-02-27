<script lang="ts">
    import { goto } from '$app/navigation'
    import type { Post } from '$lib/types/post'
    import { currentUser, pb } from './pocketbase'
    import Fa from 'svelte-fa'
    import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

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
        }; --purple: ${
            liked ? `var(--background-color)` : `var(--accent-color)`
        }`}
    >
        <Fa icon={faHeart} class="heart" />
        {likes}
    </button>
</div>

<style>
    .like-button {
        font-size: inherit;
        background-color: var(--selected);
        border: none;
        gap: 0.25rem;
    }

    .like-button:hover {
        background-color: var(--selected);
        color: var(--purple);
    }

    .likes {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 4px;
    }
</style>
