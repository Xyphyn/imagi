<script lang="ts">
    import Colored from '$lib/misc/Colored.svelte'
    import type { BlogResponse } from '$lib/types/pb-types'

    export let data
</script>

<title>{data.post.title}</title>
<h1
    class="text-4xl font-bold w-full mx-auto flex flex-row items-center justify-center mb-4"
>
    <Colored>
        {data.post.title}
    </Colored>
</h1>
<div
    class="flex flex-col w-full max-w-xl min-h-[24rem] h-full bg-white dark:bg-slate-800 p-8 rounded-lg mx-auto shadow-lg text-left"
>
    {@html data.post.content}
</div>
