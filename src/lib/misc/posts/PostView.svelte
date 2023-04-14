<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb } from '$lib/backend/pocketbase'
    import type {
        CommunitiesResponse,
        PostCountsResponse,
        PostsResponse,
        UsersResponse,
    } from '$lib/backend/schema'
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Button from '$lib/ui/Button.svelte'
    import Menu from '$lib/ui/menus/Menu.svelte'
    import {
        ChatBubbleLeftEllipsis,
        ChatBubbleOvalLeftEllipsis,
        EllipsisHorizontal,
        Icon,
    } from 'svelte-hero-icons'
    import Comments from '../comments/Comments.svelte'
    import { isVideo } from './util'
    import LikeButton from '../likes/LikeButton.svelte'

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
                <button
                    on:click={() =>
                        goto(`/user/${post?.expand?.user.username}`)}
                    class="transition-colors hover:text-sky-500"
                >
                    {post?.expand?.user.username}
                </button>

                {#if post?.expand?.community}
                    <button
                        on:click={() =>
                            goto(`/community/${post?.expand?.community.name}`)}
                        class="transition-colors hover:text-sky-500"
                    >
                        • {post?.expand?.community.name}
                    </button>
                {/if}
            </span>
        </div>
        <div class="flex flex-col gap-4 items-center mt-4 w-full">
            {#if isVideo(pb.getFileUrl(post, post?.image))}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video
                    controls
                    loop
                    class="max-w-xl max-h-[80vh] rounded-lg w-full"
                >
                    <source src={pb.getFileUrl(post, post?.image)} />
                </video>
            {:else}
                <img
                    src={pb.getFileUrl(post, post?.image)}
                    alt={post.alt_text || post.description}
                    class="w-full max-w-xl rounded-lg"
                    width={400}
                    height={200}
                />
            {/if}
            <Comments {post} />
        </div>
    </AdvancedModal>
{/if}
