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
        EllipsisVertical,
        Pencil,
        XMark,
        Check,
        PencilSquare,
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
    import { isVideo } from '$lib/util'

    let loading = true

    let prevPost: PostsResponse<any>

    let image: string = ''
    let editing = false
    let editLoad = false

    let newTitle = ''

    openPost.subscribe((post) => {
        if (prevPost != post && post != undefined) {
            editing = false
            loading = true
            prevPost = post
            newTitle = post.description
            image = pb.getFileUrl(post, post.image)
        }
    })

    async function updatePost(title: string) {
        if (!$openPost) return
        return await pb
            .collection('posts')
            .update($openPost.id, { description: title })
    }

    export let open: boolean = false
</script>

<Modal bind:open>
    <div class="max-w-[95vw] items-center flex flex-col gap-4 p-4">
        {#if $openPost}
            <div class="inline-flex flex-col self-start w-full relative">
                {#if !editing}
                    <span class="text-xl font-bold w-[90%] break-words">
                        {$openPost.description}
                    </span>
                {:else}
                    <div class="mt-1 w-[90%] flex-row flex gap-2">
                        <input
                            type="text"
                            bind:value={newTitle}
                            placeholder="Edited title"
                            class="bg-slate-200 dark:bg-slate-800 w-full"
                        />
                        <Button
                            onclick={() => {
                                editing = false
                                newTitle = $openPost.description
                            }}
                            class="px-2 py-2"
                        >
                            <Icon src={XMark} size="20" />
                        </Button>
                        <Button
                            onclick={() => {
                                editLoad = true
                                updatePost(newTitle).finally(() => {
                                    editLoad = false
                                    editing = false
                                    $openPost.description = newTitle
                                })
                            }}
                            class="px-2 py-2"
                            major
                        >
                            {#if editLoad}
                                <Loader width={20} />
                            {:else}
                                <Icon src={Check} size="20" />
                            {/if}
                        </Button>
                    </div>
                {/if}
                <div class="flex flex-row gap-2">
                    <a
                        href={`/user/${$openPost.expand?.user.username}`}
                        class="text-base opacity-80 link"
                    >
                        {$openPost.expand?.user.username}

                        {#if $openPost.expand?.community}
                            <a
                                href={`/community/${$openPost.expand?.community.name}`}
                            >
                                • {$openPost.expand?.community.name}
                            </a>
                        {/if}
                    </a>
                </div>
                <Menu class="absolute top-0 right-0 text-left">
                    <MenuButton>
                        <Button class="gap-0 px-[0.2rem] py-[0.20rem] -z-10">
                            <Icon size="20" src={EllipsisVertical} />
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
                            <Colored>
                                <h1 class="font-bold">Post Actions</h1>
                            </Colored>
                            {#if $openPost.user == $currentUser?.id}
                                <MenuItem>
                                    <Button
                                        class="w-full"
                                        major={false}
                                        onclick={() => {
                                            editing = true
                                        }}
                                    >
                                        <Icon
                                            src={PencilSquare}
                                            width="16"
                                        />Edit
                                    </Button>
                                </MenuItem>
                            {/if}
                            <MenuItem>
                                <Button
                                    class="w-full"
                                    major={false}
                                    onclick={() => {
                                        if (
                                            typeof navigator.clipboard !=
                                            'undefined'
                                        ) {
                                            navigator.clipboard.writeText(
                                                `https://${$page.url.host}/post/${$openPost.id}`
                                            )
                                        }
                                    }}
                                >
                                    <Icon src={Square2Stack} width="16" />Copy
                                    Link
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button
                                    class="w-full"
                                    major={false}
                                    onclick={() => {
                                        goto(
                                            pb.getFileUrl(
                                                $openPost,
                                                $openPost.image
                                            )
                                        )
                                    }}
                                >
                                    <Icon
                                        src={ArrowDownTray}
                                        width="16"
                                    />Download
                                </Button>
                            </MenuItem>
                            {#if $openPost.user == $currentUser?.id || $currentUser?.role == 'admin'}
                                <MenuItem>
                                    <Button
                                        class="w-full"
                                        major={true}
                                        colorType="danger"
                                        onclick={() => {
                                            pb.collection('posts').delete(
                                                $openPost.id
                                            )
                                        }}
                                    >
                                        <Icon src={Trash} width="16" />Delete
                                    </Button>
                                </MenuItem>
                            {/if}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            {#if loading && !isVideo(image)}
                <Loader />
            {/if}
            {#if isVideo(image)}
                {#key image && open}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video
                        class="w-full max-w-xl rounded-lg shadow-md"
                        controls
                        loop
                    >
                        <source src={image} />
                    </video>
                {/key}
            {:else}
                {#key image}
                    <img
                        src={image}
                        alt={$openPost.description}
                        width={700}
                        height={500}
                        class="w-full max-w-xl bg-white rounded-lg shadow-md"
                        on:load={() => (loading = false)}
                        on:loadstart={() => console.log('load start')}
                    />
                {/key}
            {/if}
            <Likes post={$openPost} />
            <Comments post={$openPost} />
        {/if}
    </div>
</Modal>
