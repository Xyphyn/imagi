<script lang="ts">
    export let color: 'accent' | 'error' = 'accent'
</script>

<span
    class="text-transparent bg-clip-text bg-gradient-to-br {color == 'accent'
        ? 'from-primary to-secondary'
        : 'from-red-400 to-red-500'}"
>
    <slot />
</span>
