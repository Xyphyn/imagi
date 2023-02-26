<script lang="ts">
    import { currentUser } from '$lib/pocketbase'
</script>

<div class="settings-container">
    <h1>Hello, {$currentUser?.username}</h1>
</div>

<style>
    .settings-container {
    }
</style>
