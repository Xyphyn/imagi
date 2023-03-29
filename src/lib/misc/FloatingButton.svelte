<script lang="ts">
    export let show = false
    export let onclick = () => {}
</script>

<button
    class="transition-opacity w-14 md:w-max h-14 p-4 flex md:flex-row items-center justify-center gap-2 fixed bottom-0 right-0 m-16 bg-gradient-to-r from-primary to-secondary text-black rounded-lg {show
        ? 'opacity-100'
        : 'opacity-0'}"
    on:click={onclick}
>
    <slot name="icon" />
</button>
