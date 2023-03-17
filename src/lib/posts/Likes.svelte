<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostSkeleton from '$lib/skeletons/PostSkeleton.svelte'
    import type {
        LikesResponse,
        PostCountsResponse,
        PostsResponse,
    } from '$lib/types/pb-types'
    import { Icon, Heart } from 'svelte-hero-icons'

    export let post: PostsResponse<any>

    let likes: number = 0
    let userLike: LikesResponse<any> | undefined = undefined

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

    async function fetchLikes(post: PostsResponse<any>) {
        likes = post.expand['postCounts(post)'][0].likes
        userLike = undefined

        pb.collection('likes')
            .getList<LikesResponse<any>>(1, 1, {
                filter: `user.id = "${$currentUser?.id}" && post.id = "${post.id}"`,
            })
            .then((likes) => (userLike = likes.items[0]))

        pb.collection('likes').unsubscribe('*')

        pb.collection('likes').subscribe<LikesResponse<any>>(
            `*`,
            async ({ record, action }) => {
                if (record.post != post.id) return

                switch (action) {
                    case 'create':
                        likes++
                        post.expand['postCounts(post)'][0].likes++
                        break
                    case 'delete':
                        likes--
                        post.expand['postCounts(post)'][0].likes--
                        break
                }
            }
        )

        const counts = await pb
            .collection('postCounts')
            .getOne<PostCountsResponse>(post.id)
        likes = counts.likes!
    }

    $: fetchLikes(post)
</script>

<Button major={userLike != undefined} onclick={like}>
    <div class="flex flex-row gap-1 items-center">
        <Icon mini={true} src={Heart} size="20" />
        {likes}
    </div>
</Button>
