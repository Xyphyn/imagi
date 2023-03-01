<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/PostList.svelte'
    import type { Community, Post } from '$lib/types/post'
    import { onDestroy, onMount } from 'svelte'

    interface LoadData {
        name: string
    }

    export let data: LoadData

    const name = data.name
    let community: Community

    let error: any

    let posts: Post[]

    let unsubscribe = () => {}

    onMount(async () => {
        const results = await pb
            .collection('communities')
            .getList<Community>(1, 1, { filter: `name = "${name}"` })

        if (results.totalItems == 0) {
            error = 'No community'
            return
        }

        community = results.items[0]

        posts = (
            await pb.collection('posts').getList<Post>(1, 50, {
                filter: `community.id = "${community.id}"`,
                expand: 'user',
            })
        ).items

        unsubscribe = await pb
            .collection('posts')
            .subscribe<Post>('*', async ({ action, record }) => {
                if (record.community != community.id) return

                if (action === 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)

                    record.expand = { user }
                    posts = [record, ...posts]
                }

                if (action === 'delete') {
                    posts = posts.filter((post) => post.id !== record.id)
                }
            })
    })

    onDestroy(() => {
        unsubscribe()
    })

    function follow() {
        if (!$currentUser) {
            goto('/login')
        }

        let newCommunities: any[] = $currentUser?.communities

        if ($currentUser!.communities.includes(community.id)) {
            newCommunities = newCommunities.filter((c) => c != community.id)
        } else {
            newCommunities.push(community.id)
        }

        pb.collection('users')
            .update($currentUser!.id, {
                communities: newCommunities,
            })
            .then(() => {})
    }
</script>

<div class="community-container">
    <h1>{name}</h1>
    {#if !community}
        <Loader />
    {:else if error}
        <span>No community exists with that name.</span>
    {:else}
        <span>{community.description}</span>
        <button
            on:click={follow}
            class={`${
                $currentUser?.communities.includes(community.id)
                    ? 'button-major'
                    : ''
            }`}
            >{#if $currentUser?.communities.includes(community.id)}
                Followed
            {:else}
                Follow
            {/if}</button
        >
        <h1>Posts</h1>
        <div class="posts">
            <PostList {posts} />
        </div>
    {/if}
</div>

<style>
    .community-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .posts {
        width: 100%;
    }
</style>
