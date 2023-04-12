<script lang="ts">
    import { DocumentPlus, Icon } from 'svelte-hero-icons'

    export let accept = 'image/*,video/*'
    export let multiple = false
    export let files: FileList | null = null
    export let image = false

    let previewURL = ''

    $: if (files) {
        previewURL = URL.createObjectURL(files[0])
    }
</script>

<label
    class="flex flex-col items-center px-8 py-4 mx-auto w-full rounded-lg border border-black border-dashed cursor-pointer min-h-36 dark:border-white"
>
    {#if image && files}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            src={previewURL}
            on:load={() => {
                if (previewURL) URL.revokeObjectURL(previewURL)
            }}
            class="w-full max-w-sm h-full rounded-lg"
        />
    {:else}
        <Icon src={DocumentPlus} class="opacity-50" size="36" />
        <p class="text-sm opacity-50">Attach a file</p>
    {/if}
    <input type="file" bind:files {accept} class="hidden" {multiple} />
</label>
