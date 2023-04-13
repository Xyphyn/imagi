<script lang="ts">
    import { Color } from '../colors'

    export let onclick = () => {}
    export let color: Color = Color.secondary
</script>

<button
    on:click={onclick}
    class="flex flex-row gap-2 items-center px-4 py-2 w-full text-sm transition-colors {color}"
>
    <slot />
</button>
