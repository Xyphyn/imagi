<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import nprogress from 'nprogress'
    import type { Community, Post } from '$lib/types/post'
    import { page } from '$app/stores'
    import { getFile, isVideo, showToast } from './app'
    import PostView from '$lib/views/PostView.svelte'
    import Loader from '$lib/Loader.svelte'
    import PostList from '$lib/PostList.svelte'
    import { goto } from '$app/navigation'

    let pageNumber = 0

    interface ModalData {
        uploading: boolean
        expandedView: boolean
        expandedPost: Post | undefined
        expandedImage: string
        err: any
        loading: boolean
    }

    let modalData: ModalData = {
        uploading: false,
        expandedView: false,
        expandedPost: undefined,
        expandedImage: '',
        err: undefined,
        loading: false,
    }

    type Sort = 'created' | 'following'

    let sort: Sort = 'created'

    let posts: Post[] = []
    let communities: Community[] = []
    let unsubscribe: () => void

    async function getPage(increment: boolean | undefined) {
        if (increment == true) {
            pageNumber++
        } else if (increment == false) {
            if (pageNumber > 1) {
                pageNumber--
            } else {
                return
            }
        }

        nprogress.start()

        let filterString = ''

        if ($currentUser?.communities) {
            filterString = $currentUser?.communities
                .map((community: Community) => `community.id = "${community}"`)
                .join(' || ')
        }

        const resultList = await pb
            .collection('posts')
            .getList<Post>(pageNumber, 50, {
                sort: `-created`,
                filter: sort == 'following' ? filterString : '',
                expand: 'user, community',
            })

        if (Math.ceil(resultList.totalItems / 50) < pageNumber) {
            pageNumber = Math.ceil(resultList.totalItems / 50)
        }

        if (pageNumber <= 0) {
            pageNumber = 1
        }

        posts = resultList.items

        nprogress.done()
    }

    onMount(async () => {
        getPage(true)

        unsubscribe = await pb
            .collection('posts')
            .subscribe<Post>('*', async ({ action, record }) => {
                if (action === 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)

                    const community = await pb
                        .collection('communities')
                        .getOne(record.community)

                    record.expand = { user, community }
                    posts = [record, ...posts]
                }
                if (action === 'delete') {
                    posts = posts.filter((post) => post.id !== record.id)
                }
            })

        if ($currentUser) {
            pb.collection('users')
                .getOne($currentUser!.id, {
                    expand: 'communities',
                })
                .then((data) => {
                    const coms: any = data.expand?.communities
                    communities = coms
                })
        }

        onDestroy(() => {
            unsubscribe?.()
        })
    })

    if ($page.url.searchParams.has('post')) {
        const postParam = $page.url.searchParams.get('post')?.toString()!

        pb.collection('posts')
            .getOne<Post>(postParam, { expand: 'user' })
            .then((p) => expandView(p))
            .catch((err) => {})
    }

    function expandView(post: Post) {
        modalData.err = undefined

        $page.url.searchParams.set('post', post.id)

        if (typeof window != 'undefined') {
            history.pushState(null, '', $page.url.href)
        }

        if (post != modalData.expandedPost) {
            modalData.expandedPost = post

            modalData.expandedImage = getFile(post, true)

            modalData.loading = true
        }
        modalData.expandedView = true
        modalData.uploading = false
    }

    showToast('Beta', 'Try the new Imagi at https://v2.xylight.us!', 'info')
</script>

<title>Imagi</title>
<div class="container">
    <div class="actions">
        <div class="sorts">
            <button
                on:click={() => {
                    sort = 'created'
                    getPage(undefined)
                }}
                class={`${sort == 'created' ? 'button-major' : ''}`}
                >Recent</button
            >
            {#if currentUser}
                <button
                    on:click={() => {
                        if (!$currentUser) goto('/login')
                        sort = 'following'
                        getPage(undefined)
                    }}
                    class={`${sort == 'following' ? 'button-major' : ''}`}
                    >Following</button
                >
            {/if}
        </div>
        {#if sort == 'following'}
            <h1>Followed Communities</h1>
            <div class="communities">
                {#each communities as community}
                    <div class="community">
                        <img
                            src={getFile(community, false)}
                            alt={community.name.substring(0, 1)}
                            class="profile-image"
                            width={48}
                        />
                        <a href={`/community/${community.name}`}
                            >{community.name}</a
                        >
                    </div>
                {/each}
            </div>
        {/if}
        <h1>
            {#if sort == 'following'}Followed Posts{:else if sort == 'created'}Recent
                Posts{/if}
        </h1>
    </div>

    <PostList {posts} />
    <div class="navigation">
        <button on:click={() => getPage(false)}>Back</button>
        {pageNumber}
        <button on:click={() => getPage(true)}>Next</button>
    </div>
</div>

<style>
    .communities {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: auto;
        gap: 1rem;
    }

    .community {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .navigation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .container {
        margin: 2rem;
    }

    .sorts {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .button-major:hover {
        background-color: var(--accent-color);
        color: var(--background-color);
    }
</style>
