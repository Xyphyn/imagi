<script lang="ts">
    import Icon from '$lib/Icon.svelte'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/PostList.svelte'
    import PrettyDate from '$lib/PrettyDate.svelte'
    import type { Post } from '$lib/types/post'
    import UserAvatar from '$lib/UserAvatar.svelte'
    import type { Admin } from 'pocketbase'
    import { onMount } from 'svelte'

    interface ProfileData {
        id: string
    }

    interface Stats {
        comments: number
        posts: number
    }

    let stats: Stats = {
        comments: 0,
        posts: 0,
    }

    export let data: ProfileData

    // The stupid type definitions aren't the same between pb.authStore.model.
    let user: any
    let error: any

    let posts: Post[]

    onMount(async () => {
        user = await pb
            .collection('users')
            .getOne(data.id)
            .catch((err) => {
                error = err
            })

        const results = await pb.collection('posts').getList<Post>(1, 50, {
            sort: '-created',
            filter: `user.id = "${user.id}"`,
            expand: 'user',
        })

        stats.comments = (
            await pb
                .collection('comments')
                .getFullList({ filter: `user.id = "${user.id}"` })
        ).length

        posts = results.items
        stats.posts = results.totalItems
    })
</script>

<div class="container">
    {#if error}
        <p>There is no user with that id.</p>
    {:else if user}
        <UserAvatar {user} width={128} />
        <h1>{user.username}</h1>
        <span>Joined <PrettyDate unformattedDate={user.created} /></span>
        <div class="stats">
            <span><Icon icon="message" /> {stats.posts}</span>
            <span><Icon icon="comment" /> {stats.comments}</span>
        </div>

        <h1>{user.username}'s posts</h1>
        <div class="postlist-container">
            <PostList {posts} />
        </div>
    {:else}
        <Loader />
    {/if}
</div>

<style>
    .stats {
        display: flex;
        margin: 1rem;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    span {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25rem;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .postlist-container {
        width: 100%;
    }
</style>
