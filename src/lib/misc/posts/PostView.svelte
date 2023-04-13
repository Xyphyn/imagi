<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import type {
        CommunitiesResponse,
        PostCountsResponse,
        PostsResponse,
        UsersResponse,
    } from '$lib/backend/schema'
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Comments from '../comments/Comments.svelte'
    import { isVideo } from './util'

    export let open = false
    export let post:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined = undefined
</script>

{#if post}
    <AdvancedModal bind:open>
        <div class="flex flex-col" slot="title">
            <h1 class="text-xl font-bold">{post?.description}</h1>
            <span class="text-base opacity-80">
                {post?.expand?.user.username}
                {#if post?.expand?.community}• {post?.expand?.community
                        .name}{/if}
            </span>
        </div>
        <div class="flex flex-col gap-4 items-center mt-4 w-full">
            {#if isVideo(pb.getFileUrl(post, post?.image))}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video controls loop class="max-w-xl max-h-[80vh] rounded-lg">
                    <source src={pb.getFileUrl(post, post?.image)} />
                </video>
            {:else}
                <img
                    src={pb.getFileUrl(post, post?.image)}
                    alt={post.alt_text || post.description}
                    class="max-w-xl rounded-lg"
                />
            {/if}
            <Comments {post} />
        </div>
    </AdvancedModal>
{/if}
