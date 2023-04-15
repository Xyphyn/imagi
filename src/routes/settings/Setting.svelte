<script lang="ts">
    export let col = false
</script>

<div
    class="flex overflow-hidden flex-col gap-2 bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
    <div class="p-8">
        <h1 class="mb-2 text-xl font-bold"><slot name="title" /></h1>
        <p class="text-sm opacity-70">
            <slot name="description" />
        </p>
    </div>
    <div
        class="flex flex-col {col
            ? ''
            : 'md:flex-row'} just gap-2 items-center px-8 p-4 w-full dark:bg-zinc-800 bg-slate-50"
    >
        <slot />
    </div>
</div>
