<script lang="ts">
    import Avatar from '$lib/Avatar.svelte'
    import Button from '$lib/Button.svelte'
    import Colored from '$lib/misc/Colored.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import RelativeDate from '$lib/RelativeDate.svelte'
    import type { CommentsResponse, PostsResponse } from '$lib/types/pb-types'
    import {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Transition,
    } from '@rgossiaux/svelte-headlessui'
    import {
        EllipsisHorizontal,
        Icon,
        Square2Stack,
        Trash,
    } from 'svelte-hero-icons'

    export let comment: CommentsResponse<any>
    export let post: PostsResponse<any>

    function deleteComment(comment: CommentsResponse<any>) {
        pb.collection('comments').delete(comment.id)
    }

    function copyComment(comment: CommentsResponse<any>) {
        if (typeof navigator.clipboard != 'undefined') {
            navigator.clipboard.writeText(comment.content)
        }
    }
</script>

<div class="relative w-full group flex-grow-0">
    <div
        class="flex relative flex-row gap-2 items-start p-4 w-full rounded-lg popin box-border bg-slate-100 dark:bg-slate-700 flex-grow-0"
    >
        <Avatar user={comment.expand?.user} width={32} thumbnail="32x32" />
        <div class="inline-flex flex-col w-full">
            <div class="inline">
                <a
                    class="w-max opacity-70 link text-sm"
                    href={`/user/${comment.expand?.user.username}`}
                >
                    {comment.expand?.user.username}
                </a>
                {#if comment.expand?.user.role}
                    <span
                        class="bg-gradient-to-r from-primary to-secondary px-[0.25rem] py-[0.1rem] capitalize font-bold rounded-md text-xs opacity-100 text-black"
                    >
                        {comment.expand?.user.role}
                    </span>
                {/if}
                {#if post.user == comment.user}
                    <span
                        class="bg-gradient-to-r from-primary to-secondary  px-[0.25rem] py-[0.1rem] capitalize font-bold rounded-md text-xs opacity-100 text-black"
                    >
                        OP
                    </span>
                {/if}
                <div class="inline text-xs opacity-60">
                    •
                    <RelativeDate
                        date={comment.created}
                        class="inline text-xs"
                    />
                </div>
            </div>
            <span class="border-box break-words flex-grow-0 text-sm">
                {comment.content}
            </span>
        </div>
    </div>
    <Menu class="absolute top-0 right-0 m-2 text-left">
        <MenuButton
            class="opacity-0 transition-opacity group-hover:opacity-100"
        >
            <Button class="gap-0 px-[2px] py-[2px] -z-10">
                <Icon size="20" src={EllipsisHorizontal} />
            </Button>
        </MenuButton>
        <Transition
            enter="transition ease-out duration-100 z-20"
            enterFrom="transform opacity-0 scale-95 z-20"
            enterTo="transform opacity-100 scale-100 z-20"
            leave="transition ease-in duration-75 z-20"
            leaveFrom="transform opacity-100 scale-100 z-20"
            leaveTo="transform opacity-0 scale-95 z-20"
        >
            <MenuItems
                class="flex absolute right-0 z-20 flex-col gap-2 p-4 mt-2 w-56 bg-white rounded-md shadow-lg origin-top-right dark:bg-slate-800"
            >
                <Colored>
                    <h1 class="font-bold">Comment Actions</h1>
                </Colored>
                <MenuItem>
                    <Button
                        class="w-full"
                        major={false}
                        onclick={() => {
                            copyComment(comment)
                        }}
                    >
                        <Icon src={Square2Stack} width="16" />Copy
                    </Button>
                </MenuItem>
                {#if comment.user == $currentUser?.id || $currentUser?.role == 'admin'}
                    <MenuItem>
                        <Button
                            class="w-full"
                            major={true}
                            colorType="danger"
                            onclick={() => deleteComment(comment)}
                        >
                            <Icon src={Trash} width="16" />Delete
                        </Button>
                    </MenuItem>
                {/if}
            </MenuItems>
        </Transition>
    </Menu>
</div>
