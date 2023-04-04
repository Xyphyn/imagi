<script lang="ts">
    import Comments from '$lib/posts/Comments.svelte'
    import Loader from '$lib/Loader.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import type { PostsResponse } from '$lib/types/pb-types'
    import Likes from '$lib/posts/Likes.svelte'
    import { isVideo } from '$lib/util'
    import {
        ArrowDownTray,
        EllipsisVertical,
        Icon,
        InformationCircle,
        Square2Stack,
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
    import { page } from '$app/stores'

    let loading = true

    export let data: {
        post: PostsResponse<any>
    }

    const image = pb.getFileUrl(data.post, data.post.image)
</script>

<title>Imagi: {data.post.description}</title>
<meta content={`Imagi: ${data.post.description}`} property="og:title" />
<meta
    content={`View this post on Imagi, a real-time social app.`}
    property="og:description"
/>
<meta content={pb.getFileUrl(data.post, data.post.image)} property="og:image" />
<meta content={`#72efdd`} data-react-helmet="true" name="theme-color" />
<meta name="twitter:card" content="summary_large_image" />
<div
    class="w-max max-w-full mx-auto items-center flex flex-col gap-4 p-8 rounded-lg bg-white dark:bg-slate-800 shadow-lg popin"
>
    <div class="inline-flex flex-col self-start w-full relative">
        <span class="text-xl font-bold w-[90%] break-words">
            {data.post.description}
        </span>
        <div class="flex flex-row gap-2">
            <a
                href={`/user/${data.post.expand?.user.username}`}
                class="text-base opacity-80 link"
            >
                {data.post.expand?.user.username}

                {#if data.post.expand?.community}
                    <a href={`/community/${data.post.expand?.community.name}`}>
                        • {data.post.expand?.community.name}
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
                    <MenuItem>
                        <Button
                            class="w-full"
                            major={false}
                            onclick={() => {
                                if (typeof navigator.clipboard != 'undefined') {
                                    navigator.clipboard.writeText(
                                        `https://${$page.url.host}/post/${data.post.id}`
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
                                goto(pb.getFileUrl(data.post, data.post.image))
                            }}
                        >
                            <Icon src={ArrowDownTray} width="16" />Download
                        </Button>
                    </MenuItem>
                    {#if data.post.user == $currentUser?.id || $currentUser?.role == 'admin'}
                        <MenuItem>
                            <Button
                                class="w-full"
                                major={true}
                                colorType="danger"
                                onclick={() => {
                                    pb.collection('posts').delete(data.post.id)
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
            <video class="w-full max-w-xl rounded-lg shadow-md" controls loop>
                <source src={image} />
            </video>
        {/key}
    {:else}
        {#key image}
            <img
                src={image}
                alt={data.post.description}
                width={700}
                height={500}
                class="w-full max-w-xl bg-white rounded-lg shadow-md"
                on:load={() => (loading = false)}
                on:loadstart={() => console.log('load start')}
            />
        {/key}
    {/if}
    <Likes post={data.post} />
    <Comments post={data.post} />
</div>
