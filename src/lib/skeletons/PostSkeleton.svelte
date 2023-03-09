<script lang="ts">
    let clazz = ''
    export { clazz as class }
</script>

<div
    class="popin relative bg-white dark:bg-slate-800 shadow-xl aspect-square h-full animate-pulse rounded-lg {clazz}"
>
    <span
        class="absolute bottom-0 left-0 w-full py-2 px-4 h-8 animate-pulse bg-white text-black dark:bg-slate-700 dark:text-white rounded-b-lg flex flex-row justify-between"
    />
</div>
