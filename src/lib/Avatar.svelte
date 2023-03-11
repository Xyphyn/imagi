<script lang="ts">
    import { pb } from './pocketbase'
    import type { UsersResponse } from './types/pb-types'

    export let width: number = 48
    export let thumbnail: '32x32' | '48x48' | '128x128' = '128x128'
    export let user: UsersResponse | any

    export let type: 'community' | 'user' = 'user'

    function getAvatar() {
        if (type == 'community' && (user.image == '' || !user.image))
            return `https://avatars.dicebear.com/api/identicon/${user.name}.svg`

        if (type == 'user' && (user.avatar == '' || !user.avatar))
            return `https://avatars.dicebear.com/api/identicon/${user.username}.svg`

        return pb.getFileUrl(
            user,
            type == 'community' ? user.image : user.avatar,
            { thumb: thumbnail }
        )
    }
</script>

{#if type == 'user'}
    <img
        src={getAvatar()}
        class={`w-[${width}px] rounded-full aspect-square object-cover bg-white dark:bg-slate-700 grid place-items-center`}
        {width}
        alt={user.username.substring(0, 1)}
        loading="lazy"
    />
{:else if type == 'community'}
    <img
        src={getAvatar()}
        class={`w-[${width}px] rounded-full aspect-square object-cover bg-white dark:bg-slate-700 grid place-items-center`}
        {width}
        alt={user.name.substring(0, 1)}
        loading="lazy"
    />
{/if}
