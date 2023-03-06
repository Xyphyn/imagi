<script lang="ts">
    export let onclick: () => void = () => {}
    export let type: 'button' | 'submit' | 'reset' | null | undefined =
        undefined
    export let major: boolean = false

    let clazz: string = ''
    export { clazz as class }
</script>

<button
    on:click={onclick}
    {type}
    class={`border-slate-300 dark:border-slate-500 px-3 py-2 rounded-md shadow-md text-sm
focus:outline-4 bg-transparent flex flex-row gap-2 items-center hover:brightness-110 ${
        major
            ? 'bg-gradient-to-br from-primary to-secondary text-black'
            : 'border hover:dark:bg-slate-800 hover:bg-white'
    } ${clazz}`}><slot /></button
>
