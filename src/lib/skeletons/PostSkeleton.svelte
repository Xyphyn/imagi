<script lang="ts">
    let clazz = ''
    export { clazz as class }
</script>

<div
    class="popin relative bg-slate-50 dark:bg-slate-800 shadow-xl aspect-square h-full animate-pulse rounded-lg {clazz}"
>
    <span
        class="flex absolute bottom-0 left-0 flex-row justify-between py-2 px-4 w-full h-10 text-black bg-white rounded-b-lg animate-pulse dark:bg-slate-700 dark:text-white"
    />
</div>
