<script lang="ts">
    import RelativeDate from '$lib/misc/RelativeDate.svelte'

    export let data
</script>

<h1 class="m-4 mx-auto w-max text-2xl font-bold">Blog</h1>
<div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
    {#each data.posts as post}
        <a
            href={`/blog/${post.id}`}
            class="flex flex-col p-4 bg-white rounded-md shadow-md transition-transform transform-gpu dark:bg-slate-900 hover:-translate-y-1 min-h-[8rem]"
        >
            <span class="text-lg font-bold">{post.title}</span>
            <span class="opacity-80">{post.description}</span>
            <div class="mt-4 ml-auto text-sm opacity-50">
                <RelativeDate date={post.created} />
            </div>
        </a>
    {/each}
</div>
