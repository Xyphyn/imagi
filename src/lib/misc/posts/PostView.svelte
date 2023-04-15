<script lang="ts">
    import { goto } from '$app/navigation'
    import { pb, user } from '$lib/backend/pocketbase'
    import {
        Collections,
        type CommunitiesResponse,
        type PostCountsResponse,
        type PostsResponse,
        type UsersResponse,
    } from '$lib/backend/schema'
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'
    import Button from '$lib/ui/Button.svelte'
    import Menu from '$lib/ui/menus/Menu.svelte'
    import {
        ChatBubbleLeftEllipsis,
        ChatBubbleOvalLeftEllipsis,
        EllipsisHorizontal,
        Icon,
        Square2Stack,
        Trash,
    } from 'svelte-hero-icons'
    import Comments from '../comments/Comments.svelte'
    import { isVideo } from './util'
    import LikeButton from '../likes/LikeButton.svelte'
    import { Color } from '$lib/ui/colors'
    import MenuButton from '$lib/ui/menus/MenuButton.svelte'
    import { page } from '$app/stores'
    import RelativeDate from '../RelativeDate.svelte'

    export let open = false
    export let post:
        | PostsResponse<{
              user: UsersResponse
              community: CommunitiesResponse
              'postCounts(post)': PostCountsResponse[]
          }>
        | undefined = undefined

    let deleting = false
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
            <div class="flex flex-row gap-2 items-center w-full">
                <!-- <div class="flex flex-row gap-1 items-center">
                    <Icon src={ChatBubbleOvalLeftEllipsis} size="18" mini />
                    {post.expand?.['postCounts(post)'][0].comments}
                </div> -->
                <div class="mr-auto text-sm opacity-50">
                    <RelativeDate date={post.created} />
                </div>
                <LikeButton {post} />
                <Menu itemsClass="bg-slate-100 dark:bg-zinc-800">
                    <Button color={Color.ghost} slot="button" class="h-9">
                        <Icon src={EllipsisHorizontal} size="18" mini />
                    </Button>
                    <MenuButton
                        onclick={() =>
                            navigator.clipboard.writeText(
                                `${$page.url.protocol}//${$page.url.hostname}/post/${post?.id}`
                            )}
                    >
                        <Icon src={Square2Stack} size="18" />
                        Copy Link
                    </MenuButton>
                    {#if post && post.user == $user?.id}
                        <MenuButton
                            onclick={async () => {
                                if (!post) return
                                deleting = true
                                await pb
                                    .collection(Collections.Posts)
                                    .delete(post.id)
                                deleting = false
                            }}
                            color={Color.dangerSecondary}
                        >
                            <Icon src={Trash} mini size="18" />
                            Delete
                        </MenuButton>
                    {/if}
                </Menu>
            </div>
            <Comments {post} />
        </div>
    </AdvancedModal>
{/if}
