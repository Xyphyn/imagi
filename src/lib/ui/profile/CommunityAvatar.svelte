<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import type { CommunitiesResponse } from '$lib/backend/schema'

    export let community: CommunitiesResponse
    export let thumb: '32x32' | '48x48' | '128x128' = '48x48'
    export let width: number = 48

    function fetchAvatar() {
        if (!community.image)
            return `https://avatars.dicebear.com/api/initials/${community.name}.svg`

        return pb.getFileUrl(community, community.image, { thumb: thumb })
    }

    //
</script>

<img
    src={fetchAvatar()}
    alt={community.name}
    class="overflow-hidden rounded-full"
    {width}
    height={width}
/>
