<script lang="ts">
    import AdvancedModal from '$lib/ui/AdvancedModal.svelte'

    export let open = false
</script>

<AdvancedModal bind:open>
    <h1 class="font-bold" slot="title">Upload a Post</h1>
    <div class="flex flex-col items-center" />
</AdvancedModal>
