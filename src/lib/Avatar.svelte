<script lang="ts">
    import { pb } from './pocketbase'
    import type { UsersResponse } from './types/pb-types'

    export let width: number = 48
    export let user: UsersResponse | any
</script>

<img
    src={pb.getFileUrl(user, user.avatar, { thumb: '128x128' })}
    class={`w-[${width}px] rounded-full aspect-square object-cover bg-white dark:bg-slate-700 grid place-items-center`}
    {width}
    alt={user.username.substring(0, 1)}
/>
