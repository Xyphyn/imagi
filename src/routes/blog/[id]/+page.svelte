<script lang="ts">
    import type { BlogResponse } from '$lib/backend/schema'

    export let data: {
        post: BlogResponse
    }
    //
</script>

<title>{data.post.title}</title>
<div class="mx-auto max-w-3xl">
    <h1 class="my-4 text-3xl font-bold">{data.post.title}</h1>
    {@html data.post.content}
</div>
