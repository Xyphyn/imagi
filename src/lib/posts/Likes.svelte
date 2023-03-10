<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import type { LikesResponse, PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { Icon, Heart } from 'svelte-hero-icons'

    export let post: PostsResponse<any>
    let prevPost: PostsResponse<any>

    let likes: LikesResponse<any>[] | undefined
    let userLike: LikesResponse<any> | undefined

    onMount(async () => {
        const results = await pb
            .collection('comments')
            .getFullList<LikesResponse<any>>({
                filter: `post.id = "${post.id}"`,
                expand: 'user',
            })

        likes = results
        userLike = likes.find((like) => like.user == $currentUser?.id)
    })

    function like() {
        if (!$currentUser) {
            goto('/login')
        }

        if (!userLike) {
            pb.collection('likes')
                .create<LikesResponse<any>>({
                    user: $currentUser!.id,
                    post: post.id,
                })
                .then((like) => (userLike = like))
        } else {
            pb.collection('likes').delete(userLike.id)
            userLike = undefined
        }
    }

    $: {
        if (post != prevPost) {
            likes = undefined
            prevPost = post
            pb.collection('likes')
                .getFullList<LikesResponse<any>>({
                    filter: `post.id = "${post.id}"`,
                })
                .then((data) => {
                    likes = data
                    userLike = likes.find(
                        (like) => like.user == $currentUser?.id
                    )
                })

            pb.collection('likes').unsubscribe('*')

            pb.collection('likes').subscribe<LikesResponse<any>>(
                `*`,
                async ({ record, action }) => {
                    if (record.post != post.id) return

                    if (action == 'create') {
                        likes = [record, ...likes!]
                    }

                    if (action == 'delete') {
                        likes = likes?.filter((like) => like.id != record.id)
                    }
                }
            )
        }
    }
</script>

<Button major={userLike != undefined} onclick={like}>
    <div class="flex flex-row gap-1 items-center">
        <Icon mini={true} src={Heart} size="20" />
        {likes?.length ?? 0}
    </div>
</Button>
