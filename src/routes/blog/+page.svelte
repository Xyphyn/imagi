<script lang="ts">
    import Colored from '$lib/misc/Colored.svelte'
    import RelativeDate from '$lib/RelativeDate.svelte'
    import type { BlogResponse } from '$lib/types/pb-types'

    export let data: { posts: BlogResponse<any>[] }
    // extra comment because vscode syntax highlighting is goofy
</script>

<div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-4xl font-bold"><Colored>Blog</Colored></h1>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4 p-4"
    >
        {#if data.posts}
            {#each data.posts as post}
                <a
                    href={`/blog/${post.id}`}
                    class="max-w-96 w-full h-36 bg-white dark:bg-slate-800 p-4 rounded-lg relative hover:text-inherit hover:-translate-y-2 shadow-lg transition-transform"
                >
                    <h1 class="text-lg font-medium">{post.title}</h1>
                    <p class="opacity-90 text-sm">{post.description}</p>
                    <div
                        class="absolute bottom-0 right-0 m-4 text-sm opacity-75"
                    >
                        <RelativeDate date={post.created} />
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</div>
