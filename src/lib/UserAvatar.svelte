<script lang="ts">
    import type { User } from '$lib/types/user'
    import { getProfilePicture } from '../routes/app'

    export let user: User
    export let width: number = 32
</script>

<img
    src={getProfilePicture(user)}
    alt={user.username.substring(0, 1)}
    style={`width: ${width}px`}
/>

<style>
    img {
        border-radius: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        background-color: var(--card-color);
        display: grid;
        place-items: center;
    }
</style>
