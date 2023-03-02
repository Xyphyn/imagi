<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/PostList.svelte'
    import type { Community, Post } from '$lib/types/post'
    import { onDestroy, onMount } from 'svelte'
    import { getFile, showToast } from '../../app'

    interface LoadData {
        name: string
    }

    export let data: LoadData

    const name = data.name
    let community: Community

    let error: any

    let posts: Post[]

    let formData: any = {
        files: undefined,
        loading: false,
    }

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

    function changeCommunityAvatar() {
        const data = new FormData()
        data.append('image', formData.files[0])

        pb.collection('communities')
            .update(community.id, data)
            .then(() => {
                showToast(
                    'Success!',
                    'Successfully updated the community profile photo. You may need to refresh to see changes.',
                    'success'
                )
            })
    }
</script>

<div class="community-container">
    {#if !community}
        <Loader />
    {:else if error}
        <span>No community exists with that name.</span>
    {:else}
        <img
            src={getFile(community, false)}
            alt={community.name.substring(0, 1)}
            width={128}
            style="border-radius: 100%;"
        />
        <span class="title">{name}</span>
        <span>{community.description}</span>
        {#if community.owner == $currentUser?.id}
            <div class="management">
                <form
                    on:submit|preventDefault={changeCommunityAvatar}
                    class="form"
                >
                    <p>Change Community Picture</p>
                    <label for="community-upload" class="custom-file-upload">
                        {#if formData.files}
                            <span
                                style="max-width: 24ch; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                                >{formData.files[0].name}</span
                            >
                        {:else}
                            Pick an image
                        {/if}
                        <input
                            id="community-upload"
                            placeholder="Image"
                            type="file"
                            accept="image/*"
                            bind:files={formData.files}
                        />
                    </label>

                    <button type="submit"
                        >Upload
                        {#if formData.loading}
                            <Loader size={16} />
                        {/if}</button
                    >
                </form>
            </div>
        {/if}
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
        gap: 1rem;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        background-color: var(--card-color);
        padding: 1rem;
        border-radius: var(--border-radius);
    }

    .posts {
        width: 100%;
    }

    .title {
        font-size: 36px;
        font-weight: bold;
    }
</style>
