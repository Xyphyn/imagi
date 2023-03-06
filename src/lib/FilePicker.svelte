<script lang="ts">
    export let files: FileList | null
</script>

<label
    for="signup-avatar"
    class="cursor-pointer border border-slate-300 dark:border-slate-500 px-3 py-2 rounded-md shadow-md text-sm
focus:outline-4 bg-transparent"
    ><slot />
    <input
        id="signup-avatar"
        type="file"
        bind:files
        accept="image/*"
        class="hidden"
    />
</label>
