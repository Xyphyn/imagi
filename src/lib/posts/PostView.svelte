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
    export let open: boolean = false
</script>

<Modal bind:open>
    <div class="max-w-[95vw] items-center flex flex-col gap-4">
        {#if $openPost}
            <div class="self-start inline-flex justify-between w-full">
                <span>{$openPost.description}</span>
                <a
                    href={`/user/${$openPost.expand?.user.username}`}
                    class="opacity-30"
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
            {#if loading}
                <Loader />
            {/if}
            <img
                src={image}
                alt={$openPost.description}
                class="rounded-lg shadow-md w-96"
                on:load={() => (loading = false)}
            />
            <Likes post={$openPost} />
            <Comments post={$openPost} />
        {/if}
    </div>
    {#if $openPost}
        <Menu class="text-left absolute top-0 right-0 m-4">
            <MenuButton
                ><Button class="gap-0 px-1 py-[2px] -z-10"
                    ><Icon size="20" src={EllipsisHorizontal} /></Button
                ></MenuButton
            >
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    class="z-20 flex flex-col gap-2 absolute right-0 p-4 w-56 mt-2 origin-top-right bg-white dark:bg-slate-700 rounded-md shadow-lg"
                >
                    <Colored><h1 class="font-bold">Post Actions</h1></Colored>
                    <MenuItem>
                        <Button
                            class="w-full"
                            major={false}
                            onclick={() => {
                                goto(pb.getFileUrl($openPost, $openPost.image))
                            }}
                            ><Icon
                                src={ArrowDownTray}
                                width="16"
                            />Download</Button
                        >
                    </MenuItem>
                    {#if $openPost.user == $currentUser?.id}
                        <MenuItem>
                            <Button
                                class="w-full"
                                major={true}
                                colorType="danger"
                                onclick={() => {
                                    pb.collection('posts').delete($openPost.id)
                                }}><Icon src={Trash} width="16" />Delete</Button
                            >
                        </MenuItem>
                    {/if}
                </MenuItems>
            </Transition>
        </Menu>
    {/if}
</Modal>
