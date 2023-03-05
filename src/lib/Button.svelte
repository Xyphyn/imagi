<script lang="ts">
    export let onclick: () => void
</script>

<button on:click={onclick}><slot /></button>
