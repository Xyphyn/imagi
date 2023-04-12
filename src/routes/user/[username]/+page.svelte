<script lang="ts">
    import type { CountsResponse, UsersResponse } from '$lib/backend/schema'

    export let data: { user: UsersResponse<{ 'counts(user)': CountsResponse }> }
    //
</script>
