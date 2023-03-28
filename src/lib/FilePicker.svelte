<script lang="ts">
    import { DocumentCheck, DocumentPlus, Icon } from 'svelte-hero-icons'

    export let files: FileList | null
    export let accept = 'image/*'

    export let forId: string = 'random'

    let clazz = ''
    export { clazz as class }
</script>

<label
    for={forId}
    class={`cursor-pointer dark:bg-slate-700 bg-slate-200 px-3 py-2 rounded-md text-sm
focus:outline-4 bg-transparent ${clazz}`}
>
    {#if !files}
        <Icon src={DocumentPlus} class="float-left mr-1" size="20" />
        <slot />
    {:else}
        <Icon src={DocumentCheck} class="float-left mr-1" size="20" />
        <span
            class="max-w-[30ch] text-ellipsis whitespace-nowrap overflow-hidden"
        >
            {files[0].name}
        </span>
    {/if}
    <input id={forId} type="file" bind:files {accept} class="hidden" />
</label>
