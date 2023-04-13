<script lang="ts">
    import { pb } from '$lib/backend/pocketbase.js'
    import Comments from '$lib/misc/comments/Comments.svelte'
    import { isVideo } from '$lib/misc/posts/util.js'

    export let data
</script>

<div
    class="flex flex-col gap-4 p-6 mx-auto w-max bg-white rounded-lg shadow-lg dark:bg-slate-800"
>
    <div class="flex flex-col">
        <h1 class="text-xl font-bold">{data.post?.description}</h1>
        <span class="text-base opacity-80">
            <a
                href={`/user/${data.post?.expand?.user.username}`}
                class="transition-colors hover:text-sky-500"
            >
                {data.post?.expand?.user.username}
            </a>

            {#if data.post?.expand?.community}
                <a
                    href={`/community/${data.post?.expand?.community.name}`}
                    class="transition-colors hover:text-sky-500"
                >
                    • {data.post?.expand?.community.name}
                </a>
            {/if}
        </span>
    </div>
    <div class="flex flex-col gap-4 items-center mt-4 w-full">
        {#if isVideo(pb.getFileUrl(data.post, data.post?.image))}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video
                controls
                loop
                class="max-w-xl max-h-[80vh] rounded-lg w-full"
            >
                <source src={pb.getFileUrl(data.post, data.post?.image)} />
            </video>
        {:else}
            <img
                src={pb.getFileUrl(data.post, data.post?.image)}
                alt={data.post.alt_text || data.post.description}
                class="w-full max-w-xl rounded-lg"
                width={400}
                height={200}
            />
        {/if}
        <Comments post={data.post} />
    </div>
</div>
