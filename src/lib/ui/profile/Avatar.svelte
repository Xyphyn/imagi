<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import type { UsersResponse } from '$lib/backend/schema'

    export let user: any
    export let thumb: '32x32' | '48x48' | '128x128' = '48x48'

    function fetchAvatar() {
        if (!user.avatar)
            return `https://avatars.dicebear.com/api/initials/${user.username}.svg`

        return pb.getFileUrl(user, user.avatar, { thumb: thumb })
    }

    //
</script>

<img src={fetchAvatar()} alt={user.username} class="w-12 h-12 rounded-full" />
