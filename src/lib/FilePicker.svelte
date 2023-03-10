<script lang="ts">
    export let files: FileList | null

    export let forId: string = 'random'

    let clazz = ''
    export { clazz as class }
</script>

<label
    for={forId}
    class={`cursor-pointer border border-slate-300 dark:border-slate-500 px-3 py-2 rounded-md shadow-md text-sm
focus:outline-4 bg-transparent ${clazz}`}
    ><slot />
    <input id={forId} type="file" bind:files accept="image/*" class="hidden" />
</label>
