<script lang="ts">
    export let enabled = false
</script>

<label>
    <div
        class="relative w-10 border-2 h-6 transition-colors cursor-pointer
        rounded-full flex flex-row items-center shadow-lg {enabled
            ? 'bg-blue-500 border-blue-500'
            : 'bg-slate-200 dark:bg-zinc-900 border-slate-200 dark:border-zinc-900'}"
    >
        <div
            class="w-5 h-5 rounded-full transition-transform
        bg-white dark:bg-zinc-700 {enabled ? 'translate-x-4' : 'translate-x-0'}"
        />
    </div>
    <input type="checkbox" bind:checked={enabled} class="hidden" />
</label>
