<script lang="ts">
    export let live = true
</script>

<span class="flex flex-row gap-1 items-center mx-4">
    <span class="flex relative w-3 h-3">
        <span
            class="inline-flex absolute w-full h-full rounded-full opacity-75 {live
                ? 'animate-ping bg-primary'
                : ''}"
        />
        <span
            class="inline-flex relative w-3 h-3 rounded-full {live
                ? 'bg-primary'
                : 'bg-gray-500'}"
        />
    </span>
    {live ? 'Live' : 'Not Live'}
</span>
