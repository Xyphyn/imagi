<script lang="ts">
    import { pb } from './pocketbase'
    import type { UsersResponse } from './types/pb-types'

    export let width: number = 48
    export let user: UsersResponse | any
</script>

<img
    src={pb.getFileUrl(user, user.avatar, { thumb: '128x128' })}
    {width}
    height={width}
    class={`rounded-full aspect-square object-cover`}
    alt={user.username}
/>
