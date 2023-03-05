<script lang="ts">
    import { pb } from '$lib/pocketbase'
    import type { PostsResponse, UsersRecord } from '../types/pb-types'

    export let post: PostsResponse<UsersRecord>
</script>

<div
    class="bg-slate-50 shadow-xl aspect-square rounded-lg hover:-translate-y-2 transition-transform ease-out duration-250 cursor-pointer"
>
    <img
        src={pb.getFileUrl(post, post.image, { thumb: '128x128' })}
        alt={post.description}
        class="w-full h-full object-cover rounded-lg"
    />
</div>
