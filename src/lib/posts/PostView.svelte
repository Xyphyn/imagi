<script lang="ts">
    import Comments from '$lib/posts/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { openPost } from '../../stores'
    import Likes from './Likes.svelte'
    import {
        EllipsisHorizontal,
        Icon,
        ArrowDownTray,
        Trash,
        Square2Stack,
    } from 'svelte-hero-icons'
    import {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Transition,
    } from '@rgossiaux/svelte-headlessui'
    import Button from '$lib/Button.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    let loading = true

    let prevPost: PostsResponse<any>

    let image: string = ''

    openPost.subscribe((post) => {
        if (prevPost != post && post != undefined) {
            image = ''
            loading = true
            prevPost = post
            image = pb.getFileUrl(post, post.image)
        }
    })

    const isVideo = (url: string) =>
        new URL(url).pathname.endsWith('mp4') ||
        new URL(url).pathname.endsWith('webm')

    export let open: boolean = false
</script>

<Modal bind:open>
    <div class="max-w-[95vw] items-center flex flex-col gap-4 p-4">
        {#if $openPost}
            <div class="inline-flex justify-between self-start w-full">
                <span class="text-xl font-bold">{$openPost.description}</span>
                <a
                    href={`/user/${$openPost.expand?.user.username}`}
                    class="text-slate-400 dark:text-slate-500"
                >
                    {#if $openPost.expand?.community}
                        <a
                            href={`/community/${$openPost.expand?.community.name}`}
                        >
                            {$openPost.expand?.community.name} •
                        </a>
                    {/if}

                    @{$openPost.expand?.user.username}
                </a>
            </div>
            {#if loading && !isVideo(image)}
                <Loader />
            {/if}
            {#if isVideo(image)}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video class="w-96 rounded-lg shadow-md" controls loop>
                    <source src={image} />
                </video>
            {:else}
                <img
                    src={image}
                    alt={$openPost.description}
                    class="w-96 rounded-lg shadow-md"
                    on:load={() => (loading = false)}
                />
            {/if}
            <Likes post={$openPost} />
            <Comments post={$openPost} />
        {/if}
    </div>
    {#if $openPost}
        <Menu class="absolute top-0 right-0 m-4 text-left">
            <MenuButton>
                <Button class="gap-0 px-[0.25rem] py-[2px] -z-10">
                    <Icon size="20" src={EllipsisHorizontal} />
                </Button>
            </MenuButton>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    class="flex absolute right-0 z-20 flex-col gap-2 p-4 mt-2 w-56 bg-white rounded-md shadow-lg origin-top-right dark:bg-slate-900"
                >
                    <Colored><h1 class="font-bold">Post Actions</h1></Colored>
                    <MenuItem>
                        <Button
                            class="w-full"
                            major={false}
                            onclick={() => {
                                if (typeof navigator.clipboard != 'undefined') {
                                    navigator.clipboard.writeText(
                                        `${$page.url.host}/post/${$openPost.id}`
                                    )
                                }
                            }}
                        >
                            <Icon src={Square2Stack} width="16" />Copy Link
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button
                            class="w-full"
                            major={false}
                            onclick={() => {
                                goto(pb.getFileUrl($openPost, $openPost.image))
                            }}
                        >
                            <Icon src={ArrowDownTray} width="16" />Download
                        </Button>
                    </MenuItem>
                    {#if $openPost.user == $currentUser?.id}
                        <MenuItem>
                            <Button
                                class="w-full"
                                major={true}
                                colorType="danger"
                                onclick={() => {
                                    pb.collection('posts').delete($openPost.id)
                                }}
                            >
                                <Icon src={Trash} width="16" />Delete
                            </Button>
                        </MenuItem>
                    {/if}
                </MenuItems>
            </Transition>
        </Menu>
    {/if}
</Modal>
