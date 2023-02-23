<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import '../style/default.css'
</script>

<div class="main-container">
    <slot />
</div>
