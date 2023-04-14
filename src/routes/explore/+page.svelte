<script lang="ts">
    import RecordList from '$lib/backend/RecordList.svelte'
    import { Collections } from '$lib/backend/schema'
</script>

<RecordList collection={Collections.Users} let:items>
    {#if items}
        {#each items as user}
        {/each}
    {/if}
</RecordList>
