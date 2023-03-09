<script lang="ts">
    let clazz = ''
    export { clazz as class }
</script>

<div class="flex flex-row items-center gap-2 flex-shrink-0 h-8 {clazz}">
    <div
        class="w-8 h-8 rounded-full animate-pulse bg-white dark:bg-slate-700"
    />
    <div
        class="w-24 h-8 animate-pulse bg-white dark:bg-slate-700 rounded-full"
    />
</div>
