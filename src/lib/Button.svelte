<script lang="ts">
    export let onclick: () => void = () => {}
    export let type: 'button' | 'submit' | 'reset' | null | undefined =
        undefined
    export let major: boolean = false
    export let colorType: 'danger' | 'success' | undefined = undefined

    let clazz: string = ''
    export { clazz as class }
</script>

<button
    on:click={onclick}
    {type}
    class={`active:scale-95 border border-slate-300 dark:border-slate-500 px-3 py-2 rounded-md shadow-md text-sm
focus:outline-4 bg-transparent flex flex-row gap-2 items-center hover:brightness-110 transition-all ease-out-expo ${
        // Please forgive me for this
        colorType == 'danger'
            ? 'bg-gradient-to-br from-red-400 to-red-500 text-white border-transparent dark:border-transparent'
            : colorType == 'success'
            ? 'bg-gradient-to-br from-green-400 to-green-500 border-transparent dark:border-transparent'
            : major
            ? 'bg-gradient-to-br from-primary to-secondary text-black border-transparent dark:border-transparent'
            : 'hover:dark:bg-slate-800 hover:bg-white'
    } ${clazz}`}><slot /></button
>
