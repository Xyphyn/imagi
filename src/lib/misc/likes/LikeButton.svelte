<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommunitiesResponse,
        type LikesRecord,
        type LikesResponse,
        type PostCountsResponse,
        type PostsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import { Color } from '$lib/ui/colors'
    import DotsLoad from '$lib/ui/loaders/DotsLoad.svelte'
    import { onDestroy, onMount } from 'svelte'
    import { user } from '$lib/backend/pocketbase'
    import { Heart, Icon } from 'svelte-hero-icons'
    import Button from '$lib/ui/Button.svelte'

    let likes = 0
    let userLike: LikesResponse | undefined

    export let post:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined

    let unsubscribe: () => any

    onMount(async () => {
        unsubscribe = await pb
            .collection(Collections.Likes)
            .subscribe<LikesResponse>('*', async ({ record, action }) => {
                if (record.post != post?.id) return

                switch (action) {
                    case 'create': {
                        likes++
                        if (post.expand?.['postCounts(post)'][0]?.likes)
                            post.expand['postCounts(post)'][0].likes++

                        break
                    }

                    case 'delete': {
                        likes--
                        if (post.expand?.['postCounts(post)'][0]?.likes)
                            post.expand['postCounts(post)'][0].likes--

                        break
                    }
                }
            })
    })

    onDestroy(() => {
        unsubscribe?.()
    })

    async function fetchLikes() {
        likes = post?.expand?.['postCounts(post)'][0]?.likes || 0

        likes = await pb
            .collection(Collections.Likes)
            .getList(1, 1, { filter: `post.id = "${post?.id}"` })
            .then((results) => results.totalItems)

        if ($user)
            userLike = await pb
                .collection(Collections.Likes)
                .getFirstListItem<LikesResponse>(
                    `post.id = "${post?.id}" && user.id = "${$user?.id}"`
                )
                .catch((err) => undefined)
    }

    let prevId: string

    $: {
        if (post?.id != prevId) {
            prevId = post!.id
            fetchLikes()
        }
    }

    let submitting = false

    async function like() {
        if (!$user) return
        submitting = true

        if (!userLike) {
            const like = await pb
                .collection(Collections.Likes)
                .create<LikesResponse>({
                    user: $user.id,
                    post: post?.id,
                })

            userLike = like
        } else {
            await pb.collection(Collections.Likes).delete(userLike.id)

            userLike = undefined
        }

        submitting = false
    }
</script>

<Button
    class="h-9 items-center justify-center w-[3rem] gap-2 {submitting
        ? 'border-black dark:border-white border'
        : ''}"
    color={userLike ? Color.accent : Color.secondary}
    loading={submitting}
    disabled={submitting}
    onclick={() => like()}
>
    <div class="flex flex-row justify-self-center self-center">
        <Icon src={Heart} mini size="18" class="mx-1 align-bottom" />
        <span class="leading-[18px] text-sm">{likes}</span>
    </div>
</Button>
